<script lang="ts">
	import { drawings } from '$lib/drawings.svelte';
</script>

<div class="flex flex-wrap gap-2">
	{#each drawings as drawing}
		<div
			class="flex items-center justify-center rounded-2xl border-2 border-violet-700 bg-violet-950 p-2 drop-shadow-lg drop-shadow-violet-700 hover:drop-shadow-violet-300"
		>
			<a href={`/drawing/${drawing.name}`}>
				<img class="rounded-2xl" src={`/drawings/webp/${drawing.name}.webp`} alt="drawing" />
				{drawing.name}
			</a>
		</div>
	{/each}
</div>
