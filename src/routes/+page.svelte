<script lang="ts">
	import { drawings } from '$lib/drawings.svelte';
</script>

<div class="flex items-center justify-center">
	<ul>
		{#each drawings as drawing}
			<li><a href={`/drawing/${drawing.name}`}>{drawing.name}</a></li>
		{/each}
	</ul>
</div>
