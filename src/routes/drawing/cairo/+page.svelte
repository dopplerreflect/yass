<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import CairoPattern from './CairoPattern.svelte';
	const width = 1920;
	const height = 1080;
</script>

<DrSvg {...{ width, height }}>
	<CairoPattern unit={75} hue={90} lightness={1} rotate={15} />
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill="black"
	/>
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill="url(#CairoPattern)"
		filter="url(#light)"
	/>
</DrSvg>
