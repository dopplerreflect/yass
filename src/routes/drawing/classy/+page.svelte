<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		arrayMap,
		goldenCircles,
		phi,
		pointToString,
		type Line,
		type Point,
	} from '@dopplerreflect/geometry';
	import { rotateLineAroundOrigin } from './rotateLineAroundOrigin';
	import { DRsvgObjectTracker } from './drsvg-object-tracker';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;
	const hue = 270;
	const width = 1080;
	const height = 1080;

	const baseRadius = height / 4;

	const angles = anglesArray(6);
	const radii = arrayMap(3, (n) => baseRadius * phi ** n);
	const ot = new DRsvgObjectTracker();

	goldenCircles(radii, angles).forEach((c) => ot.add(c));

	const points = () => ot.points;
	const lines = () => ot.lines;
	const circles = () => ot.circles;

	function rotateAndAddLines(lines: Line[]) {
		lines.forEach((line) =>
			angles.forEach((angle) => ot.add(rotateLineAroundOrigin(line, angle - 90))),
		);
	}
	rotateAndAddLines([
		[
			{ x: 0, y: 0 },
			{ x: 0, y: radii[0] + radii[1] },
		],
		[points().p123, points().p21],
		[points().p21, points().p73],
	]);
	rotateAndAddLines([
		[points().p155, points().p157],
		[points().p157, points().p13],
		[points().p157, points().p64],
		[points().p187, points().p201],
		[points().p73, points().p201],
		[points().p199, points().p47],
		[points().p187, points().p205],
	]);
	rotateAndAddLines([
		[points().p223, points().p188],
		[points().p218, points().p41],
	]);

	type PathSegments = (string | Point)[];
	function segmentsToPath(segments: PathSegments) {
		return segments.map((s) => (typeof s === 'string' ? s : pointToString(s))).join(' ');
	}

	const path1Segments: PathSegments = [
		'M',
		points().p155,
		points().p222,
		points().p21,
		points().p390,
		points().p187,
		points().p156,
		points().p193,
		points().p420,
		points().p123,
		points().p219,
		'Z',
		'M',
		points().p218,
		points().p350,
		points().p293,
		points().p163,
		'Z',
		'M',
		points().p188,
		points().p565,
		points().p41,
		points().p13,
		'Z',
		'M',
		points().p366,
		points().p223,
		points().p157,
		points().p260,
		'Z',
	];
	const path2Segments: PathSegments = [
		'M',
		points().p193,
		points().p188,
		points().p13,
		points().p149,
		points().p115,
		points().p154,
		points().p207,
		points().p244,
		points().p163,
		points().p293,
		'Z',
		'M',
		points().p218,
		points().p123,
		points().p420,
		points().p193,
		points().p350,
		'Z',
		'M',
		points().p156,
		points().p187,
		points().p41,
		points().p565,
		'Z',
		'M',
		points().p20,
		points().p38,
		points().p64,
		points().p90,
		'Z',
		'M',
		points().p537,
		points().p112,
		points().p183,
		points().p162,
		'Z',
		'M',
		points().p410,
		points().p128,
		points().p215,
		points().p351,
		points().p207,
		'Z',
	];
	const path1 = segmentsToPath(path1Segments);
	const path2 = segmentsToPath(path2Segments);
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<style>
			.circles {
				display: none;
				fill: none;
				stroke: #a0a0ff;
			}
			.lines {
				display: none;
				stroke: #a0a0a0;
			}
			.guide {
				display: none;
				fill: yellow;
			}
		</style>
		<path id="path1" d={path1} />
		<path id="path2" d={path2} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#202020" />
	<g class="lines">
		{#each lines() as l}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} />
		{/each}
	</g>
	<g class="circles">
		{#each circles() as c}
			<circle cx={c.x} cy={c.y} r={c.r} />
		{/each}
	</g>
	<g class="guide">
		{#each Object.entries(points()) as [k, p], i}
			<circle cx={p.x} cy={p.y} r={1} />
			<text x={p.x} y={p.y} font-size="0.5em">{k}</text>
		{/each}
	</g>
	<g stroke={oklch(0.5, 0.185, 90, 0.5).hex()}>
		<use href="#path1" fill={oklch(1.0, 0.37, hue, 0.85).hex()} />
		<use href="#path2" fill={oklch(0.95, 0.37, hue, 0.85).hex()} />
		<use href="#path1" fill={oklch(0.8, 0.37, hue, 0.85).hex()} transform="rotate(120)" />
		<use href="#path2" fill={oklch(0.9, 0.37, hue, 0.85).hex()} transform="rotate(120)" />
		<use href="#path1" fill={oklch(0.85, 0.37, hue, 0.85).hex()} transform="rotate(240)" />
		<use href="#path2" fill={oklch(0.75, 0.37, hue, 0.85).hex()} transform="rotate(240)" />
	</g>
</DrSvg>
