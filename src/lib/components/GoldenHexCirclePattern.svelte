<svelte:options namespace="svg" />

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
		scale?: number;
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

	const { id, theme = defaultTheme, hexRadius = 50, scale = 1 }: Props = $props();
	const hexWidth = $derived(hexRadius * Math.sqrt(3));

	const angles = anglesArray(6, 0);
	const radii = [...Array(4).keys()].map((k) => hexWidth * phi ** k);
	const [r0, r1, r2] = radii;
	const circles: AnnotatedCircle[] = $derived(
		[
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
		].flat(),
	);

	const c = $derived(mapCircleIntersections(circles, 'y-asc'));

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
		`ZM${p('c.0-4.2:0')}`,
		ar21,
		p('4.2-t.0:1'),
		ar01,
		p('c.0-t.0:0'),
		ar01,
		p(`c.0-4.2:0`),
		`ZM${p('c.0-4.1:0')}`,
		ar11,
		p('4.1-t.0:1'),
		ar01,
		p('5.1-t.0:1'),
		ar11,
		p('c.0-5.1:0'),
		ar11,
		p('c.0-4.1:0'),
		`ZM${p('c.0-t.0:1')}`,
		ar01,
		p('5.2-t.0:1'),
		ar21,
		p('c.0-5.2:0'),
		ar01,
		p('c.0-t.0:1'),
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

<defs>
	<pattern
		{id}
		width={hexWidth}
		height={hexRadius * 3}
		viewBox={`${Math.round(-hexWidth / 2)} ${Math.round(-hexRadius * 1.5)} ${Math.round(hexWidth)} ${Math.round(hexRadius * 3)}`}
		patternUnits="userSpaceOnUse"
		patternTransform={`translate(${-hexWidth / 2} ${-hexRadius * 1.5})`}
	>
		<g id={`${id}-paths`}>
			<use href={`#${id}-g0`} />
			<use href={`#${id}-g1`} />
			<use href={`#${id}-g2`} />
		</g>
		<defs>
			<filter id={`${id}-bumpmap`} x="-20%" y="-20%" width="140%" height="140%">
				<feMorphology in="SourceGraphic" operator="erode" radius={1 * scale} />
				<feGaussianBlur stdDeviation={3 * scale} result="blur" />
			</filter>
			<path id={`${id}-p0`} d={p0} />
			<mask id={`${id}-mask0`}>
				<use href={`#${id}-p0`} fill="white" />
			</mask>
			<g id={`${id}-g0`}>
				{#each angles as a}
					<use
						href={`#${id}-p0`}
						fill={theme.g0}
						filter={`url(#${id}-bumpmap)`}
						mask={`url(#${id}-mask0)`}
						transform={`rotate(${a})`}
					/>
				{/each}
			</g>
			<path id={`${id}-p1`} d={p1} fill-rule="evenodd" />
			<mask id={`${id}-maskp1`}>
				<use href={`#${id}-p1`} fill="white" />
			</mask>
			<g id={`${id}-g1`}>
				{#each angles as a}
					<use
						href={`#${id}-p1`}
						fill={theme.g1}
						filter={`url(#${id}-bumpmap)`}
						mask={`url(#${id}-maskp1)`}
						transform={`rotate(${a})`}
					/>
				{/each}
			</g>
			<path id={`${id}-p2`} d={p2} />
			<mask id={`${id}-maskp2`}>
				<use href={`#${id}-p2`} fill="white" />
			</mask>
			<g id={`${id}-g2`}>
				{#each angles as a}
					<use
						href={`#${id}-p2`}
						fill={theme.g2}
						filter={`url(#${id}-bumpmap)`}
						mask={`url(#${id}-maskp2)`}
						transform={`rotate(${a})`}
					/>
				{/each}
			</g>
			<g display="none" id="strokedCircles">
				{#each circles as c}
					<circle
						r={c.r}
						cx={c.x}
						cy={c.y}
						stroke={typeof theme.circle === 'string' ? theme.circle : theme.circle[c.ri]}
						stroke-width={theme.circleStrokeWidth * scale}
						fill="none"
					/>
				{/each}
			</g>
			<g display="none" id="hexLines">
				<polygon
					points={polygonPointString(polygon(6, hexRadius))}
					stroke={theme.hex}
					stroke-width={theme.hexStrokeWidth * scale}
					fill="none"
				/>
				<path
					d={`M0 ${-hexRadius * 2}v${hexRadius}M0 ${hexRadius}v${hexRadius}`}
					stroke={theme.hex}
					stroke-width={theme.hexStrokeWidth * scale}
				/>
			</g>
			<g id={`${id}-guide`}>
				<rect
					x={-hexWidth / 2}
					y={-hexRadius * 1.5}
					width={hexWidth}
					height={hexRadius * 3}
					stroke="yellow"
					fill="none"
				/>
				{#each c as [s, p], i}
					<circle cx={p.x} cy={p.y} r={1 * scale} fill="blue" />
					<text x={p.x} y={p.y} fill="orange" font-size={`${0.15 * scale}em`} font-weight="bold"
						>{s}</text
					>
				{/each}
			</g>
		</defs>
	</pattern>
</defs>
