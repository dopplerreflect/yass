<svelte:options namespace="svg" />

<script lang="ts">
	import Filters from './filters.svg?raw';
	import DrSvg from "$lib/components/DrSvg.svelte";
	import chroma from 'chroma-js'
	import { anglesArray, lineIntersection2 as lineIntersection, phi, radialPoint, midpoint, PHI } from '@dopplerreflect/geometry';
	import type { Line, Point, Circle } from '@dopplerreflect/geometry';
	import { Delaunay } from "d3-delaunay";
	import seedrandom from 'seedrandom';

	const rng = seedrandom('quasicrystal-voronoi');
	
	const width = 1920;
	const height = 1080;
	const angles = anglesArray(10);
	const r = height * 0.33;
	const lineArray: Line[] = [
		...angles.map((a, i) => [radialPoint(a, r), radialPoint(angles[(i + 2) % 10], r)] as Line),
		...angles.map((a, i) => [radialPoint(a, r), radialPoint(angles[(i + 4) % 10], r)] as Line),
	];
	const r1i = lineIntersection(lineArray[0], lineArray[1], true);
	const r1 = Math.hypot(r1i!.x, r1i!.y);
	const r2i = lineIntersection(lineArray[10], lineArray[11]);
	const r2 = Math.hypot(r2i!.x, r2i!.y);
	angles.forEach((a, i) => {
		lineArray.push([radialPoint(a + 18, r1), {x: 0, y: 0}]);
		lineArray.push([radialPoint(a + 18, r1), radialPoint(angles[(i + 3) % 10] + 18, r1)]);
		lineArray.push([radialPoint(a + 18, r2), radialPoint(angles[(i + 3) % 10] + 18, r2)]);
	})

	const rawIntersections: Point[] = [];
	lineArray.forEach((_, i) => {
		for (let n = i + 1; n < lineArray.length; n++) {
			let int = lineIntersection(lineArray[i], lineArray[n])
			if(int) {
				rawIntersections.push(int);
			}
		}
	})
	const roundedIntersections = rawIntersections.map((i) => ({
		x: Math.round(i.x),
		y: Math.round(i.y)
	})).filter((p) => Math.abs(p.x) < width  && Math.abs(p.y) < height )
	const intersectionsWithMagnitudeMap = new Map();
	roundedIntersections.forEach((intersection) => {
		const i = JSON.stringify(intersection);
		if(!intersectionsWithMagnitudeMap.get(i)) {
			intersectionsWithMagnitudeMap.set(i, 1);
		} else {
			intersectionsWithMagnitudeMap.set(i, intersectionsWithMagnitudeMap.get(i) + 1);
		}
	})
	
	const circles: Circle[] = [...intersectionsWithMagnitudeMap].map((e) => {
		const c = JSON.parse(e[0]);
		return { x: c.x, y: c.y, r: e[1]}
	})
	
	const delaunay = Delaunay.from(circles.map((c) => [c.x, c.y]))
	const voronoi = delaunay.voronoi([-width , -height , width , height  ]);
	const path = voronoi.render();
	const polygons: string[] = [];
	for (let i = 0; i < circles.length; i++) {
		polygons.push(voronoi.cellPolygon(i).map(p => `${p[0]},${p[1]}`).join(' '))
	}
</script>

<DrSvg {...{width, height}}>
	<defs>
		{@html Filters}
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{width, height}} fill={chroma.oklch(0.01, 0.2, 300).hex()} />
	<g id="polygons" display="block">
		{#each polygons as p, i}
			<mask id={`polygon-mask-${i}`}>
				<polygon points={p} fill="white" />
			</mask>
			<polygon
				points={p}
				fill={
					chroma.oklch(
						0.75 - (0.75 / (width / 2) * Math.hypot(circles[i].x, circles[i].y)),
						0.125 + rng() * 0.245,
						60 + 360 / (width / 2) * Math.hypot(circles[i].x, circles[i].y)).hex()
					}
				filter="url(#topLight)"
				mask={`url(#polygon-mask-${i})`}
			/>
		{/each}
	</g>
	<g id="lines" display="none">
		{#each lineArray as l, i}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" />
		{/each}
	</g>
	<g id="circles" display="none">
		{#each circles as c}
			<circle cx={c.x} cy={c.y} r={c.r} fill="yellow" />
		{/each}
	</g>
	<path display="block" opacity={1} d={path} stroke={chroma.oklch(0.0, 0.0, 90).hex()} stroke-width={2} filter="url(#blur)"/>
</DrSvg>
