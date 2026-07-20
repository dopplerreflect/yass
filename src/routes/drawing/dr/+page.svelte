<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		lineIntersection,
		midpoint,
		phi,
		radialPoint,
		radialPointString,
		type Line,
	} from '@dopplerreflect/geometry';
	import { parallelLinesToViewBox } from './parallelLines';
	import { lineCircleIntersection } from './lineCircleIntersection';
	const width = 1080;
	const height = 1080;
	const viewBox: [number, number, number, number] = [-width / 2, -height / 2, width, height];
	const baseRadius = (height / 2) * 0.9;
	const angles = anglesArray(60);
	const a = Object.fromEntries(angles.map((a, i) => [`a${i}`, a])) as Record<string, number>;
	const radii = [...Array(4).keys()].map((k) => baseRadius * phi ** k);
	const sr = (radii[2] - radii[3]) / 2;
	radii.push(radii[0] + sr);
	radii.push(radii[0] - sr);
	radii.push(radii[1] + sr);
	radii.push(radii[1] - sr);
	const r = Object.fromEntries(radii.map((r, i) => [`r${i}`, r])) as Record<string, number>;
	const starAngles = [...Array(5).keys()].map((k) => k * 72 - 90);
	const starLines = starAngles.map(
		(a, i) =>
			[radialPoint(a, r.r0), radialPoint(starAngles[(i + 2) % starAngles.length], r.r0)] as Line,
	);
	const plines = starLines.map((s) => parallelLinesToViewBox(s, sr, viewBox)).flat();
	const l = Object.fromEntries(plines.map((l, i) => [`l${i}`, l]));
	console.log(l);
	const dpath = [
		`M`,
		radialPointString(a.a0, r.r0),
		`A${r.r0} ${r.r0} 0 1 1`,
		radialPointString(a.a36, r.r0),
		`Z`,
	].join(' ');
	const rpath = [
		`M`,
		radialPointString(a.a50, r.r1),
		`A${r.r1} ${r.r1} 0 1 1`,
		radialPointString(a.a22, r.r1),
		`L`,
		radialPointString(a.a24, r.r0),
		radialPointString(a.a30, r.r2),
		radialPointString(a.a34, r.r1),
		`A${r.r1} ${r.r1} 0 0 1`,
		radialPointString(a.a38, r.r1),
		`L`,
		radialPointString(a.a54, r.r2),
		`Z`,
	].join(' ');
	const c = { x: 0, y: 0 };
	const i = {
		i0: lineCircleIntersection(l.l8, { r: r.r6, ...c })[1],
		i1: lineCircleIntersection(l.l1, { r: r.r6, ...c })[0],
		i2: lineIntersection(l.l1, l.l5),
		i3: lineIntersection(l.l3, l.l5),
		i4: lineCircleIntersection(l.l3, { r: r.r6, ...c })[0],
		i5: lineCircleIntersection(l.l7, { r: r.r6, ...c })[0],
		i6: lineIntersection(l.l7, l.l8),
		i7: lineCircleIntersection(l.l9, { r: r.r7, ...c })[1],
		i8: lineCircleIntersection(l.l0, { r: r.r7, ...c })[0],
		i9: lineIntersection(l.l0, l.l4),
		i10: lineIntersection(l.l2, l.l4),
		i11: lineCircleIntersection(l.l2, { r: r.r7, ...c })[1],
		i12: lineCircleIntersection(l.l6, { r: r.r7, ...c })[0],
		i13: lineIntersection(l.l6, l.l9),
		i14: lineCircleIntersection(l.l7, { r: r.r4, ...c })[0],
		i15: lineCircleIntersection(l.l7, { r: r.r4, ...c })[1],
		i16: lineCircleIntersection(l.l6, { r: r.r5, ...c })[0],
		i17: lineCircleIntersection(l.l6, { r: r.r5, ...c })[1],
	};
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each starLines as l}
		<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
	{/each}
	{#each Object.entries(r) as [k, v]}
		<circle r={v} stroke="lightgreen" fill="none" />
		<text
			x={radialPoint(0, v).x}
			y={radialPoint(0, v).y}
			fill="yellow"
			text-anchor="middle"
			alignment-baseline="middle">{k}</text
		>
	{/each}
	<g display="block">
		<path d={dpath} fill="none" stroke="#0000ff80" stroke-width={r.r2 - r.r3} />
		<path d={rpath} fill="none" stroke="#ffff0080" stroke-width={r.r2 - r.r3} />
	</g>
	{#each Object.entries(a) as [k, v]}
		<path d={`M0 0 ${radialPointString(v, r.r0)}`} stroke="#802080" />
		<text
			x={radialPoint(v, r.r0).x}
			y={radialPoint(v, r.r0 + 10).y}
			fill="yellow"
			alignment-baseline="middle"
			text-anchor="middle">{k}</text
		>
	{/each}
	{#each Object.entries(l) as [k, v]}
		<line x1={v[0].x} y1={v[0].y} x2={v[1].x} y2={v[1].y} stroke="white" />
		<text
			x={midpoint(v).x}
			y={midpoint(v).y}
			fill="yellow"
			text-anchor="middle"
			alignment-baseline="middle">{k}</text
		>
	{/each}
	{#each Object.entries(i) as [k, v]}
		<circle cx={v!.x} cy={v!.y} r={20} fill="black" />
		<text x={v!.x} y={v!.y} fill="yellow" text-anchor="middle" alignment-baseline="middle">{k}</text
		>
	{/each}
</DrSvg>
