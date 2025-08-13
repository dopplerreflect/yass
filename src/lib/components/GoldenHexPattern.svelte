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
	const [r0, r1, r2, r4] = radii;
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
</script>

<pattern
	{id}
	width={hexWidth}
	height={hexRadius * 3}
	viewBox={`${-hexWidth / 2} ${-hexRadius * 1.5} ${hexWidth} ${hexRadius * 3}`}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${-hexWidth / 2} ${-hexRadius * 1.5})`}
>
	<g id="strokedCircles" filter="url(#)">
		{#each circles as c}
			<polygon
				points={polygonPointString(polygon(6, c.r, { center: { x: c.x, y: c.y }, rotate: 15 }))}
				stroke-width={3}
				stroke={typeof theme.circle === 'string' ? theme.circle : theme.circle[c.ri]}
				fill="none"
			/>
		{/each}
	</g>

	<defs> </defs>
</pattern>
