<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, PHI, phi, radialPoint, type Circle } from '@dopplerreflect/geometry';

	let width = 1080;
	let height = 1080;
	let r = (height / 2) * phi ** 2;
	let radii = [...Array(4).keys()].map((n) => r * phi ** n);
	let angles = anglesArray(6);
	let circles: Circle[] = [
		{ r: radii[0] * Math.sqrt(3), x: 0, y: 0 },
		{ r: radii[0] * PHI, x: 0, y: 0 },
		...radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) })))
	].flat();
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} stroke="indigo" fill="none" />
		<text font-size="6em" dominant-baseline="middle" text-anchor="middle" fill="white">hello</text>
	{/each}
</DrSvg>
