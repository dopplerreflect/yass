<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { pointToString, type Line, type Point } from '@dopplerreflect/geometry';
	import { findLineIntersections } from './intersection';

	const width = 1920;
	const height = 1080;

	const R = (height / 2) * 0.3;

	const n = 5;
	const d = 6;
	const k = n / d;

	const angles: number[] = [];
	for (let x = 0; x <= Math.PI * d * 2; x += 0.13) {
		angles.push(x);
	}

	const epicycloidPoint = (angle: number): Point => ({
		x: Number((R * (k + 1) * Math.cos(angle) - R * Math.cos((k + 1) * angle)).toFixed(1)),
		y: Number((R * (k + 1) * Math.sin(angle) - R * Math.sin((k + 1) * angle)).toFixed(1)),
	});

	const epicycloidPoints: Point[] = angles.map((a) => epicycloidPoint(a));

	const epicycloidLineSegments: Line[] = epicycloidPoints
		.slice(0, -1)
		.map((p, i) => [p, epicycloidPoints[i + 1]]);

	const lineSegmentIntersections = findLineIntersections(
		epicycloidLineSegments,
		epicycloidPoints,
		n,
	).values();

	const epicycloidPath: string =
		`M${pointToString(epicycloidPoints[0])}` +
		epicycloidPoints
			.slice(1, -1)
			.map((p) => `L${pointToString(p)}`)
			.join('') +
		'Z';
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="oklch(0% 0% 300)" />
	<path d={epicycloidPath} stroke="red" fill="none" />
	{#each lineSegmentIntersections as c, i}
		<circle cx={c.x} cy={c.y} r={2} fill="yellow" />
		<text x={c.x} y={c.y} fill="yellow">{i}</text>
	{/each}
	{#each epicycloidPoints as p, i}
		<circle cx={p.x} cy={p.y} r={1} fill="orange" stroke="black" stroke-width="0.25" />
	{/each}
</DrSvg>
