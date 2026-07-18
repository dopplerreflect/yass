<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import SnubSquareTilingPattern from './SnubSquareTilingPattern.svelte';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;

	const width = 1920;
	const height = 1080;
	const colors = [
		oklch(0.75, 0.0925, 210).hex(),
		oklch(0.25, 0.0925, 210).hex(),
		oklch(0.5, 0.0925, 210).hex(),
	] as [string, string, string];
	const unit = 20;
</script>

<DrSvg {...{ width, height }}>
	<SnubSquareTilingPattern {...{ unit, colors }} erode={unit / 30} rotate={15} />
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill={oklch(0.1, 0.037, 300).hex()}
	/>
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill="url(#SnubSquareTilingPattern)"
		filter="url(#light)"
	/>
</DrSvg>
