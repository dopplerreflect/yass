<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexPattern from '$lib/components/GoldenHexPattern.svelte';
	import themes from './themes';
	const width = 1920;
	const height = 1080;
	const theme = themes.B;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexPattern id="hp" hexRadius={height / 6} {theme} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
