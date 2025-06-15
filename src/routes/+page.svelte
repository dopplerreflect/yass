<script lang="ts">
	import { drawings } from '$lib/drawings.svelte';
</script>

<div class="flex gap-2 flex-wrap">
	{#each drawings as drawing}
		<div class="bg-violet-950 flex p-2 items-center justify-center border-violet-700 border-2 rounded-2xl drop-shadow-lg hover:drop-shadow-violet-300 drop-shadow-violet-700">
			<a href={`/drawing/${drawing.name}`}>
				<img class="rounded-2xl" src={`/drawings/webp/${drawing.name}.webp`} alt="drawing" />
				{drawing.name}
			</a>
		</div>
	{/each}
</div>
