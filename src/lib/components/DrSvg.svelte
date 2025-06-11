<svelte:options namespace="svg" />

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		name: string;
		width: number;
		height: number;
		children: any;
	}
	export type SerializedSvg = {
		name: string;
		body: string;
	};
	const { name, width = 1920, height = 1080, children }: Props = $props();
	let svg: SVGSVGElement;

	async function postSVG({ name, body }: SerializedSvg) {
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name, body }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log(response.json());
	}
	onMount(() => {
		const body = new XMLSerializer().serializeToString(svg);
		postSVG({ name, body });
	});
</script>

<svg
	bind:this={svg}
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
	color-interpolation-filters="sRGB"
	{...{ width, height }}
>
	<mask id="drsvg-clipped">
		<path d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`} fill="white" />
	</mask>
	<g id="all" mask="url(#drsvg-clipped)">
		{@render children()}
	</g>
</svg>
