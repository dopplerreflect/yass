<script lang="ts">
	import { drawings } from '$lib/drawings.svelte';
</script>

<div class="flex m-2 gap-2 drop-shadow-md drop-shadow-violet-500">
	{#each drawings as drawing}
		<div class="bg-violet-950 flex p-2 items-center justify-center border-violet-700 border-2 rounded-2xl">
			<a href={`/drawing/${drawing.name}`}
				><img class="rounded-2xl" src={`/drawings/webp/${drawing.name}.webp`} alt="drawing" />{drawing.name}</a
			>
		</div>
	{/each}
</div>
