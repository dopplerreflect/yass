<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import TrianglePattern from '$lib/components/TrianglePattern.svelte';
	import { anglesArray, phi, radialPointString } from '@dopplerreflect/geometry';
	import Chroma from 'chroma-js';
	let dpi = 300;
	let width = 6 * dpi;
	let height = 9 * dpi;
	let margin = 0.5 * dpi;
	const r = (height * phi) / 2;
	const r2 = r * phi;
	const r3 = r2 + (r - r2) / 2;
	const r4 = r2 + (r - r2) / 3;
	const r5 = r2 + ((r - r2) / 3) * 2;
	const angles = anglesArray(30);
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<TrianglePattern id="tp" hue={300} size={dpi / 2} />
		<path
			id="arrow"
			d={`M${radialPointString(angles[2], r)}L${radialPointString(angles[0], r3)}L${radialPointString(angles[2], r2)}L${radialPointString(angles[2], r4)}A${r4} ${r4} 0 0 1 ${radialPointString(angles[6], r2)}L${radialPointString(angles[5], r3)}L${radialPointString(angles[6], r)}A${r5} ${r5} 0 0 0 ${radialPointString(angles[2], r5)}`}
			fill="white"
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#tp)" />
	<rect
		x={-width / 2 + margin}
		y={-height / 2 + margin}
		width={width - margin * 2}
		height={height - margin * 2}
		stroke="white"
		stroke-width={dpi / 32}
		fill={Chroma.oklch(0, 0.17, 300, 0.85).hex()}
	/>
	<g stroke="white" fill="none">
		<circle {r} />
		<circle r={r2} />
		<circle r={r3} />
		<circle r={r4} />
		<circle r={r5} />
		{#each angles as a, i}
			<path d={`M0 0L${radialPointString(a, r)}`} stroke="white" />
		{/each}
		{#each [0, 72, 144, 216, 288] as a}
			<use href="#arrow" transform={`rotate(${a})`} />
		{/each}
	</g>
</DrSvg>
