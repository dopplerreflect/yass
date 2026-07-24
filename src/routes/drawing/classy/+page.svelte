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
	import CairoPattern from '$lib/components/CairoPattern.svelte';
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

	type PathSegments = (string | number)[];
	function segmentsToPath(segments: PathSegments) {
		return segments
			.map((s) => (typeof s === 'string' ? s : pointToString(points()[`p${s}`])))
			.join(' ');
	}
	// prettier ignore
	const path1Segments: PathSegments = [
		'M',
		155,
		222,
		21,
		390,
		187,
		156,
		193,
		420,
		123,
		219,
		'Z',
		'M',
		218,
		350,
		293,
		163,
		'Z',
		'M',
		188,
		565,
		41,
		13,
		'Z',
		'M',
		366,
		223,
		157,
		260,
		'Z',
	];
	const path2Segments: PathSegments = [
		'M',
		193,
		188,
		13,
		149,
		115,
		154,
		207,
		244,
		163,
		293,
		'Z',
		'M',
		218,
		123,
		420,
		193,
		350,
		'Z',
		'M',
		156,
		187,
		41,
		565,
		'Z',
		'M',
		20,
		38,
		64,
		90,
		'Z',
		'M',
		537,
		112,
		183,
		162,
		'Z',
		'M',
		410,
		128,
		215,
		351,
		207,
		'Z',
	];
	const maskPath = segmentsToPath([
		'M',
		155,
		222,
		21,
		223,
		157,
		227,
		47,
		228,
		226,
		232,
		73,
		231,
		160,
		210,
		98,
		211,
		209,
		214,
		128,
		215,
		163,
		218,
		123,
		219,
		'Z',
	]);

	const path1 = segmentsToPath(path1Segments);
	const path2 = segmentsToPath(path2Segments);
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<CairoPattern hue={hue + 0} unit={radii[0] / 2} lightness={0.95} />
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={2}></feMorphology>
			<feGaussianBlur stdDeviation={1} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={3}
				diffuseConstant={1}
				lighting-color={oklch(1, 0.37, hue).hex()}
				result="light"
			>
				<feDistantLight azimuth="90" elevation="5" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="1"
				k2="1"
				k3="1"
				k4="0"
			/>
			<feGaussianBlur stdDeviation={0} />
		</filter>
		<style>
			.circles {
				display: block;
				fill: none;
				stroke: #ffffff;
			}
			.lines {
				display: block;
				stroke: #ffffff;
			}
			.guide {
				display: none;
				fill: yellow;
			}
			#stardodeca {
				display: block;
			}
		</style>
		<path id="path1" d={path1} />
		<path id="path2" d={path2} />
		<path id="maskPath" d={maskPath} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#202020" />
	<rect
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill="url(#CairoPattern)"
		filter="url(#topLight)"
	/>
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
	<g id="stardodeca" stroke={oklch(0.95, 0.185, 90, 0.5).hex()}>
		<use href="#path1" fill={oklch(0.75, 0.09, hue, 0.85).hex()} />
		<use href="#path2" fill={oklch(0.7, 0.09, hue, 0.85).hex()} />
		<use href="#path1" fill={oklch(0.5, 0.09, hue, 0.85).hex()} transform="rotate(120)" />
		<use href="#path2" fill={oklch(0.65, 0.09, hue, 0.85).hex()} transform="rotate(120)" />
		<use href="#path1" fill={oklch(0.6, 0.09, hue, 0.85).hex()} transform="rotate(240)" />
		<use href="#path2" fill={oklch(0.55, 0.09, hue, 0.85).hex()} transform="rotate(240)" />
	</g>
</DrSvg>
