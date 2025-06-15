<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, midpoint, PHI, phi, radialPoint, type Circle, type GeometryOptions, type Line, type Point } from '@dopplerreflect/geometry';
	import { createLines, linesExtendedToEdge } from "./lines";
	
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
	const brightLines = createLines(angles, radii);
	const dimLines = linesExtendedToEdge(brightLines, angles);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} stroke="indigo" fill="none" />
	{/each}
	{#each dimLines as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='blue' stroke-width={1} />
	{/each}
	{#each brightLines as l, i}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='white' />
		<text x={midpoint(l).x} y={midpoint(l).y} dominant-baseline='middle' text-anchor='middle' fill='yellow' font-size='0.75em'>{i}</text>
	{/each}
</DrSvg>
