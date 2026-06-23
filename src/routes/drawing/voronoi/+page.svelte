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
		// .filter((p) => (Math.abs(p.x) < width / 2 && Math.abs(p.y) < height / 2))
		.map((p) => [p.x, p.y])

	//@ts-ignore
	const delaunay = Delaunay.from(phylotaxicPoints)
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width, height])
	// const paths = voronoi.render()
	const paths: string[] = [];
	for(let i = 0; i < phylotaxicPoints.length - 55; i++) {
		paths.push(voronoi.cellPolygon(i).map(p => `${p[0]},${p[1]}`).join(' '))
	}
	const path = voronoi.render();
</script>

<DrSvg {...{ width, height }}>
  <defs>
  	{@html Filters}
  </defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each paths as p, i}
		<polygon points={p} stroke="black" stroke-width="8" fill={chroma.oklch(0.9, 0.37, (i % 2 === 0 ? 270 : 30) + (120 / phylotaxicPoints.length * i)).hex()} />
	{/each}
	<path d={path} stroke="white" fill="none" stroke-width={3} />
	<path d={path} stroke={chroma.oklch(0.2, 0.37, 300).hex()} fill="none" stroke-width={3} filter="url(#bluroffset)"/>
</DrSvg>
