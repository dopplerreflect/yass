<svelte:options namespace="svg" />

<script lang="ts">
	import { anglesArray, radialPointString } from '@dopplerreflect/geometry';

	type Props = {
		id: string;
		hexRadius: number;
		hexFill?: string;
		fillFilter?: string;
		hexStroke?: string;
		hexStrokeWidth?: number;
	};

	let {
		id,
		hexRadius,
		hexFill = 'none',
		fillFilter = '',
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
		<path id={`${id}-fill`} d={`M${hexPoints}Z`} />
		<mask id={`${id}-fillMask`}>
			<use href={`#${id}-fill`} fill="white" />
		</mask>
		<g id={`${id}-fillg`}>
			<use href={`#${id}-fill`} fill={hexFill} filter={fillFilter} mask={`url(#${id}-fillMask)`} />
			{#each [60, 120, 240, 300].map((a) => radialPointString(a, hexRadius * Math.sqrt(3))) as t}
				<use
					href={`#${id}-fill`}
					transform={`translate(${t})`}
					fill={hexFill}
					filter={fillFilter}
					mask={`url(#${id}-fillMask)`}
				/>
			{/each}
		</g>
	</defs>
	<use display="block" href={`#${id}-fillg`} />
	<use display="block" href={`#${id}-hex`} stroke={hexStroke} stroke-width={hexStrokeWidth} />
</pattern>
