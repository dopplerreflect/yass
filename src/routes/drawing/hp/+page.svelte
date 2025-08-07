<script lang="ts">
	import chroma from 'chroma-js';
	import DrSvg from '$lib/components/DrSvg.svelte';
	const width = 1920;
	const height = 1080;
	import TrianglePattern from '$lib/components/TrianglePattern.svelte';
	import HexPattern from '$lib/components/HexPattern.svelte';
	import { SQRT3 } from '@dopplerreflect/geometry';
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<TrianglePattern id="tp" size={30} hue={270} />
		<HexPattern
			id="hp"
			size={30 * SQRT3}
			strokeWidth={2}
			stroke={chroma.oklch(1, 0.37, 90).hex()}
		/>
		<filter id="glow">
			<feGaussianBlur stdDeviation={3} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#tp)" filter="url(#glow)" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" filter="url(#glow)" />
</DrSvg>
