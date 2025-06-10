<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	let width = 1920;
	let height = 108;
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<circle r={height / 2} fill="white" />
</DrSvg>
