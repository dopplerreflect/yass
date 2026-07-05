<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { pointToString, type Line, type Point } from '@dopplerreflect/geometry';
	import { findLineIntersections } from './intersection';
	import { petalPath, type PathIntersectionIndices } from './petalPath';

	import chroma from 'chroma-js';
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
	);

	const epicycloidPath: string =
		`M${pointToString(epicycloidPoints[0])}` +
		epicycloidPoints
			.slice(1, -1)
			.map((p) => `L${pointToString(p)}`)
			.join('') +
		'Z';

	const petalPaths = [
		[0, 1, 10, 11, 18, 19, 24, 25, 28, 29],
		[0, 1, 9, 29],
		[28, 29, 26, 25],
		[24, 25, 20, 19],
		[18, 19, 12, 11],
		[10, 11, 2, 1],
		[1, 2, 17, 9],
		[29, 9, 8, 26],
		[25, 26, 21, 20],
		[19, 20, 13, 12],
		[11, 12, 3, 2],
		[9, 8, 16, 17],
		[26, 8, 7, 21],
		[20, 21, 14, 13],
		[12, 13, 4, 3],
		[2, 3, 23, 17],
		[17, 16, 22, 23],
		[8, 7, 15, 16],
		[21, 7, 6, 14],
		[13, 14, 5, 4],
		[3, 4, 27, 23],
		[23, 22, 27],
		[16, 15, 22],
		[7, 6, 15],
		[14, 6, 5],
		[4, 5, 27],
	].map((a) =>
		petalPath(a as PathIntersectionIndices, lineSegmentIntersections, epicycloidLineSegments),
	);
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="oklch(0% 0% 300)" />
	<path d={epicycloidPath} stroke="red" fill="none" />
	{#each petalPaths as d, i}
		<path
			d={`M${d.map((p) => pointToString(p)).join(' ')}Z`}
			stroke="black"
			fill={i === 0
				? chroma.oklch(0.2, 0.37, 150).hex()
				: chroma.oklch(0.5, 0.37, 210 + (90 / (petalPaths.length + 1)) * i).hex()}
		/>
	{/each}
	<!--
	{#each lineSegmentIntersections as [lineSegmentIndexPair, point], i}
		<circle cx={point.x} cy={point.y} r={2} fill="yellow" />
		<text x={point.x} y={point.y} fill="yellow">{i} {lineSegmentIndexPair}</text>
	{/each}
	{#each epicycloidPoints as point, i}
		<circle cx={point.x} cy={point.y} r={1} fill="orange" stroke="black" stroke-width="0.25" />
		<text display="none" x={point.x} y={point.y} fill="yellow" font-size="0.5em">{i}</text>
	{/each}
	-->
</DrSvg>
