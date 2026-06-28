<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phylotaxis } from '@dopplerreflect/geometry';
	import { Delaunay } from 'd3-delaunay';
	import chroma from 'chroma-js';

	const scale = 1.0;
	const width = 1920 * scale;
	const height = 1080 * scale;

	const phylotaxicPoints = phylotaxis(2 ** 9, height / 2);

	//@ts-ignore
	const delaunay = Delaunay.from(phylotaxicPoints.map((p) => [p.x, p.y]));
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width / 2, height / 2]);
	const polygons: string[] = [];
	for (let i = 0; i < phylotaxicPoints.length - 55; i++) {
		polygons.push(
			voronoi
				.cellPolygon(i)
				.map((p) => `${p[0]},${p[1]}`)
				.join(' '),
		);
	}
	const path = voronoi.render();

	// for rings

	const radii: number[] = [];
	const numWaves = 18;
	const waveLength = Math.round(Math.hypot(width / 2, height / 2) / numWaves);
	for (let i = waveLength; i <= Math.hypot(width / 2, height / 2); i += waveLength) {
		radii.push(i);
	}
	const hypot = Math.hypot(width / 2, height / 2);
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="shrink">
			<feMorphology operator="erode" radius={0 * scale}></feMorphology>
		</filter>

		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={1 * scale}></feMorphology>
			<feGaussianBlur stdDeviation={7 * scale} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={5 * scale}
				diffuseConstant="2"
				lighting-color="#8080ff"
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="5" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="0"
				k2="1"
				k3="0.8"
				k4="0"
			/>
		</filter>

		<filter id="glow">
			<feGaussianBlur stdDeviation={3 * scale} />
			<feMerge>
				<feMergeNode />
				<feMergeNode />
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<!-- for waves -->

		<filter id="light" x="-20%" y="-20%" width="140%" height="140%">
			<feGaussianBlur in="SourceGraphic" stdDeviation={waveLength / 8} result="blur" />
			<feDiffuseLighting
				in="SourceAlpha"
				surfaceScale={10 * scale}
				diffuseConstant={4}
				lighting-color={chroma.oklch(0.0, 0.37, 300).hex()}
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="5" />
			</feDiffuseLighting>
			<feComposite in="SourceGraphic" in2="light" operator="over" />
		</filter>
		<filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur stdDeviation={waveLength / 4} />
		</filter>

		<filter id="glow-2" x="-25%" y="-25%" width="150%" height="150%">
			<feGaussianBlur in="SourceGraphic" stdDeviation={18 * scale} />
			<feColorMatrix
				type="matrix"
				values="
					1 0 0 0.50 0
					0 1 0 0.00 0
					0 0 1 1.00 0
					0 0 0 1.00 0
				"
			/>
			<feMerge>
				<feMergeNode />
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<rect
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill={chroma.oklch(0, 0.18, 300).hex()}
	/>
	<g id="waves" filter="url(#light)">
		{#each radii.slice(1, radii.length) as r, i}
			<circle
				{r}
				stroke={chroma
					.oklch(0.5 - (0.5 / hypot) * r, 0.37 - (0.37 / hypot) * r, 270 + (30 / hypot) * r)
					.hex()}
				stroke-width={waveLength / 2}
				fill="none"
				filter="url(#blur)"
			/>
		{/each}
	</g>
	<g id="phylo" filter="url(#glow-2)">
		{#each polygons as p, i}
			<mask id={`polygon-mask-${i}`}>
				<polygon points={p} fill="white" filter="url(#shrink)" />
			</mask>
			<polygon
				points={p}
				fill={chroma
					.oklch(
						0.8 - (i % 5 === 0 ? 0 : (0.8 / polygons.length) * 0.75 * i), // i % 5 === 0 ? 0.5 : 0.8,
						i % 2 === 0 ? 0.125 : i % 3 === 0 ? 0.0 : 0.37,
						30 + (270 / polygons.length) * i,
					)
					.hex()}
				filter="url(#topLight)"
				mask={`url(#polygon-mask-${i})`}
			/>
		{/each}
		<path
			display="none"
			d={path}
			stroke={chroma.oklch(0.5, 0.37, 300).hex()}
			stroke-width={1 * scale}
			filter="url(#glow)"
		/>
	</g>
</DrSvg>
