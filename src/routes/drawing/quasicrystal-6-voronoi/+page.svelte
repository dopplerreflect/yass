<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from "$lib/components/DrSvg.svelte";
	import chroma from 'chroma-js'
	import { anglesArray, lineIntersection as lineIntersection, phi, radialPoint, midpoint, PHI } from '@dopplerreflect/geometry';
	import type { Line, Point, Circle } from '@dopplerreflect/geometry';
	import { Delaunay } from "d3-delaunay";

	const scale = 1;
	const width = 1920 * scale;
	const height = 1080 * scale;

	const angles = anglesArray(6);
	const r = height * 0.45
	const r2 = r * Math.sqrt(3) / 2;
	
	const lineArray: Line[] = [
		...angles.map((a, i) => [radialPoint(a, r), { x: 0, y: 0 }] as Line),
		...angles.map((a, i) => [radialPoint(a, r), radialPoint(angles[(i + 1) % angles.length], r)] as Line),
		...angles.map((a, i) => [radialPoint(a, r), radialPoint(angles[(i + 2) % angles.length], r)] as Line),
		...angles.map((a, i) => [radialPoint(a, r), radialPoint(angles[(i + 3) % angles.length], r)] as Line),

		...angles.map((a, i) => [radialPoint(a + 30, r2), { x: 0, y: 0 }] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 1) % angles.length] + 30, r2)] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 2) % angles.length] + 30, r2)] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 3) % angles.length] + 30, r2)] as Line),

		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 2) % angles.length], r)] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 3) % angles.length], r)] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 4) % angles.length], r)] as Line),
		...angles.map((a, i) => [radialPoint(a + 30, r2), radialPoint(angles[(i + 5) % angles.length], r)] as Line),
	];
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
    <filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
    	<feMorphology in="SourceAlpha" operator="erode" radius={1 * scale} />
      <feGaussianBlur stdDeviation={13 * scale} result="blur" />
      <feDiffuseLighting in="blur" surfaceScale={13 * scale} diffuseConstant="1" lighting-color={chroma.oklch(0.5, 0.37, 300).hex()}
        result="light">
        <feDistantLight azimuth="-90" elevation="5" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
      <feMorphology operator="erode" radius={1 * scale}></feMorphology>
    </filter>

    <filter id="blur">
      <feGaussianBlur stdDeviation={6 * scale} />
      <feMerge>
        <feMergeNode />
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{width, height}} fill={chroma.oklch(0.01, 0.0, 300).hex()} />
	<g id="polygons" display="block">
		{#each polygons as p, i}
			<mask id={`polygon-mask-${i}`}>
				<polygon points={p} fill="white" />
			</mask>
			<polygon
				points={p}
				fill={
					chroma.oklch(
						0.95 - 0.95 / r * Math.hypot(circles[i].x, circles[i].y),
						0.37 - 0.37 / r * Math.hypot(circles[i].x, circles[i].y),
						120 - 180 / r * Math.hypot(circles[i].x, circles[i].y)
					).hex()
				}
				filter="url(#topLight)"
				mask={`url(#polygon-mask-${i})`}
			/>
		{/each}
	</g>
	<g id="lines" display="none">
		{#each lineArray as l, i}
			<line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} stroke="white" stroke-width={1 * scale} />
		{/each}
	</g>
	<g id="circles" display="none">
		{#each circles as c, i}
			<circle cx={c.x} cy={c.y} r={3 * scale} fill="white" />
		{/each}
	</g>
	<path display="none" opacity={1} d={path} stroke={chroma.oklch(0.66, 0.37, 300).hex()} stroke-width={2 * scale} filter="url(#blur)"/>
</DrSvg>
