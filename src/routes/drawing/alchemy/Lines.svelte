<script>
	//@ts-ignore
	import { oklch } from 'chroma-js';
	import { brightLines, dimLines } from './lines';
	import { scale } from './setup';
</script>

<g id="dimLines">
	{#each dimLines as l}
		<line
			x1={l[0].x}
			y1={l[0].y}
			x2={l[1].x}
			y2={l[1].y}
			stroke={oklch(0.1, 0.37, 300).hex()}
			stroke-width={2 * scale}
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
			stroke-width={2 * scale}
		/>
	{/each}
</g>
