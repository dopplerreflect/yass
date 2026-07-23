<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, arrayMap, goldenCircles, phi, type Line } from '@dopplerreflect/geometry';
	import { rotateLineAroundOrigin } from './rotateLineAroundOrigin';
	import { DRsvgObjectTracker } from './drsvg-object-tracker';
	import Style from './style.css?raw';
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
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<svelte:element this={"style"}>
			{@html Style}
		</svelte:element>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#202020" />
	<g class="lines">
		{#each lines() as l}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
		{/each}
	</g>
	<g class="circles">
		{#each circles() as c}
			<circle cx={c.x} cy={c.y} r={c.r} stroke="white" fill="none" />
		{/each}
	</g>
	<g class="guide">
		{#each Object.entries(points()) as [k, p], i}
			<circle cx={p.x} cy={p.y} r={1} fill="yellow" />
			<text x={p.x} y={p.y} fill="yellow" font-size="0.5em">{k}</text>
		{/each}
	</g>
</DrSvg>
