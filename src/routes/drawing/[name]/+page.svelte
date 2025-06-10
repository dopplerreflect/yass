<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const Component = data.module.default;

	let mouseIsNearTop = $state(false);
	let header: HTMLElement;
	function handleMouseMove(event: MouseEvent) {
		mouseIsNearTop = event.clientY < 40;
	}
	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => document.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<header
	bind:this={header}
	class={`absolute top-0 left-0 ${mouseIsNearTop ? '' : 'hidden'} h-10 w-full border-b-2 border-amber-500`}
>
	<h1>TEST</h1>
</header>
<div class="flex h-full items-center justify-center">
	<Component name={data.name} />
</div>
