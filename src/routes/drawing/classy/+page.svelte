<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, arrayMap, goldenCircles, phi } from '@dopplerreflect/geometry';
	import { DRsvgObjectTracker } from './drsvg-object-tracker';
	const width = 1920;
	const height = 1080;

	const baseRadius = height / 4;

	const angles = anglesArray(6);
	const radii = arrayMap(2, (n) => baseRadius * phi ** n);
	const ot = new DRsvgObjectTracker();

	goldenCircles(radii, angles).forEach((c) => ot.add(c));

	const points = () => ot.points;
	const lines = () => ot.lines;
	const circles = () => ot.circles;

	ot.add([points()[73], points()[17]]);
	console.log('points', points.length);
	console.log(points()[73], points()[17]);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#202020" />
	{#each lines() as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
	{/each}
	{#each circles() as c}
		<circle cx={c.x} cy={c.y} r={c.r} stroke="white" fill="none" />
	{/each}
	{#each points() as p, i}
		<circle cx={p.x} cy={p.y} r={3} fill="yellow" />
		<text x={p.x} y={p.y} fill="yellow">{i}</text>
	{/each}
</DrSvg>
