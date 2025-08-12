<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const colors = {
		circle: chroma.oklch(1, 0.05, 210).hex(),
		hex: chroma.oklch(1, 0.1, 90).hex(),
		g0: chroma.oklch(1, 0.05, 90).hex(),
		g1: chroma.oklch(0.85, 0.1, 210).hex(),
		g2: chroma.oklch(0.85, 0.2, 90).hex(),
	};
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern
			id="hp"
			hexRadius={96}
			circleStrokeWidth={1}
			hexStrokeWidth={2}
			{colors}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
