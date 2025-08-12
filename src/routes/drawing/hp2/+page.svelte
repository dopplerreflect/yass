<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import type GoldenHexCirclePatternColors from '$lib/types';
	import themes from './themes';
	const width = 1920;
	const height = 1080;
	const colors: typeof GoldenHexCirclePatternColors = themes.B;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern
			id="hp"
			hexRadius={height / 12}
			circleStrokeWidth={1}
			hexStrokeWidth={2}
			{colors}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
