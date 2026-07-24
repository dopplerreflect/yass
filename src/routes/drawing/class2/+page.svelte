<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, arrayMap, goldenCircles, phi } from '@dopplerreflect/geometry';
	import { DRsvgObjectTracker } from '../classy/drsvg-object-tracker';
	const width = 1920;
	const height = 1080;

	const angles = anglesArray(10);
	const radii = arrayMap(3, (n) => height * 0.25 * phi ** n);
	const ot = new DRsvgObjectTracker();
	goldenCircles(radii, angles).forEach((c) => ot.add(c));
	const circles = ot.circles;
	const points = ot.points;
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle cx={c.x} cy={c.y} r={c.r} fill="none" stroke="white" />
	{/each}
	{#each Object.entries(points) as [k, p]}
		<circle cx={p.x} cy={p.y} r={3} fill="yellow" />
		<text x={p.x} y={p.y} fill="yellow" font-size="0.5em">{k}</text>
	{/each}
</DrSvg>
