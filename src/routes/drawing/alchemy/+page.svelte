<script lang="ts">
	//@ts-ignore
	import { oklch } from 'chroma-js';
	import DrSvg from '$lib/components/DrSvg.svelte';
	import Dots from './Dots.svelte';
	import Circles from './Circles.svelte';
	import { width, height, dimLines, brightLines, radii } from './setup';
	import BgGradient from './BgGradient.svelte';
	import StarfieldFilter from './StarfieldFilter.svelte';
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<BgGradient />
		<StarfieldFilter />
		<filter id="bigMaskFilter">
			<feGaussianBlur stdDeviation={radii[3]} />
		</filter>
		<mask id="bigMask">
			<circle r={radii[0] * Math.sqrt(3)} fill="white" filter="url(#bigMaskFilter)" />
		</mask>
	</defs>
	<rect filter="url(#realisticStarfield)" x={-width / 2} y={-height / 2} {...{ width, height }} />
	<g mask="url(#bigMask)">
		<Circles />
		<g id="dimLines">
			{#each dimLines as l}
				<line
					x1={l[0].x}
					y1={l[0].y}
					x2={l[1].x}
					y2={l[1].y}
					stroke={oklch(0.1, 0.37, 300).hex()}
					stroke-width={2}
				/>
			{/each}
		</g>
		<g id="brightLines">
			{#each brightLines as l}
				<line
					x1={l[0].x}
					y1={l[0].y}
					x2={l[1].x}
					y2={l[1].y}
					stroke={oklch(0.5, 0.37, 300).hex()}
					stroke-width={2}
				/>
			{/each}
		</g>
		<Dots />
	</g>
</DrSvg>
