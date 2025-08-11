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
	import chroma from 'chroma-js';
	type Props = {
		id: string;
		hexRadius?: number;
		hexStrokeWidth?: number;
		hexStroke?: string;
		circleStrokeWidth?: number;
		circleStroke?: string;
		circleFill?: string;
		circleFillOpacity?: number;
	};

	const {
		id,
		hexRadius = 50,
		hexStrokeWidth = 1,
		hexStroke = 'orange',
		circleStrokeWidth = 1,
		circleStroke = 'white',
		circleFill = 'white',
		circleFillOpacity = 0.1,
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

	//  d={`M0 0A${r0} ${r0} 0 0 1 ${pointToString(ci[76])}A${r2} ${r2} 0 0 1 ${pointToString(ci[93])}A${r0} ${r0} 0 0 1 0 0Z`}
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
	<g id="filledCircles" style="display:none">
		{#each circles as c}
			<circle r={c.r} cx={c.x} cy={c.y} fill={circleFill} fill-opacity={circleFillOpacity} />
		{/each}
	</g>
	<g id="strokedCircles" filter="url(#shadow)">
		{#each circles as c}
			<circle
				r={c.r}
				cx={c.x}
				cy={c.y}
				stroke={circleStroke}
				stroke-width={circleStrokeWidth}
				fill="none"
			/>
		{/each}
	</g>
	<g id="hexLines" filter="url(#shadow2)">
		<polygon
			points={polygonPointString(polygon(6, hexRadius))}
			stroke={hexStroke}
			stroke-width={hexStrokeWidth}
			fill="none"
		/>
		<path
			d={`M0 ${-hexRadius * 2}v${hexRadius}M0 ${hexRadius}v${hexRadius}`}
			stroke={hexStroke}
			stroke-width={hexStrokeWidth}
		/>
	</g>
	{#each ci as p, i}
		<text
			x={p.x}
			y={p.y}
			font-size={6}
			fill={chroma.oklch(0.75, 0.37, i, 0).hex()}
			dominant-baseline="middle"
			text-anchor="middle">{i}</text
		>
	{/each}
	<defs>
		<path id="p0" d={p0} fill="white" stroke="none" />
		<g id="g0">
			{#each angles as a}
				<use href="#p0" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p1" d={p1} fill="lightgreen" stroke="none" fill-rule="evenodd" />
		<g id="g1">
			{#each angles as a}
				<use href="#p1" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p2" d={p2} fill="red" stroke="none" />
		<g id="g2">
			{#each angles as a}
				<use href="#p2" transform={`rotate(${a})`} />
			{/each}
		</g>
		<filter id="shadow">
			<feGaussianBlur result="blur" in="SourceAlpha" stdDeviation={hexStrokeWidth} />
			<feOffset dx={0} dy={hexStrokeWidth * 2} result="blackOffset" />
			<feColorMatrix
				in="blur"
				values="0 0 0 0 1
								0 0 0 0 1
								0 0 0 0 1
								0 0 0 1 0"
				result="white"
			/>
			<feOffset dx={0} dy={hexStrokeWidth * 0} result="whiteOffset" />

			<feMerge>
				<feMergeNode in="whiteOffset" />
				<feMergeNode in="blackOffset" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="shadow2">
			<feGaussianBlur in="SourceAlpha" stdDeviation={hexStrokeWidth * 2} />
			<feOffset dx={0} dy={hexStrokeWidth * 3} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
</pattern>
