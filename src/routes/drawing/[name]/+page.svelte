<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data);
</script>

<div class="flex items-center justify-center">
	<svelte:component this={data.module.default} />
</div>
