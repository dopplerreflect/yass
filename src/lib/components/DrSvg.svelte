<svelte:options namespace="svg" />

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		name: string;
		width: number;
		height: number;
		children: any;
	}
	const { name, width = 1920, height = 1080, children }: Props = $props();
	let svg: SVGSVGElement;

	function extractSVG(svg: SVGSVGElement): string {
		const svgText = new XMLSerializer().serializeToString(svg);
		return svgText;
	}

	async function postSVG({ name, svgText }: { name: string; svgText: string }): Promise<void> {
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name, svgText }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log(response.json());
	}
	onMount(() => {
		const svgText = extractSVG(svg);
		// console.log({ name, svgText });
		postSVG({ name, svgText });
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
