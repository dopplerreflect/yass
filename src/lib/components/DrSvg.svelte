<svelte:options namespace="svg" />

<script lang="ts">
	import { createZoomState } from '$lib/zoom.svelte';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		width: number;
		height: number;
		children: Snippet;
	}
	const { width = 1920, height = 1080, children } = $props<Props>();
	const { zoom, zoomIn, zoomOut, center, pan, reset, setZoomLevel } = createZoomState();

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

	const keyMap: Record<string, () => void> = {
		'+': zoomIn,
		'-': zoomOut,
		c: center,
		r: reset,
		h: () => pan(-0.1, 0),
		l: () => pan(0.1, 0),
		j: () => pan(0, 0.1),
		k: () => pan(0, -0.1)
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
