<script lang="ts">
	import { drawings } from '$lib/drawings.svelte';
</script>

<div class="flex items-center justify-center">
	<ul>
		{#each drawings as drawing}
			<li>
				<a href={`/drawing/${drawing.name}`}
					><img src={`/drawings/webp/${drawing.name}.webp`} alt="drawing" />{drawing.name}</a
				>
			</li>
		{/each}
	</ul>
</div>
