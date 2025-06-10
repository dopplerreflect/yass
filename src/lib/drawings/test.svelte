<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	export let name: string;
	let width = 100;
	let height = 100;
</script>

<DrSvg {...{ name, width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<circle r={width / 2} fill="red" />
	<text fill="white" alignment-baseline="middle" text-anchor="middle">testy</text>
</DrSvg>
