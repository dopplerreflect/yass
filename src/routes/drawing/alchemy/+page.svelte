<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, midpoint, PHI, phi, radialPoint, type Circle, type GeometryOptions, type Line, type Point } from '@dopplerreflect/geometry';
	import { createLines } from "./lines";
	
	const width = 768;
	const height = 768;
	const r = (height / 2) * phi ** 2;
	const radii = [...Array(4).keys()].map((n) => r * phi ** n);
	const angles = anglesArray(6);
	const circles: Circle[] = [
		{ r: radii[0] * Math.sqrt(3), x: 0, y: 0 },
		{ r: radii[0] * PHI, x: 0, y: 0 },
		...radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) })))
	].flat();
	const lines = createLines(angles, radii);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} stroke="indigo" fill="none" />
	{/each}
	{#each lines as l, i}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='white' />
		<text x={midpoint(l).x} y={midpoint(l).y} dominant-baseline='middle' text-anchor='middle' fill='yellow'>{i}</text>
	{/each}
</DrSvg>
