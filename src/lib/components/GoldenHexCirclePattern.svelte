<script lang="ts">
	import {
		anglesArray,
		phi,
		polygon,
		polygonPointString,
		radialPoint,
		type AnnotatedCircle,
		pointToString,
		mapCircleIntersections,
	} from '@dopplerreflect/geometry';
	import type { GoldenHexCirclePatternTheme } from '$lib/types';

	type Props = {
		id: string;
		theme?: GoldenHexCirclePatternTheme;
		hexRadius?: number;
	};

	const defaultTheme: GoldenHexCirclePatternTheme = {
		circleStrokeWidth: 2,
		hexStrokeWidth: 2,
		circle: 'whitesmoke',
		hex: 'gold',
		g0: 'white',
		g1: 'powderblue',
		g2: 'goldenrod',
	};

	const { id, theme = defaultTheme, hexRadius = 50 }: Props = $props();
	const hexWidth = hexRadius * Math.sqrt(3);

	const angles = anglesArray(6, 0);
	const radii = [...Array(4).keys()].map((k) => hexWidth * phi ** k);
	const [r0, r1, r2] = radii;
	const circles: AnnotatedCircle[] = [
		radii.map((r, ri) => ({ r, x: 0, y: 0, ai: 'c', ri })),
		...angles.map((a, ai) =>
			radii.map((r, ri) => ({
				r,
				...radialPoint(a, hexWidth / 2, { center: radialPoint(a, hexWidth / 2) }),
				ai,
				ri,
			})),
		),
		{ r: hexWidth, x: 0, y: -hexRadius * 3, ai: 't', ri: 0 },
		{ r: hexWidth, x: 0, y: hexRadius * 3, ai: 'b', ri: 0 },
	].flat();

	const c = mapCircleIntersections(circles, 'y-asc');

	const ar01 = `A${r0} ${r0} 0 0 1 `;
	const ar11 = `A${r1} ${r1} 0 0 1 `;
	const ar21 = `A${r2} ${r2} 0 0 1 `;
	const ar00 = `A${r0} ${r0} 0 0 0 `;
	const ar10 = `A${r1} ${r1} 0 0 0 `;
	const ar20 = `A${r2} ${r2} 0 0 0 `;

	function p(s: string) {
		return pointToString(c.get(s)!);
	}
	const p0 = [
		`M 0 0${ar01}`,
		p('c.2-5.0:0'),
		`A${r2} ${r2} 0 0 1 `,
		p('c.2-3.0:0'),
		ar01,
		`0 0 ZM${p('4.1-5.0:1')}`,
		ar01,
		p('c.1-5.0:0'),
		ar11,
		p('c.1-3.0:0'),
		ar01,
		p('3.0-4.1:1'),
		ar11,
		p('4.1-5.0:1'),
		`ZM${p('4.2-5.0:1')}`,
		ar01,
		p('c.0-t.0:0'),
		ar01,
		p('3.0-4.2:1'),
		ar21,
		p('4.2-5.0:1'),
		`ZM${p('4.2-5.1:0')}`,
		ar01,
		p('4.2-t.0:1'),
		ar01,
		p('c.0-t.0:0'),
		`ZM${p('4.1-5.2:0')}`,
		ar11,
		p('4.1-t.0:1'),
		ar01,
		p('5.1-t.0:1'),
		ar11,
		p('4.2-5.1:0'),
		`ZM${p('c.0-t.0:1')}`,
		ar01,
		p('5.2-t.0:1'),
		ar21,
		p('4.1-5.2:0'),
		`ZM${p('4.1-5.1:1')}`,
		ar11,
		p('c.1-5.1:0'),
		ar11,
		p('c.1-4.1:0'),
		ar11,
		p('4.1-5.1:1'),
		`Z`,
	].join('');
	const p1 = [
		`M0 0${ar00}`,
		p('c.0-t.0:0'),
		ar00,
		p('c.0-t.0:1'),
		ar00,
		`0 0ZM${p('c.2-5.1:0')}`,
		ar20,
		p('c.2-4.1:0'),
		ar10,
		p('4.1-5.2:0'),
		ar20,
		p('c.1-5.2:0'),
		ar10,
		p('c.1-4.2:0'),
		ar20,
		p('4.2-5.1:0'),
		ar10,
		p('c.2-5.1:0'),
		`Z`,
	].join('');
	const p2 = [
		`M${p('c.2-0.0:0')}`,
		ar20,
		p('c.2-3.0:0'),
		ar00,
		p('3.0-4.1:1'),
		ar10,
		p('4.1-5.1:1'),
		ar10,
		p('0.0-5.1:1'),
		ar00,
		p('c.2-0.0:0'),
		`ZM${p('c.1-5.1:0')}`,
		ar10,
		p('c.1-3.0:0'),
		ar00,
		p('3.0-4.2:1'),
		ar20,
		p('4.2-t.0:1'),
		ar00,
		p('5.1-t.0:1'),
		ar10,
		p('c.1-5.1:0'),
		`ZM${p('c.1-4.1:0')}`,
		ar10,
		p('4.1-t.0:1'),
		ar00,
		p('5.2-t.0:1'),
		ar20,
		p('0.0-5.2:1'),
		ar00,
		p('c.1-0.0:0'),
		ar10,
		p('c.1-4.1:0'),
		`Z`,
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
				stroke={typeof theme.circle === 'string' ? theme.circle : theme.circle[c.ri]}
				stroke-width={theme.circleStrokeWidth}
				fill="none"
			/>
		{/each}
	</g>
	<g id="hexLines" filter="url(#shadow)">
		<polygon
			points={polygonPointString(polygon(6, hexRadius))}
			stroke={theme.hex}
			stroke-width={theme.hexStrokeWidth}
			fill="none"
		/>
		<path
			d={`M0 ${-hexRadius * 2}v${hexRadius}M0 ${hexRadius}v${hexRadius}`}
			stroke={theme.hex}
			stroke-width={theme.hexStrokeWidth}
		/>
	</g>

	<defs>
		<path id="p0" d={p0} fill={theme.g0} stroke="none" />
		<g id="g0">
			{#each angles as a}
				<use href="#p0" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p1" d={p1} fill={theme.g1} stroke="none" fill-rule="evenodd" />
		<g id="g1">
			{#each angles as a}
				<use href="#p1" transform={`rotate(${a})`} />
			{/each}
		</g>
		<path id="p2" d={p2} fill={theme.g2} stroke="none" />
		<g id="g2">
			{#each angles as a}
				<use href="#p2" transform={`rotate(${a})`} />
			{/each}
		</g>
		<filter id="shadow">
			<feGaussianBlur result="blur" in="SourceAlpha" stdDeviation={theme.hexStrokeWidth * 1} />
			<feOffset dx={0} dy={theme.hexStrokeWidth * 3} result="blackOffset" />
			<feColorMatrix
				values="1 0 0 0.0  0
								0 1 0 0.0  0
								0 0 1 0.0  0
								0 0 0 0.3  0"
			/>
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="shadow2">
			<feGaussianBlur in="SourceAlpha" stdDeviation={theme.hexStrokeWidth / 2} />
			<feOffset dx={0} dy={theme.hexStrokeWidth * 1} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
</pattern>
