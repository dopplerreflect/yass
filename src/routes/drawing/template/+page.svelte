<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	const width = 1920;
	const height = 1080;
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<text dominant-baseline="middle" text-anchor="middle" font-size="16em" fill="white">Template</text>
</DrSvg>
