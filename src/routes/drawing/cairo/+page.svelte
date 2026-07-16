<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { polygonPointString, radialPoint, type Point } from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;
	const width = 1920;
	const height = 1080;
	const unit = 34;
	const unitb = unit * Math.sqrt(3) - unit;
	const points0: Point[] = [{ x: unitb / 2, y: 0 }];
	points0.push(radialPoint(-60, unit, { center: points0[0] }));
	points0.push(radialPoint(30, unit, { center: points0[1] }));
	points0.push(radialPoint(90, unit * Math.sqrt(3) - unit, { center: points0[2] }));
	points0.push(radialPoint(150, unit, { center: points0[3] }));

	const points1: Point[] = [{ x: unitb / 2, y: 0 }];
	points1.push(radialPoint(-60, unit, { center: points1[0] }));
	points1.push(radialPoint(-150, unit, { center: points1[1] }));
	points1.push(radialPoint(-210, unit, { center: points1[2] }));
	points1.push(radialPoint(60, unit, { center: points1[3] }));
</script>

<DrSvg {...{ width, height }}>
	<pattern
		id="pattern"
		width={unit * Math.sqrt(3) * 2}
		height={(unit + unitb) * 2}
		viewBox={`${-unit * Math.sqrt(3)} ${-unit - unitb} ${unit * Math.sqrt(3) * 2} ${(unit + unitb) * 2}`}
		stroke="black"
		fill="#ff000088"
		patternUnits="userSpaceOnUse"
		patternTransform={`rotate(30)`}
	>
		<defs>
			<linearGradient id="lg0">
				<stop offset={0} stop-color={oklch(0.25, 0.37, 300).hex()} />
				<stop offset={1} stop-color={oklch(0.0, 0.0925, 300).hex()} />
			</linearGradient>
			<linearGradient id="lg1" gradientTransform="rotate(90)">
				<stop offset={0} stop-color={oklch(0.0, 0.0925, 300).hex()} />
				<stop offset={1} stop-color={oklch(0.25, 0.37, 300).hex()} />
			</linearGradient>
		</defs>
		<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
		<path d={`M${-width / 2} 0H${width / 2}`} stroke="white" />
		<g id="c" stroke="none">
			<polygon id="p0" points={polygonPointString(points0)} fill="url(#lg0)" />
			<use href="#p0" transform={`rotate(180)`} />
			<polygon id="p1" points={polygonPointString(points1)} fill="url(#lg1)" />
			<use href="#p1" transform={`rotate(180)`} />
		</g>
		<use href="#c" transform={`translate(${-unit * Math.sqrt(3)} ${-unit - unitb})`} />
		<use href="#c" transform={`translate(${unit * Math.sqrt(3)} ${-unit - unitb})`} />
		<use href="#c" transform={`translate(${-unit * Math.sqrt(3)} ${unit + unitb})`} />
		<use href="#c" transform={`translate(${unit * Math.sqrt(3)} ${unit + unitb})`} />
	</pattern>
	<path d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`} fill="url(#pattern)" />
</DrSvg>
