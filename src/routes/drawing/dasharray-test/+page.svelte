<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const r = (height / 2) * 0.45;
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="oklch(0% 0% 300)" />
	<g transform="rotate(0)">
		<circle
			r={r * 1.618033}
			fill="black"
			stroke="white"
			stroke-dasharray={`0 ${(2 * Math.PI * (r * 1.618033)) / 12}`}
			stroke-linecap="round"
			stroke-width={21}
		/>
		<circle
			r={r * 0.875}
			fill="none"
			stroke={chroma.oklch(1, 0.37, 90).hex()}
			stroke-dasharray={(2 * Math.PI * (r * 0.875)) / 120}
			stroke-dashoffset={(2 * Math.PI * (r * 0.875)) / 240}
			stroke-width={r / 4}
		/>
		<circle
			r={r * 0.75}
			fill="none"
			stroke={chroma.oklch(1, 0.37, 90).hex()}
			stroke-dasharray={`0 ${(2 * Math.PI * (r * 0.75)) / 60}`}
			stroke-linecap="round"
			stroke-width={9.5}
		/>
		<circle
			r={r * 0.618033}
			fill="none"
			stroke="white"
			stroke-dasharray={`0 ${(2 * Math.PI * (r * 0.618033)) / 60}`}
			stroke-linecap="round"
			stroke-width={8}
		/>
		<circle
			{r}
			stroke="white"
			stroke-width={12.6}
			fill="none"
			stroke-dasharray={`0 ${(2 * Math.PI * r) / 60}`}
			stroke-linecap="round"
		/>
		<circle
			{r}
			stroke="black"
			stroke-width={8}
			fill="none"
			stroke-dasharray={`0 ${(2 * Math.PI * r) / 60}`}
			stroke-linecap="round"
		/>
	</g>
</DrSvg>
