<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	const width = 1920;
	const height = 1080;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern id="hp" hexRadius={100} circleStrokeWidth={1} hexStrokeWidth={2} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#hp)" />
</DrSvg>
