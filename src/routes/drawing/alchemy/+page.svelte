<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { width, height, radii, angles } from './setup';
	import { createLines, linesExtendedToEdge } from "./lines";
	import { getCircles } from './circles';
	
	const circles = getCircles(radii, angles);
	const brightLines = createLines(angles, radii);
	const dimLines = linesExtendedToEdge(brightLines, angles);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} stroke="violet" fill="none" />
	{/each}
	{#each dimLines as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='indigo' stroke-width={1} />
	{/each}
	{#each brightLines as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='white' />
	{/each}
</DrSvg>
