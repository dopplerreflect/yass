<script lang="ts">
	export let width = 192;
	export let height = 1080;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
	{...{ width, height }}
>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="blue" />
	<circle r={40} fill="black" />
	<text font-size="20" alignment-baseline="middle" fill="white" text-anchor="middle">SVG</text>
</svg>

<style>
	svg {
		max-width: 100vw;
		max-height: 100vh;
	}
</style>
