<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, radialPoint, type Circle } from '@dopplerreflect/geometry';
	import Chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const size = height / 2;
	const r = size / 2;
	const angles = anglesArray(6);
	const circles: Circle[] = angles.map((a) => ({ r, ...radialPoint(a, r) }));

	let stroke: string | null = '';
	function handleMouse(event: MouseEvent) {
		const target = event.target as SVGElement | null;
		if (target) {
			if (event.type === 'mouseover') {
				console.log(target.id);
				stroke = target.getAttribute('stroke');
				target.setAttribute('stroke', 'red');
			} else {
				stroke && target.setAttribute('stroke', stroke);
			}
		}
	}
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />

	{#each circles as c, i}
		<!-- svelte-ignore a11y_no_static_element_interactions, a11y_mouse_events_have_key_events-->
		<circle
			{r}
			cx={c.x}
			cy={c.y}
			id={`circle-${i}`}
			stroke={Chroma.oklch(0.75, 0.37, (360 / 6) * i).hex()}
			stroke-width="5"
			fill="none"
			onmouseover={handleMouse}
			onmouseout={handleMouse}
		/>
	{/each}
</DrSvg>
