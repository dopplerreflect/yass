<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, phi, radialPoint, type Circle } from '@dopplerreflect/geometry';
	export let name: string;
	let width = 1920;
	let height = 1080;
	let r = (height / 2) * phi ** 2;
	let radii = [...Array(3).keys()].map((n) => r * phi ** n);
	let angles = anglesArray(6);
	let circles: Circle[] = [
		radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) })))
	].flat();
</script>

<DrSvg {...{ name, width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} stroke="white" fill="none" />
	{/each}
</DrSvg>
