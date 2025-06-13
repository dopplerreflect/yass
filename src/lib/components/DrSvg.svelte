<svelte:options namespace="svg"/>
<script lang="ts">
	import type { SerializedSvg } from '$lib/types.d'
	import { onMount } from 'svelte';

	interface Props {
		width: number;
		height: number;
		children: any;
	}
	const { width = 1920, height = 1080, children }: Props = $props();
	let svg: SVGSVGElement;

	async function postSVG({ name, body }: SerializedSvg) {
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name, body }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const responseObj = await response.json();
		// console.log(responseObj)
	}
	onMount(() => {
		const pathname = document.location.pathname.split(/\//)
		const name = pathname[pathname.length-1]
		const body = new XMLSerializer().serializeToString(svg);
		postSVG({ name, body });
	});
</script>

<svg
	bind:this={svg}
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
	color-interpolation-filters="sRGB"
>
	<mask id="drsvg-clipped">
		<path d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`} fill="white" />
	</mask>
	<g id="all" mask="url(#drsvg-clipped)">
		{@render children()}
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
