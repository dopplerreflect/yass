<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		lineIntersection,
		lineCircleIntersection,
		midpoint,
		parallelLinesToViewBox,
		phi,
		pointToString,
		radialPoint,
		radialPointString,
		type Line,
		type Point,
	} from '@dopplerreflect/geometry';
	const width = 1080;
	const height = 1080;
	const viewBox: [number, number, number, number] = [-width / 2, -height / 2, width, height];
	const baseRadius = (height / 2) * phi;
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
		i18: lineIntersection(l.l1, l.l7),
		i19: lineIntersection(l.l1, l.l9),
		i20: lineIntersection(l.l9, l.l3),
		i21: lineIntersection(l.l3, l.l1),
		i22: lineIntersection(l.l3, l.l7),
		i23: lineIntersection(l.l7, l.l5),
		i24: lineIntersection(l.l5, l.l9),
		i25: lineIntersection(l.l9, l.l7),
		i26: lineIntersection(l.l6, l.l0),
		i27: lineIntersection(l.l0, l.l9),
		i28: lineIntersection(l.l1, l.l8),
		i29: lineIntersection(l.l8, l.l2),
		i30: lineIntersection(l.l2, l.l1),
		i31: lineIntersection(l.l3, l.l0),
		i32: lineIntersection(l.l3, l.l4),
		i33: lineIntersection(l.l2, l.l5),
		i34: lineIntersection(l.l2, l.l6),
		i35: lineIntersection(l.l6, l.l5),
		i36: lineIntersection(l.l4, l.l7),
		i37: lineIntersection(l.l4, l.l8),
		i38: lineIntersection(l.l8, l.l6),
		i39: lineIntersection(l.l8, l.l0),
		i40: lineIntersection(l.l0, l.l2),
		i41: lineIntersection(l.l4, l.l6),
	} as Record<string, Point>;
	const is = Object.fromEntries(Object.entries(i).map(([k, v]) => [k, pointToString(v)]));
	const circle0path = [
		`M${radialPointString(0, r.r4)}A${r.r4} ${r.r4} 0 1 1 ${radialPointString(359.9, r.r4)}Z`,
		`M${radialPointString(0, r.r5)}A${r.r5} ${r.r5} 0 1 1 ${radialPointString(359.9, r.r5)}Z`,
	].join('');
	const circle1path = [
		`M${radialPointString(0, r.r6)}A${r.r6} ${r.r6} 0 1 1 ${radialPointString(359.9, r.r6)}Z`,
		`M${radialPointString(0, r.r7)}A${r.r7} ${r.r7} 0 1 1 ${radialPointString(359.9, r.r7)}Z`,
	].join('');
	const circle2path = [
		`M${radialPointString(0, r.r2)}A${r.r2} ${r.r2} 0 1 1 ${radialPointString(359.9, r.r2)}Z`,
		`M${radialPointString(0, r.r3)}A${r.r3} ${r.r3} 0 1 1 ${radialPointString(359.9, r.r3)}Z`,
	].join('');
	const pentagramPath = [
		`M${is.i18} ${is.i19} ${is.i20} ${is.i21} ${is.i2} ${is.i3} ${is.i22} ${is.i23} ${is.i24} ${is.i25}Z`,
		`M${is.i13} ${is.i26} ${is.i27}Z`,
		`M${is.i28} ${is.i29} ${is.i30}Z`,
		`M${is.i31} ${is.i9} ${is.i32}Z`,
		`M${is.i33} ${is.i34} ${is.i35}Z`,
		`M${is.i36} ${is.i37} ${is.i6}Z`,
		`M${is.i38} ${is.i39} ${is.i40} ${is.i10} ${is.i41}Z`,
	].join('');
	const dpath = [
		`M${is.i15}A${r.r4} ${r.r4} 0 1 1 ${is.i14}Z`,
		`M${is.i17}A${r.r5} ${r.r5} 0 1 1 ${is.i16}Z`,
	].join('');
	const rpath = [
		`M${is.i0}`,
		`A${r.r6} ${r.r6} 0 1 1 ${is.i1}`,
		`L${is.i2} ${is.i3} ${is.i4}`,
		`A${r.r6} ${r.r6} 0 0 1 ${is.i5}`,
		`L${is.i6}Z`,
		`M${is.i7}`,
		`A${r.r7} ${r.r7} 0 1 1 ${is.i8}`,
		`L${is.i8} ${is.i9} ${is.i10} ${is.i11}`,
		`A${r.r7} ${r.r7} 0 0 1 ${is.i12}`,
		`L${is.i13}Z`,
	].join('');
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#808080" />
	<g id="circles">
		<path d={circle0path} fill-rule="evenodd" />
		<path d={circle1path} fill-rule="evenodd" />
		<path d={circle2path} fill-rule="evenodd" />
	</g>
	<path d={pentagramPath} fill="#aaaaaa" fill-rule="evenodd" />
	<path d={dpath} fill="darkblue" fill-rule="evenodd" />
	<path d={rpath} fill="gold" fill-rule="evenodd" />
	<g id="guide" display="block">
		{#each starLines as l}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
		{/each}
		{#each Object.entries(r) as [k, v]}
			<circle r={v} stroke="white" fill="none" />
			<text
				x={radialPoint(0, v).x}
				y={radialPoint(0, v).y}
				fill="yellow"
				text-anchor="middle"
				alignment-baseline="middle">{k}</text
			>
		{/each}
		{#each Object.entries(a) as [k, v]}
			<path d={`M0 0 ${radialPointString(v, r.r0)}`} stroke="white" />
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
				y={midpoint(v).y - 20}
				fill="yellow"
				text-anchor="middle"
				alignment-baseline="middle">{k}</text
			>
		{/each}
		{#each Object.entries(i) as [k, v]}
			<circle cx={v!.x} cy={v!.y} r={12} fill="black" />
			<text x={v!.x} y={v!.y + 5} fill="yellow" text-anchor="middle" alignment-baseline="middle"
				>{k}</text
			>
		{/each}
	</g>
</DrSvg>
