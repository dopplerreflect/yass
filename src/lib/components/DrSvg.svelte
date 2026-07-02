<svelte:options namespace="svg" />

<script lang="ts">
	import { createZoomState } from '$lib/zoom.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { drawings } from '$lib/drawings.svelte';
	import { goto } from '$app/navigation';
	import type { Drawing } from '$lib/types';

	interface Props {
		width: number;
		height: number;
		children: Snippet;
	}
	let { width = 1920, height = 1080, children }: Props = $props();
	const { zoom, zoomIn, zoomOut, center, pan, reset, setZoomLevel } = createZoomState();

	let svgElement: SVGSVGElement;

	async function postSVG() {
		const pathname = document.location.pathname.split('/');
		const name = pathname[pathname.length - 1];
		const body = new XMLSerializer().serializeToString(svgElement);
		console.log(`Attempting to POST svg ${name} to /api`);
		try {
			const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ name, body }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (!response.ok) {
				console.error('Failed to save SVG:', await response.text());
			}
		} catch (error) {
			console.error('Error posting SVG:', error);
		}
	}

	function navigateToDrawing(direction: number) {
		const pathname = document.location.pathname.split('/');
		const name = pathname[pathname.length - 1];
		const thisIndex = drawings.findIndex((d) => d.name === name);
		let targetDrawing: Drawing;
		if (thisIndex === 0 && direction === -1) targetDrawing = drawings[drawings.length - 1];
		else if (thisIndex === drawings.length - 1 && direction === 1) targetDrawing = drawings[0];
		else targetDrawing = drawings[thisIndex + direction];
		goto(`/drawing/${targetDrawing.name}`).catch((error) => console.error(error));
	}

	const keyMap: Record<string, () => void> = {
		'+': zoomIn,
		'-': zoomOut,
		c: center,
		r: reset,
		p: () => navigateToDrawing(-1),
		n: () => navigateToDrawing(1),
		h: () => pan(-0.1, 0),
		l: () => pan(0.1, 0),
		j: () => pan(0, 0.1),
		k: () => pan(0, -0.1),
		b: () => goto('/'),
	};

	function handleKey(event: KeyboardEvent) {
		const { key } = event;
		if (keyMap[key]) {
			event.preventDefault();
			keyMap[key]();
		}
		if (/[\d]/.test(key)) {
			setZoomLevel(Number(key));
		}
	}

	onMount(() => {
		postSVG();
		document.addEventListener('keypress', handleKey);
		return () => document.removeEventListener('keypress', handleKey);
	});

	const viewBox = $derived.by(() => {
		const zoomedWidth = width * zoom.level;
		const zoomedHeight = height * zoom.level;
		const x = -(width / 2) * zoom.level + (width / 2) * zoom.xOffset;
		const y = -(height / 2) * zoom.level + (height / 2) * zoom.yOffset;
		return `${x} ${y} ${zoomedWidth} ${zoomedHeight}`;
	});

	const thumbnailRatio = $derived(512 / width);
</script>

<svg
	data-thumbnail-width={width * thumbnailRatio}
	data-thumbnail-height={height * thumbnailRatio}
	bind:this={svgElement}
	xmlns="http://www.w3.org/2000/svg"
	color-interpolation-filters="sRGB"
	{viewBox}
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
