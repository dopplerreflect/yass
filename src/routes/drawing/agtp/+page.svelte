<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	const width = 1080;
	const height = 1080;
	import TrianglePattern from '$lib/components/AlphaGradientTrianglePattern.svelte';
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<TrianglePattern id="tp" size={90} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#tp)" />
</DrSvg>
