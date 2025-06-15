<script>
  import { width, height, brightLines } from './setup'
	import { getDots } from './dots';
	import BgGradient from './BgGradient.svelte';
	const dots = getDots(brightLines);
</script>

<defs>
	<radialGradient id="dotGradient">
		<stop offset={0} stop-color='white' />
		<stop offset={1} stop-color='white' stop-opacity={0} />
	</radialGradient>
	<mask id='dotMask'>
		{#each dots as c}
			<circle cx={c.x} cy={c.y} r={c.r * 1.25} fill='url(#dotGradient)' />
		{/each}
	</mask>
	<BgGradient />
	<g id='dots'>
		<rect id='dotRect' mask='url(#dotMask)' x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#BgGradient)" />
		<g>
		{#each dots as c}
			<circle cx={c.x} cy={c.y} r={c.r * 0.33} fill='white' />
		{/each}
		</g>
	</g>
</defs>
<use href='#dots' />
