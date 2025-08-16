<script lang="ts">
	import chroma from 'chroma-js';
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		radialPoint,
		radialPointString,
		type Circle,
	} from '@dopplerreflect/geometry';
	const width = 1080;
	const height = 1080;

	const r0 = 150;
	const d = 15;
	const radii = [...Array(d).keys()].map((k) => r0 - (r0 / d) * k);
	const angles = anglesArray(6);
	// const circles: Circle[] = angles
	// 	.map((a) => [...radii.map((r) => ({ r, ...radialPoint(a, r0) }))])
	// 	.flat();
	const circles: Circle[] = radii.map((r) => ({ r, x: 0, y: 0 }));
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="glow">
			<feGaussianBlur stdDeviation={3} result="blur1" />
			<feGaussianBlur stdDeviation={5} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="blur1" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>

		<g id="dc" filter="url(#glow)">
			{#each circles as c, i}
				<circle
					r={c.r}
					cx={c.x}
					cy={c.y}
					fill="none"
					stroke={chroma.oklch(0.5 - (0.5 / d) * (i % d), 0.37, 300 - (i % d) * 3).hex()}
				/>
			{/each}
		</g>
		<g id="bc">
			{#each circles as c, i}
				<circle
					r={c.r}
					cx={c.x}
					cy={c.y}
					fill="none"
					stroke-width={r0 / d / 2}
					stroke={chroma.oklch((1 / d) * (i % d), (0.37 / d) * (i % d), 75).hex()}
					stroke-opacity={(1 / d) * (i % d)}
				/>
			{/each}
		</g>
	</defs>
	<rect
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill={chroma.oklch(0, 0.15, 240).hex()}
	/>
	<use href="#dc" />
	{#each angles as a}
		<use href="#dc" transform={`translate(${radialPointString(a, r0)})`} />
	{/each}
	{#each [5, 0, 1] as i}
		<use
			href="#dc"
			transform={`translate(${radialPointString(angles[i], r0, { center: radialPoint(angles[0], r0) })})`}
		/>
	{/each}
	{#each [2, 3, 4] as i}
		<use
			href="#dc"
			transform={`translate(${radialPointString(angles[i], r0, { center: radialPoint(angles[3], r0) })})`}
		/>
	{/each}
	{#each [-r0, 0, r0] as r}
		<use href="#dc" transform={`translate(${-r0 * Math.sqrt(3)} ${r})`} />
		<use href="#dc" transform={`translate(${r0 * Math.sqrt(3)} ${r})`} />
	{/each}
	{#each [0, 2, 4] as i}
		<use href="#bc" transform={`translate(${radialPointString(angles[i], r0)})`} />
	{/each}
	<use
		href="#bc"
		transform={`translate(${radialPointString(angles[3], r0, { center: radialPoint(angles[3], r0) })})`}
	/>
	<!--
	{#each [5, 0, 1] as i}
		<use
			href="#bc"
			transform={`translate(${radialPointString(angles[i], r0, { center: radialPoint(angles[0], r0 * 2) })})`}
		/>
	{/each}
	{#each [2, 3, 4] as i}
		<use
			href="#bc"
			transform={`translate(${radialPointString(angles[i], r0, { center: radialPoint(angles[3], r0 * 2) })})`}
		/>
	{/each}
-->
	<path
		d={`M${(-r0 * Math.sqrt(3)) / 2} ${-r0 * 1.5}h${r0 * Math.sqrt(3)}v${r0 * 3}h${-r0 * Math.sqrt(3)}Z`}
		stroke="white"
		fill="none"
	/>
</DrSvg>
