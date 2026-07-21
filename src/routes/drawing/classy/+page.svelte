<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phi } from '@dopplerreflect/geometry';
	import { DRsvgObjectTracker } from './drsvg-object-tracker';
	const width = 1920;
	const height = 1080;

	const ot = new DRsvgObjectTracker();

	ot.add([
		{ x: -200, y: -200 },
		{ x: 200, y: 200 },
	]);
	ot.add([
		{ x: 200, y: 200 },
		{ x: 0, y: 200 },
	]);
	ot.add([
		{ x: 0, y: 200 },
		{ x: 0, y: -200 },
	]);
	ot.add({ x: 0, y: 0, r: 200 });
	ot.add({ x: 0, y: 0, r: 200 * phi });
	ot.add({ x: -200, y: 0, r: 200 * phi ** 2 });
	ot.add({ x: -200, y: 0, r: 200 });
	ot.add([
		{ x: -200, y: -200 },
		{ x: 0, y: -200 },
	]);

	const lines = ot.lines;
	const circles = ot.circles;
	const points = ot.points;
	console.log('points', points.length);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each lines as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
	{/each}
	{#each circles as c}
		<circle cx={c.x} cy={c.y} r={c.r} stroke="white" fill="none" />
	{/each}
	{#each points as p}
		<circle cx={p.x} cy={p.y} r={3} fill="yellow" />
	{/each}
</DrSvg>
