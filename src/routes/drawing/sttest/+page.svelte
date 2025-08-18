<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import TrianglePattern from '$lib/components/TrianglePattern.svelte';
	import { anglesArray, phi, radialPointString } from '@dopplerreflect/geometry';
	import Chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const angles = anglesArray(10);
	const angles2 = anglesArray(30);
	const r = height / 2;
	const radii = [...Array(6).keys()].map((k) => r * phi ** k);
	const stars = radii.map(
		(r) =>
			`M${[...angles.map((a, i) => radialPointString(a, i % 2 === 0 ? r : r * phi ** 2))].join('L')}Z`,
	);
	const points = [
		radialPointString(angles2[0], radii[0]),
		radialPointString(angles2[1], radii[1]),
		radialPointString(angles2[28], radii[3]),
		radialPointString(angles2[25], radii[1]),
		radialPointString(angles2[27], radii[2]),
		radialPointString(angles2[0], radii[0]),
	].join(' ');
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="shadow">
			<feGaussianBlur in="SourceAlpha" stdDeviation={5} />
			<feOffset dy={6} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<mask id="mask0">
			<path
				d={`M${radialPointString(angles2[25], radii[1])}L${radialPointString(angles[0], radii[3])}L${radialPointString(angles[4], radii[5])}L0 0Z`}
				fill="white"
			/>
		</mask>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	{#each [...Array(5).keys()].map((k) => k) as a}
		<g filter="url(#shadow)">
			{#each [...Array(6).keys()].map((k) => k) as i}
				<polygon
					{points}
					fill={Chroma.oklch(0.75 - (0.75 / 6) * (i - 1), 0.37 - (0.37 / 6) * i, 72 * a + 18).hex()}
					transform={`scale(${phi ** i}) rotate(${72 * a + 12 * i})`}
				/>
			{/each}
		</g>
	{/each}
	<g filter="url(#shadow)" mask="url(#mask0)">
		{#each [...Array(6).keys()].map((k) => k) as i}
			<polygon
				{points}
				fill={Chroma.oklch(0.75 - (0.75 / 6) * (i - 1), 0.37 - (0.37 / 6) * i, 72 * 0 + 18).hex()}
				transform={`scale(${phi ** i}) rotate(${72 * 0 + 12 * i})`}
			/>
		{/each}
	</g>
	{#each stars as d, i}
		<path {d} stroke="black" fill="none" fill-opacity={0.1} transform={`rotate(${i * 12})`} />
	{/each}
	<!--
	{#each angles2 as a}
		<path style="" d={`M0 0L${radialPointString(a, r)}`} stroke="white" />
	{/each}
	{#each radii as r}
		<circle {r} fill="none" stroke="white" />
	{/each}
	-->
</DrSvg>
