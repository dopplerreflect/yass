<script lang="ts">
	//@ts-ignore
	import { oklch } from 'chroma-js';
	import DrSvg from '$lib/components/DrSvg.svelte';
	import Dots from './Dots.svelte'
	import Circles from './Circles.svelte';
	import { width, height, dimLines, brightLines } from './setup';
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<Circles />
	<g id='dimLines'>
		{#each dimLines as l}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke={oklch(0.1, 0.37, 300).hex()} stroke-width={1} />
		{/each}
	</g>
	<g id='brightLines'>
		{#each brightLines as l}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke='white' stroke-width={1} />
		{/each}
	</g>
	<Dots />
</DrSvg>
