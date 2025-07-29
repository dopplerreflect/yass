<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		findCentroid,
		phylotaxis,
		polygonPointString,
		shrinkPolygon
	} from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	import Spectral from 'spectral.js';

	const width = 1920;
	const height = 1080;
	const r = height / 2;
	const phyllotaxicPoints = phylotaxis(233, r);

	const polygons = phyllotaxicPoints
		.slice(0, phyllotaxicPoints.length - 21)
		.map((p, i) => [
			[p, phyllotaxicPoints[i + 13], phyllotaxicPoints[i + 21]],
			[p, phyllotaxicPoints[i + 8], phyllotaxicPoints[i + 21]]
		])
		.flat()
		.map((p) => shrinkPolygon(p, 21));

	const colors = [...Array(7).keys()].map(
		(i) => new Spectral.Color(chroma.oklch(1 - (1 / 7) * i, 0.37, 120 + (240 / 7) * i).hex())
	);

	const gradient = colors.map((c, i) => [c, (1 / 7) * i]);

	function colorAtGradient(t) {
		return Spectral.gradient(t, ...gradient).toString();
	}

	function colorForPolygon(p) {
		const center = findCentroid(p);
		const { x, y } = center;
		const f = 1 / r;
		const d = Math.hypot(x, y);
		const t = f * d;
		return colorAtGradient(t);
	}
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<radialGradient id="rGradient" cx={0} cy={0} {r} gradientUnits="userSpaceOnUse">
			{#each [...Array(7).keys()] as i}
				<stop
					offset={(1 / 7) * i}
					stop-color={chroma.oklch(1 - (1 / 7) * (i + 1), 0.37, 30 + (270 / 7) * i).hex()}
				/>
			{/each}
		</radialGradient>
		<mask id="polygonMask">
			{#each polygons as p}
				<polygon points={polygonPointString(p)} fill="white" />
			{/each}
		</mask>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill={`black`} />
	<rect
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill="url(#rGradient)"
		mask="url(#polygonMask)"
	/>
	{#each polygons as p, i}
		<polygon
			points={polygonPointString(shrinkPolygon(p, 61))}
			fill={colorForPolygon(p)}
			stroke="black"
		/>
		<!-- <polygon -->
		<!-- points={polygonPointString(shrinkPolygon(p, 61))} -->
		<!-- fill={chroma.oklch((1 / 13) * (i % 13), 0.37, (360 / 21) * (i % 21)).hex()} -->
		<!-- stroke={chroma.oklch(1 - (1 / 13) * (i % 13), 0.37, (360 / 21) * (i % 21)).hex()} -->
		<!-- stroke-width={2} -->
		<!-- /> -->
	{/each}

	{#each [] as p, i}
		<text x={p.x} y={p.y} dominant-baseline="middle" text-anchor="middle" fill="white" font-size={5}
			>{i}</text
		>
	{/each}
</DrSvg>
