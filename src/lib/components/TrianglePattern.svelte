<svelte:options namespace="svg" />

<script lang="ts">
	import { SQRT3 } from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';

	type HexPatternProps = {
		id: string;
		size: number;
		hue?: number;
	};
	type Props = HexPatternProps;
	const { id, size, hue = 210 }: Props = $props();

	const width = size * Math.sqrt(3);
	const height = size * 3;

	const ws3 = width / SQRT3;
	const w2 = width / 2;
	const h2 = height / 2;
</script>

<pattern
	{id}
	viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
	{width}
	{height}
	patternUnits="userSpaceOnUse"
>
	<g stroke={chroma.oklch(0.9, 0.37, hue).hex()} fill-opacity={0.9}>
		<g id="tri">
			<path
				d={`M${-w2} ${-h2}L${w2} ${-h2}L0 ${-ws3}Z`}
				fill={chroma.oklch(0.6, 0.37, hue).hex()}
			/>
			<path d={`M${-w2} ${-h2}L0 ${-ws3}L0 0Z`} fill={chroma.oklch(0.3, 0.37, hue).hex()} />
			<path d={`M${w2} ${-h2}L0 0L0 ${-ws3}Z`} fill={chroma.oklch(0.45, 0.37, hue).hex()} />
		</g>
		<use href="#tri" transform="rotate(-60)" />
		<use href="#tri" transform={`translate(${width} 0) rotate(-60)`} />
		<use href="#tri" transform={`translate(${w2} ${h2}) rotate(-60)`} />
		<use href="#tri" transform={`translate(${w2} ${h2})`} />
		<use href="#tri" transform={`translate(${-w2} ${h2})`} />
	</g>
</pattern>
