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
	const { id, size, hue }: Props = $props();

	const width = $derived(size * Math.sqrt(3));
	const height = $derived(size * 3);

	const ws3 = $derived(width / SQRT3);
	const w2 = $derived(width / 2);
	const h2 = $derived(height / 2);
</script>

<pattern {id} viewBox={`0 0 ${width} ${height}`} {width} {height} patternUnits="userSpaceOnUse">
	<defs>
		<linearGradient id="tp2-lg-0" gradientTransform="rotate(90)">
			<stop offset={0} stop-color="#ffffff00" />
			<stop offset={1} stop-color="#ffffffff" />
		</linearGradient>
		<linearGradient
			id="tp2-lg-1"
			gradientUnits="objectBoundingBox"
			x1="50%"
			y1="50%"
			x2="75%"
			y2="10%"
		>
			<stop offset={0} stop-color="#00000000" />
			<stop offset={1} stop-color="#ff0000ff" />
		</linearGradient>
	</defs>
	<g stroke={hue ? chroma.oklch(0.9, 0.37, hue).hex() : 'none'} fill-opacity={1}>
		<g id="tri">
			<path id="stry" d={`M0 0 H${width}L${w2} ${ws3 / 2}Z`} fill="url(#tp2-lg-0)" />
			<use href="#stry" transform={`translate(${width}) rotate(120)`} />
			<use href="#stry" transform={`translate(${w2} ${h2}) rotate(240)`} />
		</g>
		<use display="block" href="#tri" transform="rotate(60)" />
		<use display="block" href="#tri" transform={`translate(${width}) rotate(60)`} />
		<use display="block" href="#tri" transform={`translate(${w2} ${h2})`} />
		<use display="block" href="#tri" transform={`translate(${-w2} ${h2})`} />
		<use display="block" href="#tri" transform={`translate(${w2} ${h2}) rotate(60)`} />
	</g>
</pattern>
