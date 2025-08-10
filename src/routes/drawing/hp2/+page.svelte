<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const hue = 270;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern
			id="hp"
			hexRadius={90}
			circleStroke={chroma.oklch(0.75, 0.02, hue + 120).hex()}
			circleStrokeWidth={2}
			circleFill={chroma.oklch(0.25, 0.37, hue).hex()}
			circleFillOpacity={0.12}
			hexStroke={chroma.oklch(0.85, 0.37, hue).hex()}
			hexStrokeWidth={0}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
