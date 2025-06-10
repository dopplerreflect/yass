<svelte:options namespace="svg" />

<script lang="ts">
	interface Props {
		width: number;
		height: number;
		children: any;
	}
	const { width = 1920, height = 1080, children }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
	color-interpolation-filters="sRGB"
	{...{ width, height }}
>
	<mask id="drsvg-clipped">
		<path d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`} fill="white" />
	</mask>
	<g id="all" mask="url(#drsvg-clipped)">
		{@render children()}
	</g>
</svg>
