<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		findCircleIntersections,
		phi,
		pointToString,
		radialPoint,
		type Circle,
		type Point,
	} from '@dopplerreflect/geometry';

	const scale = 1;
	const width = 1080 * scale;
	const height = 1080 * scale;
	const r = height / 4;
	const radii = [...Array(4).keys()].map((i) => r * phi ** i);
	radii.splice(1, 0, radii[1] + radii[3] * phi);
	const [r0, r1, r2, r3, r4] = radii;

	function arc(radius: number, flags: string, point: Point, cheat?: number): string {
		const dpoint = cheat ? radialPoint(cheat, 1 * scale, { center: point }) : point;
		const result = `A${radius} ${radius} ${flags} ${pointToString(dpoint)}`;
		return result;
	}
	const angles: number[] = anglesArray(6);

	const circles: Circle[] = [
		...radii.map((r) => ({ x: 0, y: 0, r })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) }))).flat(),
	];

	const circles0: Circle[] = [
		...radii.slice(0, 2).map((r) => ({ x: 0, y: 0, r })),
		...angles.map((a) => radii.slice(0, 2).map((r) => ({ r, ...radialPoint(a, radii[0]) }))),
	].flat();

	const c0: Point[] = findCircleIntersections(circles0);

	const p0: string = [
		`M${pointToString(c0[50])}`,
		arc(r0, '0 0 1', c0[42]),
		arc(r0, '0 0 1', c0[65]),
		arc(r0, '0 0 1', c0[80]),
		arc(r0, '0 0 1', c0[91]),
		arc(r0, '0 0 1', c0[102]),
		arc(r0, '0 0 1', c0[50]),
		`Z`,
		`M${pointToString(c0[62])}`,
		arc(r1, '0 0 1', c0[53]),
		arc(r0, '0 0 0', c0[4]),
		arc(r0, '0 0 0', c0[62]),
		`Z`,
		`M${pointToString(c0[44])}`,
		arc(r1, '0 0 1', c0[72]),
		arc(r0, '0 0 0', c0[1]),
		arc(r0, '0 0 0', c0[44]),
		`Z`,
		`M${pointToString(c0[66])}`,
		arc(r1, '0 0 1', c0[85]),
		arc(r0, '0 0 0', c0[5]),
		arc(r0, '0 0 0', c0[66]),
		`Z`,
		`M${pointToString(c0[81])}`,
		arc(r1, '0 0 1', c0[96]),
		arc(r0, '0 0 0', c0[8]),
		arc(r0, '0 0 0', c0[81]),
		`Z`,
		`M${pointToString(c0[92])}`,
		arc(r1, '0 0 1', c0[105]),
		arc(r0, '0 0 0', c0[11]),
		arc(r0, '0 0 0', c0[92]),
		`Z`,
		`M${pointToString(c0[103])}`,
		arc(r1, '0 0 1', c0[52]),
		arc(r0, '0 0 0', c0[0]),
		arc(r0, '0 0 0', c0[103]),
		`Z`,
		`M${pointToString(c0[64])}`,
		arc(r1, '0 0 1', c0[17]),
		arc(r0, '0 0 0', c0[2]),
		arc(r0, '0 0 1', c0[64]),
		`Z`,
		`M${pointToString(c0[55])}`,
		arc(r1, '0 0 1', c0[3]),
		arc(r0, '0 0 0', c0[6]),
		arc(r0, '0 0 1', c0[55]),
		`Z`,
		`M${pointToString(c0[74])}`,
		arc(r1, '0 0 1', c0[7]),
		arc(r0, '0 0 0', c0[9]),
		arc(r0, '0 0 1', c0[74]),
		`Z`,
		`M${pointToString(c0[87])}`,
		arc(r1, '0 0 1', c0[10]),
		arc(r0, '0 0 0', c0[12]),
		arc(r0, '0 0 1', c0[87]),
		`Z`,
		`M${pointToString(c0[98])}`,
		arc(r1, '0 0 1', c0[13]),
		arc(r0, '0 0 0', c0[14]),
		arc(r0, '0 0 1', c0[98]),
		`Z`,
		`M${pointToString(c0[107])}`,
		arc(r1, '0 0 1', c0[15]),
		arc(r0, '0 0 0', c0[16]),
		arc(r0, '0 0 1', c0[107]),
		`Z`,
		`M${pointToString(c0[20])}`,
		arc(r1, '0 0 1', c0[41]),
		arc(r0, '0 0 0', c0[71]),
		arc(r0, '0 0 0', c0[70]),
		arc(r0, '0 0 1', c0[63]),
		arc(r0, '0 0 1', c0[59]),
		arc(r0, '0 0 0', c0[60]),
		arc(r0, '0 0 1', c0[20]),
		`Z`,
		`M${pointToString(c0[24])}`,
		arc(r1, '0 0 1', c0[21]),
		arc(r0, '0 0 0', c0[57]),
		arc(r0, '0 0 0', c0[58]),
		arc(r0, '0 0 1', c0[56]),
		arc(r0, '0 0 1', c0[78]),
		arc(r0, '0 0 0', c0[79]),
		arc(r0, '0 0 1', c0[24]),
		`Z`,
		`M${pointToString(c0[28])}`,
		arc(r1, '0 0 1', c0[25]),
		arc(r0, '0 0 0', c0[76]),
		arc(r0, '0 0 0', c0[77]),
		arc(r0, '0 0 1', c0[75]),
		arc(r0, '0 0 1', c0[47]),
		arc(r0, '0 0 0', c0[46]),
		arc(r0, '0 0 1', c0[28]),
		`Z`,
		`M${pointToString(c0[32])}`,
		arc(r1, '0 0 1', c0[29]),
		arc(r0, '0 0 0', c0[89]),
		arc(r0, '0 0 0', c0[90]),
		arc(r0, '0 0 1', c0[88]),
		arc(r0, '0 0 1', c0[69]),
		arc(r0, '0 0 0', c0[68]),
		arc(r0, '0 0 1', c0[32]),
		`Z`,
		`M${pointToString(c0[36])}`,
		arc(r1, '0 0 1', c0[33]),
		arc(r0, '0 0 0', c0[100]),
		arc(r0, '0 0 0', c0[101]),
		arc(r0, '0 0 1', c0[99]),
		arc(r0, '0 0 1', c0[84]),
		arc(r0, '0 0 0', c0[83]),
		arc(r0, '0 0 1', c0[36]),
		`Z`,
		`M${pointToString(c0[40])}`,
		arc(r1, '0 0 1', c0[37]),
		arc(r0, '0 0 0', c0[49]),
		arc(r0, '0 0 0', c0[48]),
		arc(r0, '0 0 1', c0[108]),
		arc(r0, '0 0 1', c0[95]),
		arc(r0, '0 0 0', c0[94]),
		arc(r0, '0 0 1', c0[40]),
		`Z`,
	].join('');

	const circles1: Circle[] = [
		...radii.slice(2, 4).map((r) => ({ x: 0, y: 0, r })),
		...angles.map((a) => radii.slice(2, 4).map((r) => ({ r, ...radialPoint(a, radii[0]) }))),
	].flat();

	const c1: Point[] = findCircleIntersections(circles1);

	const p1: string | null = r4
		? [
				`M${pointToString(c1[28])}`,
				arc(r2, '0 0 1', c1[24]),
				arc(r2, '0 0 1', c1[30]),
				arc(r2, '0 0 1', c1[34]),
				arc(r2, '0 0 1', c1[38]),
				arc(r2, '0 0 1', c1[42]),
				arc(r2, '0 0 1', c1[28]),
				`Z`,
				`M${pointToString(c1[2])}`,
				arc(r3, '1 1 1', c1[2], 0.1),
				`Z`,
				`M${pointToString(c1[5])}`,
				arc(r3, '1 1 1', c1[5], 60),
				`Z`,
				`M${pointToString(c1[8])}`,
				arc(r3, '1 1 1', c1[8], 120),
				`Z`,
				`M${pointToString(c1[11])}`,
				arc(r3, '1 1 1', c1[11], 180),
				`Z`,
				`M${pointToString(c1[14])}`,
				arc(r3, '1 1 1', c1[14], 240),
				`Z`,
				`M${pointToString(c1[17])}`,
				arc(r3, '1 1 1', c1[17], 300),
				`Z`,
				`M${pointToString(c1[21])}`,
				arc(r3, '1 1 1', c1[21], 0.1),
				`Z`,
			].join('')
		: null;

	const p2: string | null = r4
		? [
				`M${pointToString(radialPoint(0, r4))}`,
				arc(r4, '1 1 1', radialPoint(359.9, r4)),
				`Z`,
				...angles.map((a) =>
					[
						`M${pointToString(radialPoint(0, r4, { center: radialPoint(a, r0) }))}`,
						arc(r4, '1 1 1', radialPoint(359.9, r4, { center: radialPoint(a, r0) })),
						`Z`,
					].join(''),
				),
			].join('')
		: null;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<radialGradient id="gradient0">
			<stop offset="0" stop-color="darkblue" />
			<stop offset="1" stop-color="#ffffff00" />
		</radialGradient>
		<radialGradient id="gradient1">
			<stop offset="0" stop-color="white" />
			<stop offset="1" stop-color="#ffffff00" />
		</radialGradient>
		<radialGradient id="gradient2">
			<stop offset="0" stop-color="darkred" />
			<stop offset="1" stop-color="#ffffff00" />
		</radialGradient>
		<filter id="shadow">
			<feDropShadow stdDeviation={20 * scale} dy={10 * scale} />
		</filter>
		<filter id="glow">
			<feMorphology operator="dilate" radius={1 * scale} />
			<feGaussianBlur stdDeviation={3 * scale} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<path d={`M${-width / 2} ${-height / 2}H${width}V${height}H${-width}Z`} fill="black" />

	<g id="circles" filter="url(#glow)">
		{#each circles as c}
			<circle cx={c.x} cy={c.y} r={c.r} stroke="#400080" stroke-width={1 * scale} fill="none" />
		{/each}
	</g>
	<g id="paths" display="block">
		<g id="circles0-c0" display="block">
			<path d={p0} fill="url(#gradient0)" fill-rule="evenodd" filter="url(#shadow)" />
			<path display="none" d={p0} fill="#444444" fill-rule="evenodd" />
		</g>
		<g id="circles1-c1" display="block">
			<path
				display="block"
				d={p1}
				fill="url(#gradient1)"
				fill-rule="evenodd"
				filter="url(#shadow)"
			/>
			<path display="none" d={p1} fill="#aaaaaa" fill-rule="evenodd" />
		</g>
		<g id="innercircles" display="block" fill="url(#gradient2)" filter="url(#shadow)">
			<path d={p2} />
		</g>
	</g>
	<g id="outer-circles-intersection-indices" display="none">
		{#each c0 as c, i}
			<circle r={3 * scale} cx={c.x} cy={c.y} fill="yellow" />
			<text display="none" x={c.x} y={c.y} font-size={`${0.75 * scale}em`} fill="yellow">{i}</text>
		{/each}
	</g>
	<g id="inner-circles-intersection-indices" display="none">
		{#each c1 as c, i}
			<circle r={3 * scale} cx={c.x} cy={c.y} fill="yellow" />
			<text display="none" x={c.x} y={c.y} font-size={`${0.75 * scale}em`} fill="yellow">{i}</text>
		{/each}
	</g>
</DrSvg>
