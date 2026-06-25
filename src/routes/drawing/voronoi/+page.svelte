<svelte:options namespace="svg" />
	
<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phylotaxis } from '@dopplerreflect/geometry'
	import { Delaunay } from 'd3-delaunay'
	import chroma from 'chroma-js'
	import Filters from './filters.svg?raw'
	const width = 1920;
	const height = 1080;
	const phylotaxicPoints = phylotaxis(2 ** 9, height / 2)

	//@ts-ignore
	const delaunay = Delaunay.from(phylotaxicPoints.map((p) => [p.x, p.y]))
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width / 2, height / 2])
	const paths: string[] = [];
	for(let i = 0; i < phylotaxicPoints.length - 55; i++) {
		paths.push(voronoi.cellPolygon(i).map(p => `${p[0]},${p[1]}`).join(' '))
	}
	const path = voronoi.render();
</script>

<DrSvg {...{ width, height }}>
  <defs>
  	{@html Filters}
  	<g id="voronoiPolygons">
			{#each paths as p}
				<polygon points={p} filter="url(#shrink)" />
			{/each}
		</g>
		<mask id="polys">
			<use href="#voronoiPolygons" fill="white" />
		</mask>
  </defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill={chroma.oklch(0, 0.18, 300).hex()} />
		<g transform="scale(2.4)">
			{#each paths as p, i}
				<mask id={`polygon-mask-${i}`}>
					<polygon points={p} fill="white" filter="url(#shrink)" />
				</mask>
				<polygon points={p} fill={chroma.oklch(i % 5 === 0 ? 0.5 : 0.8, i % 2 === 0 ? 0.125 : 0.37, 30 + (180 / paths.length * i)).hex()} filter="url(#topLight)" mask={`url(#polygon-mask-${i})`} />
			{/each}
			<path d={path} stroke="#200040" />
		</g>
</DrSvg>
