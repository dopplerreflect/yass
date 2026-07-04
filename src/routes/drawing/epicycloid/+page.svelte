<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		pointToString,
		radialPoint,
		type Line,
		type Point,
	} from '@dopplerreflect/geometry';
	import { findLineIntersections } from '$lib/geometry/intersection';
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

	const epicycloidLineSegments: Line[] = epicycloidPoints
		.slice(0, -1)
		.map((p, i) => [p, epicycloidPoints[i + 1]]);

	const lineSegmentIntersections = findLineIntersections(epicycloidLineSegments).values();

	// get first point radius to determine approximate intersections of other innermost line segments
	const innermostRadius = Math.hypot(epicycloidPoints[0].x, epicycloidPoints[0].y);

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
	<path d={epicycloidPath} stroke="red" fill="none" />
	{#each lineSegmentIntersections as c, i}
		<circle cx={c.x} cy={c.y} r={2} fill="yellow" />
		<text x={c.x} y={c.y} fill="yellow">{i}</text>
	{/each}
	{#each epicycloidPoints as p, i}
		<circle cx={p.x} cy={p.y} r={1} fill="orange" stroke="white" stroke-width="0.25" />
	{/each}

	<circle r={R} stroke="blue" fill="none" />
</DrSvg>
