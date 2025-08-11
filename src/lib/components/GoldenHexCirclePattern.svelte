<script lang="ts">
	import {
		findCircleIntersections,
		anglesArray,
		phi,
		polygon,
		polygonPointString,
		radialPoint,
		radialPointString,
		type Circle,
		type Point,
		pointToString,
	} from '@dopplerreflect/geometry';

	type Colors = {
		circle?: string;
		hex?: string;
		g0?: string;
		g1?: string;
		g2?: string;
	};

	type Props = {
		id: string;
		colors?: Colors;
		hexRadius?: number;
		hexStrokeWidth?: number;
		circleStrokeWidth?: number;
	};

	const defaultColors: Colors = {
		circle: 'whitesmoke',
		hex: 'gold',
		g0: 'white',
		g1: 'powderblue',
		g2: 'goldenrod',
	};

	const {
		id,
		colors = defaultColors,
		hexRadius = 50,
		hexStrokeWidth = 1,
		circleStrokeWidth = 1,
	}: Props = $props();
	const hexWidth = hexRadius * Math.sqrt(3);

	const angles = anglesArray(6, 0);
	const radii = [...Array(3).keys()].map((k) => hexWidth * phi ** k);
	const [a0, a1, a2, a3, a4, a5] = angles;
	const [r0, r1, r2] = radii;
	const circles: Circle[] = [
		radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) =>
			radii.map((r) => ({
				r,
				...radialPoint(a, hexWidth / 2, { center: radialPoint(a, hexWidth / 2) }),
			})),
		),
		{ r: hexWidth, x: 0, y: -hexRadius * 3 },
		{ r: hexWidth, x: 0, y: hexRadius * 3 },
	].flat();

	const ci: Point[] = findCircleIntersections(circles);

	const p0 = [
		'M 0 0',
		`A${r0} ${r0} 0 0 1 `,
		pointToString(ci[80]),
		`A${r2} ${r2} 0 0 1 `,
		pointToString(ci[97]),
		`A${r0} ${r0} 0 0 1 `,
		`0 0 Z`,
		`M${pointToString(ci[114])}`,
		`A${r0} ${r0} 0 0 1 `,
		pointToString(ci[40]),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(ci[65]),
		`A${r0} ${r0} 0 0 1 `,
		pointToString(ci[215]),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(ci[114]),
		`Z`,
		`M${pointToString(ci[116])}`,
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[217]),
		`A${r0} ${r0} 0 0 0 `,
		radialPointString(a5, r0),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[116]),
		'Z',
		`M${pointToString(ci[223])}`,
		`A${r1} ${r1} 0 0 1 `,
		pointToString(ci[72]),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(ci[67]),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(ci[223]),
		'Z',
		`M${radialPointString(a4, r0)}`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[233]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[230]),
		'Z',
		`M${pointToString(ci[230])}`,
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[236]),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[227]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[225]),
		`M${pointToString(ci[225])}`,
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[238]),
		`A${r0} ${r0} 0 0 0 `,
		radialPointString(a5, r0),
		'Z',
	].join('');

	const p1 = [
		'M0 0',
		`A${r0} ${r0} 0 0 0 `,
		radialPointString(a4, r0),
		`A${r0} ${r0} 0 0 0 `,
		radialPointString(a5, r0),
		`A${r0} ${r0} 0 0 0 0 0`,
		'Z',
		`M${pointToString(ci[98])}`,
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[94]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[225]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[75]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[68]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[230]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[98]),
		'Z',
	].join('');

	const p2 = [
		`M${pointToString(ci[89])}`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[195]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[223]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[114]),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[76]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[89]),
		'Z',
		`M${pointToString(ci[59])}`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[197]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[233]),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[236]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[72]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[59]),
		'Z',
		`M${pointToString(ci[67])}`,
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[227]),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[238]),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(ci[116]),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(ci[40]),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(ci[67]),
		'Z',
	].join('');
</script>

<pattern
	{id}
	width={hexWidth}
	height={hexRadius * 3}
	viewBox={`${-hexWidth / 2} ${-hexRadius * 1.5} ${hexWidth} ${hexRadius * 3}`}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${-hexWidth / 2} ${-hexRadius * 1.5})`}
>
	<use href="#g0" />
	<use href="#g1" />
	<use href="#g2" />
	<g id="strokedCircles" filter="url(#shadow)">
		{#each circles as c}
			<circle
				r={c.r}
				cx={c.x}
				cy={c.y}
				stroke={colors.circle}
				stroke-width={circleStrokeWidth}
				fill="none"
			/>
		{/each}
	</g>
	<g id="hexLines" filter="url(#shadow2)">
		<polygon
			points={polygonPointString(polygon(6, hexRadius))}
			stroke={colors.hex}
			stroke-width={hexStrokeWidth}
			fill="none"
		/>
		<path
			d={`M0 ${-hexRadius * 2}v${hexRadius}M0 ${hexRadius}v${hexRadius}`}
			stroke={colors.hex}
			stroke-width={hexStrokeWidth}
		/>
	</g>
	{#each ci as p, i}
		<text
			x={p.x}
			y={p.y}
			font-size={8}
			fill={`hsla(${i} 100% 50% / 0)`}
			dominant-baseline="middle"
			text-anchor="middle">{i}</text
		>
	{/each}

	<defs>
		<path id="p0" d={p0} fill={colors.g0} stroke="none" />
		<g id="g0">
			{#each angles as a}
				<use href="#p0" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p1" d={p1} fill={colors.g1} stroke="none" fill-rule="evenodd" />
		<g id="g1">
			{#each angles as a}
				<use href="#p1" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p2" d={p2} fill={colors.g2} stroke="none" />
		<g id="g2">
			{#each angles as a}
				<use href="#p2" transform={`rotate(${a})`} />
			{/each}
		</g>
		<filter id="shadow">
			<feGaussianBlur result="blur" in="SourceAlpha" stdDeviation={hexStrokeWidth / 2} />
			<feOffset dx={0} dy={hexStrokeWidth * 1} result="blackOffset" />
			<feColorMatrix
				in="blur"
				values="0 0 0 0 1
								0 0 0 0 1
								0 0 0 0 1
								0 0 0 1 0"
				result="white"
			/>
			<feOffset dx={0} dy={-hexStrokeWidth * 1} result="whiteOffset" />

			<feMerge>
				<feMergeNode in="whiteOffset" />
				<feMergeNode in="blackOffset" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="shadow2">
			<feGaussianBlur in="SourceAlpha" stdDeviation={hexStrokeWidth / 2} />
			<feOffset dx={0} dy={hexStrokeWidth * 1} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
</pattern>
