<svelte:options namespace="svg" />
	
<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phylotaxis } from '@dopplerreflect/geometry'
	import { Delaunay } from 'd3-delaunay'
	import chroma from 'chroma-js'

	const scale = 0.2;
	const width = 1920 * scale;
	const height = 1080 * scale;

	const phylotaxicPoints = phylotaxis(2 ** 9, height / 2)

	//@ts-ignore
	const delaunay = Delaunay.from(phylotaxicPoints.map((p) => [p.x, p.y]))
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width / 2, height / 2])
	const polygons: string[] = [];
	for(let i = 0; i < phylotaxicPoints.length - 55; i++) {
		polygons.push(voronoi.cellPolygon(i).map(p => `${p[0]},${p[1]}`).join(' '))
	}
	const path = voronoi.render();
</script>

<DrSvg {...{ width, height }}>
  <defs>

    <filter id="shrink">
      <feMorphology operator="erode" radius={ 0 * scale }></feMorphology>
    </filter>

    <filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
      <feMorphology in="SourceAlpha" operator="erode" radius={ 1 * scale }></feMorphology>
      <feGaussianBlur stdDeviation={7 * scale} result="blur" />
      <feDiffuseLighting in="blur" surfaceScale={5 * scale} diffuseConstant="2" lighting-color="#8080ff"
        result="light">
        <feDistantLight azimuth="-90" elevation="5" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
    </filter>

    <filter id="glow">
    	<feGaussianBlur stdDeviation={3 * scale} />
    	<feMerge>
    		<feMergeNode />
    		<feMergeNode />
    		<feMergeNode />
    		<feMergeNode in="SourceGraphic" />
    	</feMerge>
    </filter>
  </defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill={chroma.oklch(0, 0.18, 300).hex()} />
		<g transform="scale(1)">
			{#each polygons as p, i}
				<mask id={`polygon-mask-${i}`}>
					<polygon points={p} fill="white" filter="url(#shrink)" />
				</mask>
				<polygon
					points={p}
					fill={
						chroma.oklch(
							0.8 - (i % 5 === 0 ? 0 : (0.8 / polygons.length * 0.75) * i), // i % 5 === 0 ? 0.5 : 0.8,
							i % 2 === 0 ? 0.125 : i % 3 === 0 ? 0.0 : 0.37,
							30 + (270 / polygons.length * i)
						).hex()
					}
					filter="url(#topLight)"
					mask={`url(#polygon-mask-${i})`}
				/>
			{/each}
			<path display="none" d={path} stroke={chroma.oklch(0.5, 0.37, 300).hex()} stroke-width={1 * scale} filter="url(#glow)" />
		</g>
</DrSvg>
