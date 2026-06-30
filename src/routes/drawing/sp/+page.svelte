<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { createLines, linesExtendedToEdge } from './lines';
	import { Delaunay } from 'd3-delaunay';
	import chroma from 'chroma-js';
	import { getCirclesWithMagnitudeFromLineIntersections } from '$lib/geometry/getCirclesWithMagnitudeFromLineIntersections';
	import { anglesArray, phi, polygon, polygonPointString } from '@dopplerreflect/geometry';
	import { pointInPolygon, type Point as GeometricPoint } from 'geometric'

	const scale = 1;
	const width = 1920 * scale;
	const height = 1080 * scale;
	
	const r = height / 2 / Math.sqrt(3) * 0.75;

	const angles = anglesArray(6, 0);
	const radii = [...Array(4).keys()].map(k => r * phi ** k)

	const lines = createLines(angles, radii);
	
	const dots = getCirclesWithMagnitudeFromLineIntersections({lines, bounds: {x: -width / 2, y: -height / 2, width, height}});

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

</script>

<DrSvg {...{ width, height }}>
	<defs>
		<mask id="hexMask">
			<polygon points={polygonPointString(polygon(6, r * 2 + 2 * scale, { rotate: 30 }))} fill="white" />
		</mask>
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={5 * scale}></feMorphology>
			<feGaussianBlur stdDeviation={5 * scale} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={1 * scale}
				diffuseConstant="3"
				lighting-color="#ffffff"
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="1" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="1"
				k2="1"
				k3="0.125"
				k4="0"
			/>
		</filter>
		<g display="block" id="polygons" mask="url(#hexMask)">
			{#each voronoiPolygons as polygon, i}
				<polygon id={`polygon-${i}`} points={polygon.points} />
				<mask id={`polygon-mask-${i}`}>
					<use href={`#polygon-${i}`} fill="white" />
				</mask>
				<use href={`#polygon-${i}`}
					filter="url(#topLight)"
					mask={`url(#polygon-mask-${i})`}
					fill={chroma
						.oklch(
							0.9 - (0.9 / r / 2) * Math.hypot(polygon.c.x, polygon.c.y),
							0.37 - (0.37 / r / 2) * Math.hypot(polygon.c.x, polygon.c.y),
							90 - (180 / r / 2) * Math.hypot(polygon.c.x, polygon.c.y),
						)
						.hex()}
				/>
			{/each}
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
