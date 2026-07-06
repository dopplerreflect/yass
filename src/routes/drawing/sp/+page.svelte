<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { createLines, linesExtendedToEdge } from './lines';
	import { Delaunay } from 'd3-delaunay';
	import chroma from 'chroma-js';
	import { getCirclesWithMagnitudeFromLineIntersections } from '$lib/geometry/getCirclesWithMagnitudeFromLineIntersections';
	import { anglesArray, phi, polygon, polygonPointString } from '@dopplerreflect/geometry';
	import { pointInPolygon, type Point as GeometricPoint } from 'geometric'

	const scale = 1.0;
	const width = 1920 * scale;
	const height = 1080 * scale;
	
	const r = height / 2 / Math.sqrt(3) * 0.75;

	const angles = anglesArray(6, 0);
	const radii = [...Array(4).keys()].map(k => r * phi ** k)

	const lines = createLines(angles, radii);
	// const lines2 = linesExtendedToEdge(lines, angles);
	
	const dots = getCirclesWithMagnitudeFromLineIntersections({lines, bounds: {x: -width / 2, y: -height / 2, width, height}});

	const min = Math.min(...dots.map(d => d.r))

	const delaunay = Delaunay.from(dots.map((c) => [c.x, c.y]));
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width / 2, height / 2]);
	const voronoiPolygonMap = new Map();

	const hexMaskPolygon: GeometricPoint[] = polygon(6, r * 2 * 1.1, { rotate: 30}).map(p => [p.x, p.y])

	for (let i = 0; i < dots.length; i++) {
		if (pointInPolygon([dots[i].x, dots[i].y], hexMaskPolygon)) {
			voronoiPolygonMap.set(i, { points: voronoi.cellPolygon(i), c: dots[i] });
		}
	}

	const voronoiPolygons = voronoiPolygonMap.values();

	// const voronoiPath = voronoi.render();
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<mask id="hexMask">
			<polygon points={polygonPointString(polygon(6, r * 2, { rotate: 30 }))} fill="white" />
		</mask>
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={3 * scale}></feMorphology>
			<feGaussianBlur stdDeviation={3 * scale} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={8 * scale}
				diffuseConstant="1"
				lighting-color="#ffffff"
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
			<feGaussianBlur stdDeviation={2} />
		</filter>
		<g display="block" id="polygons" mask="url(#hexMask)">
			{#each voronoiPolygons as polygon, i}
				<polygon id={`polygon-${i}`} points={polygon.points} />
				<mask id={`polygon-mask-${i}`}>
					<use href={`#polygon-${i}`} fill="white" />
				</mask>
				<use href={`#polygon-${i}`}
					stroke={chroma.oklch(0.1, 0.37, 300).hex()}
					filter="url(#topLight)"
					mask={`url(#polygon-mask-${i})`}
					fill={chroma
						.oklch(
							0.9 - (0.9 / r / 2) * Math.hypot(polygon.c.x, polygon.c.y),
							0.37,
							30 + (300 / r / 2) * Math.hypot(polygon.c.x, polygon.c.y),
						)
						.hex()}
				/>
			{/each}

			<g display="block" id="dots">
				{#each dots as c, i}
					<circle display="none" cx={c.x} cy={c.y} r={c.r - (min - 1)} fill="white" />
					<text display="none" x={c.x} y={c.y} fill="yellow" font-size="1.5em">{i}</text>
				{/each}
			</g>
		</g>
	</defs>

	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<g>
		<use href="#polygons" />
		<use href="#polygons" transform={`translate(0 ${r * 2 * Math.sqrt(3)})`} />
		<use href="#polygons" transform={`translate(0 ${-r * 2 * Math.sqrt(3)})`} />
		<use href="#polygons" transform={`translate(${-r * 3} ${-r * Math.sqrt(3)})`} />
		<use href="#polygons" transform={`translate(${r * 3} ${-r * Math.sqrt(3)})`} />
		<use href="#polygons" transform={`translate(${-r * 3} ${r * Math.sqrt(3)})`} />
		<use href="#polygons" transform={`translate(${r * 3} ${r * Math.sqrt(3)})`} />
	</g>
</DrSvg>
