<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import themes from './themes';
	const width = 1920;
	const height = 1080;
	const theme = themes.e;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern id="hp" hexRadius={height / 18} {theme} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
