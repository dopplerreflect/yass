<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { pointToString, type Point } from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;

	const R = (height / 2) * 0.3;

	const n = 5;
	const d = 8;
	const k = n / d;

	const angles: number[] = [];
	for (let x = 0; x <= Math.PI * d * 2; x += 0.1) {
		angles.push(x);
	}

	const epicycloidPoint = (angle: number): Point => ({
		x: Number((R * (k + 1) * Math.cos(angle) - R * Math.cos((k + 1) * angle)).toFixed(2)),
		y: Number((R * (k + 1) * Math.sin(angle) - R * Math.sin((k + 1) * angle)).toFixed(2)),
	});

	const epicycloidPoints: Point[] = angles.map((a) => epicycloidPoint(a));

	const epicycloidPath: string =
		`M${pointToString(epicycloidPoints[0])}` +
		epicycloidPoints
			.slice(1, -1)
			.map((p, i) => `L${pointToString(p)}`)
			.join('') +
		'Z';
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="oklch(0% 0% 300)" />
	{#each epicycloidPoints as p, i}
		<circle cx={p.x} cy={p.y} r={1} fill="white" />
	{/each}
	<path d={epicycloidPath} stroke="red" fill="none" />
</DrSvg>
