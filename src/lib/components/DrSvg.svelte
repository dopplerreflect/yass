<svelte:options namespace="svg" />

<script lang="ts">
	import type { SerializedSvg } from '$lib/types.d';
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
	}

	const zoom = $state({
		level: 1,
		xOffset: 0,
		yOffset: 0
	});

	function increment() {
		if (zoom.level >= 0.2) zoom.level -= 0.1;
	}

	function decrement() {
		if (zoom.level <= 0.9) zoom.level += 0.1;
	}

	function reset() {
		zoom.level = 1;
	}

	function handleKey(event: KeyboardEvent) {
		event.preventDefault();
		switch (event.key) {
			case '+':
				increment();
				break;
			case '-':
				decrement();
				break;
			case 'r':
				reset();
				break;
		}
	}
	onMount(() => {
		const pathname = document.location.pathname.split(/\//);
		const name = pathname[pathname.length - 1];
		const body = new XMLSerializer().serializeToString(svg);
		postSVG({ name, body });
		document.addEventListener('keypress', handleKey);
		return () => document.removeEventListener('keypress', handleKey);
	});
</script>

<svg
	bind:this={svg}
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${(-width / 2) * zoom.level} ${(-height / 2) * zoom.level} ${width * zoom.level} ${height * zoom.level}`}
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
