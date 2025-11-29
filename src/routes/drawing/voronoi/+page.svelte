<svelte:options namespace="svg" />
<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phylotaxis } from '@dopplerreflect/geometry'
	import { Delaunay } from 'd3-delaunay'
	const width = 1920;
	const height = 1080;
	const phylotaxicPoints = phylotaxis(2048, width)
		.filter((p) => (Math.abs(p.x) < width / 2 && Math.abs(p.y) < height / 2))
		.map((p) => [p.x, p.y])

	//@ts-ignore
	const delaunay = Delaunay.from(phylotaxicPoints)
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width, height])
	const paths = voronoi.render()
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="blur">
			<feGaussianBlur stdDeviation="5" />
			<feMerge>
				<feMergeNode />
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each phylotaxicPoints as p}
		<circle cx={p[0]} cy={p[1]} r={1} fill="none" />
	{/each}
	<g filter="url(#blur)">
		<path d={paths} fill="none" stroke="white" />
	</g>
</DrSvg>
