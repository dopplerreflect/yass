<svelte:options namespace="svg" />

<script lang="ts">
	type Props = {
		id?: string;
		unit?: number;
		hue?: number;
		lightness?: number;
		rotate?: number;
		azimuth?: number;
	};

	let {
		id = 'CairoPattern',
		unit = 100,
		hue = 300,
		lightness = 0.5,
		rotate = 0,
		azimuth = -90,
	}: Props = $props();

	import { polygonPointString, radialPoint, type Point } from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;

	let d = $derived.by(() => {
		let unitb = unit * Math.sqrt(3) - unit;
		let vb = [-unit * Math.sqrt(3), -unit - unitb, unit * Math.sqrt(3) * 2, (unit + unitb) * 2];
		let cl = unitb * Math.sqrt(3);
		let points0: Point[] = [{ x: unitb / 2, y: 0 }];
		points0.push(radialPoint(-60, unit, { center: points0[0] }));
		points0.push(radialPoint(30, unit, { center: points0[1] }));
		points0.push(radialPoint(90, unit * Math.sqrt(3) - unit, { center: points0[2] }));
		points0.push(radialPoint(150, unit, { center: points0[3] }));

		let points1: Point[] = [{ x: unitb / 2, y: 0 }];
		points1.push(radialPoint(-60, unit, { center: points1[0] }));
		points1.push(radialPoint(-150, unit, { center: points1[1] }));
		points1.push(radialPoint(-210, unit, { center: points1[2] }));
		points1.push(radialPoint(60, unit, { center: points1[3] }));

		return { unitb, vb, cl, points0, points1 };
	});
</script>

<pattern
	{id}
	width={unit * Math.sqrt(3) * 2}
	height={(unit + d.unitb) * 2}
	viewBox={`${d.vb.join(' ')}`}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${-d.vb[0]} ${-d.vb[1]}) rotate(${rotate})`}
>
	<defs>
		<linearGradient id={`${id}-lg0`}>
			<stop offset={0} stop-color={oklch(lightness, 0.0, hue).hex()} />
			<stop offset={1} stop-color={oklch(0.0, 0.0925, hue, 0).hex()} />
		</linearGradient>
		<linearGradient id={`${id}-lg1`} gradientTransform="rotate(90)">
			<stop offset={0} stop-color={oklch(0.0, 0.0925, hue, 0).hex()} />
			<stop offset={1} stop-color={oklch(lightness, 0.0, hue).hex()} />
		</linearGradient>
		<filter id={`${id}-light`}>
			<feDiffuseLighting
				in="SourceGraphic"
				result="light"
				lighting-color={oklch(lightness * 0.75, 0.37, hue).hex()}
				surfaceScale="3"
				diffuseConstant="3"
			>
				<feDistantLight {azimuth} elevation="10" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="1"
				k2="0"
				k3="0.25"
				k4="0"
			/>
		</filter>
	</defs>
	<g id="c" stroke="none">
		<polygon id="p0" points={polygonPointString(d.points0)} fill={`url(#${id}-lg0)`} />
		<use href="#p0" transform={`rotate(180)`} />
		<polygon id="p1" points={polygonPointString(d.points1)} fill={`url(#${id}-lg1)`} />
		<use href="#p1" transform={`rotate(180)`} />
	</g>
	<use
		display="block"
		href="#c"
		transform={`translate(${-unit * Math.sqrt(3)} ${-unit - d.unitb})`}
	/>
	<use
		display="block"
		href="#c"
		transform={`translate(${unit * Math.sqrt(3)} ${-unit - d.unitb})`}
	/>
	<use
		display="block"
		href="#c"
		transform={`translate(${-unit * Math.sqrt(3)} ${unit + d.unitb})`}
	/>
	<use
		display="block"
		href="#c"
		transform={`translate(${unit * Math.sqrt(3)} ${unit + d.unitb})`}
	/>
</pattern>
