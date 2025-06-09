<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const Component = data.module.default;
</script>

<div class="flex items-center justify-center">
	<Component />
</div>
