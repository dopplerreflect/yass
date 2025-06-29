<svelte:options namespace="svg" />

<script lang="ts">
	import { browser } from '$app/environment';
	import type { SerializedSvg } from '$lib/types.d';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		width: number;
		height: number;
		children: Snippet;
	}
	const { width = 1920, height = 1080, children } = $props<Props>();
	let svgElement: SVGSVGElement;

	async function postSVG() {
		const pathname = document.location.pathname.split('/');
		const name = pathname[pathname.length - 1];
		const body = new XMLSerializer().serializeToString(svgElement);

		try {
			const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ name, body }),
				headers: { 'Content-Type': 'application/json' }
			});
			if (!response.ok) {
				console.error('Failed to save SVG:', await response.text());
			}
		} catch (error) {
			console.error('Error posting SVG:', error);
		}
	}

	const initialZoom = {
		level: 1,
		xOffset: 0,
		yOffset: 0
	};

	let zoom = $state(
		browser && sessionStorage.getItem('zoom')
			? JSON.parse(sessionStorage.getItem('zoom')!)
			: initialZoom
	);

	$effect(() => {
		if (browser) {
			sessionStorage.setItem('zoom', JSON.stringify(zoom));
		}
	});

	function handleKey(event: KeyboardEvent) {
		event.preventDefault();
		const { key } = event;
		switch (true) {
			case /r/.test(key):
				zoom = { level: 1, xOffset: 0, yOffset: 0 };
				break;
			case /\+/.test(key):
				if (zoom.level >= 0.2) zoom.level -= 0.1;
				break;
			case /-/.test(key):
				if (zoom.level <= 0.9) zoom.level += 0.1;
				break;
			case /[\d]/.test(key):
				zoom.level = 1 - key / 10;
				break;
			case /h/.test(key):
				zoom.xOffset -= 0.1;
				break;
			case /l/.test(key):
				zoom.xOffset += 0.1;
				break;
			case /j/.test(key):
				zoom.yOffset += 0.1;
				break;
			case /k/.test(key):
				zoom.yOffset -= 0.1;
				break;
			case /c/.test(key):
				zoom.xOffset = 0;
				zoom.yOffset = 0;
				break;
		}
	}
	onMount(() => {
		postSVG();
		document.addEventListener('keypress', handleKey);
		return () => document.removeEventListener('keypress', handleKey);
	});
</script>

<svg
	bind:this={svgElement}
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${(-width / 2) * zoom.level + (width / 2) * zoom.xOffset} ${(-height / 2) * zoom.level + (height / 2) * zoom.yOffset} ${width * zoom.level} ${height * zoom.level}`}
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
