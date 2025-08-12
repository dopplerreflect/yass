<script lang="ts">
	import {
		anglesArray,
		phi,
		polygon,
		polygonPointString,
		radialPoint,
		type Circle,
		pointToString,
		mapCircleIntersections,
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

	const c = mapCircleIntersections(circles, 'y-asc');

	const p0 = [
		'M 0 0',
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('2.18.0')!),
		`A${r2} ${r2} 0 0 1 `,
		pointToString(c.get('2.12.0')!),
		`A${r0} ${r0} 0 0 1 `,
		`0 0`,
		`M${pointToString(c.get('16.18.1')!)}`,
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('1.18.0')!),
		`A${r1} ${r1} 0 0 1`,
		pointToString(c.get('1.12.0')!),
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('12.16.1')!),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(c.get('16.18.1')!),
		`M${pointToString(c.get('17.18.1')!)}`,
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('0.18.0')!),
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('12.17.1')!),
		`A${r2} ${r2} 0 0 1 `,
		pointToString(c.get('17.18.1')!),
		`M${pointToString(c.get('17.19.0')!)}`,
		`A${r2} ${r2} 0 0 1 `,
		pointToString(c.get('17.21.1')!),
		`A${r0} ${r0} 0 0 1 `,
		pointToString(c.get('0.18.0')!),
		'Z',
		`M${pointToString(c.get('17.19.0')!)}`,
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('19.21.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('16.21.1')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('16.20.0')!),
		'Z',
		`M${pointToString(c.get('16.20.1')!)}`,
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('20.21.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('0.21.1')!),
		'Z',
		`M${pointToString(c.get('16.19.1')!)}`,
		`A${r1} ${r1} 0 0 1 `,
		pointToString(c.get('1.19.0')!),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(c.get('1.16.0')!),
		`A${r1} ${r1} 0 0 1 `,
		pointToString(c.get('16.19.1')!),
	].join('');

	const p1 = [
		`M0 0`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('0.21.0')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('0.21.1')!),
		`A${r0} ${r0} 0 0 0 `,
		'0 0',
		`M${pointToString(c.get('2.19.0')!)}`,
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('2.16.0')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('16.20.0')!),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('1.20.0')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('1.17.1')!),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('17.19.0')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('2.19.0')!),
	].join('');

	const p2 = [
		`M${pointToString(c.get('2.12.0')!)}`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('12.16.1')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('16.19.1')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('3.19.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('2.3.0')!),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('2.12.0')!),
		`M${pointToString(c.get('1.12.0')!)}`,
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('12.17.1')!),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('17.21.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('19.21.1')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('1.19.0')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('1.12.0')!),
		`M${pointToString(c.get('1.16.0')!)}`,
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('16.21.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('20.21.1')!),
		`A${r2} ${r2} 0 0 0 `,
		pointToString(c.get('3.20.1')!),
		`A${r0} ${r0} 0 0 0 `,
		pointToString(c.get('1.3.0')!),
		`A${r1} ${r1} 0 0 0 `,
		pointToString(c.get('1.16.0')!),
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
