<svelte:options namespace="svg" />

<script lang="ts">
	import {
		anglesArray,
		phi,
		radialPoint,
		radialPointString,
		type Circle,
	} from '@dopplerreflect/geometry';

	type Props = {
		id: string;
		hexRadius: number;
		hexFill?: string;
		fillFilter?: string;
		circleStroke?: string;
		circleStrokeFilter?: string;
		hexStroke?: string;
		hexStrokeWidth?: number;
	};

	let {
		id,
		hexRadius,
		hexFill = 'none',
		fillFilter = '',
		circleStroke = 'none',
		circleStrokeFilter = '',
		hexStroke = '',
		hexStrokeWidth = 1,
	}: Props = $props();

	const width = $derived(hexRadius * Math.sqrt(3));
	const height = $derived(hexRadius * 3);
	const x = $derived(-width / 2);
	const y = $derived(-hexRadius * 1.5);

	const hexPoints = anglesArray(6, 30)
		.map((a) => radialPointString(a, hexRadius))
		.join(' ');

	const radii = [...Array(3).keys()].map((k) => hexRadius * Math.sqrt(3) * phi ** k).slice(0, 1);

	const angles = anglesArray(6, 0);

	const circles: Circle[] = $derived([
		...radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles
			.map((a) => radii.map((r) => ({ r, ...radialPoint(a, hexRadius * Math.sqrt(3)) })))
			.flat(),
		...[-hexRadius * 3, hexRadius * 3].map((y) => radii.map((r) => ({ r, x: 0, y }))).flat(),
	]);
</script>

<pattern
	{...{ id, width, height }}
	viewBox={[x, y, width, height].join(' ')}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${x} ${y})`}
>
	<defs>
		<path
			id={`${id}-hex`}
			d={`M0 ${y} 0 ${-hexRadius}ZM0 ${hexRadius} 0 ${hexRadius * 1.5}ZM${hexPoints}Z`}
			fill="none"
		/>
		<path id={`${id}-fill`} d={`M${hexPoints}Z`} fill={hexFill} filter={fillFilter} />
		<g id={`${id}-fillg`}>
			<use href={`#${id}-fill`} />
			{#each [60, 120, 240, 300].map((a) => radialPointString(a, hexRadius * Math.sqrt(3))) as t}
				<use href={`#${id}-fill`} transform={`translate(${t})`} />
			{/each}
		</g>
		<g id={`${id}-cg`}>
			{#each circles as c}
				<circle cx={c.x} cy={c.y} r={c.r} />
			{/each}
		</g>
	</defs>
	<use display="block" href={`#${id}-fillg`} />
	<use display="block" href={`#${id}-hex`} stroke={hexStroke} stroke-width={hexStrokeWidth} />
	<use
		display="block"
		href={`#${id}-cg`}
		stroke={circleStroke}
		fill="none"
		filter={circleStrokeFilter}
	/>
</pattern>
