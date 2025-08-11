<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern
			id="hp"
			hexRadius={100}
			circleStroke={chroma.oklch(1, 0.37, 150).hex()}
			circleStrokeWidth={2}
			circleFill={chroma.oklch(0.25, 0.37, 270).hex()}
			circleFillOpacity={0.12}
			hexStroke={chroma.oklch(1, 0.37, 75).hex()}
			hexStrokeWidth={3}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
