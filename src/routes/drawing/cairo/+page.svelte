<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		pointToString,
		polygonPointString,
		radialPoint,
		type Point,
	} from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;
	const width = 1920;
	const height = 1080;
	const hue = 75;
	const lightness = 1;
	const unit = 50;
	const unitb = unit * Math.sqrt(3) - unit;
	const vb = [-unit * Math.sqrt(3), -unit - unitb, unit * Math.sqrt(3) * 2, (unit + unitb) * 2];
	const cl = unitb * Math.sqrt(3);
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

	const base = {
		p0: { x: 0, y: -cl / 2 },
		p1: { x: 0, y: cl / 2 },
		p2: radialPoint(30, cl, { center: { x: 0, y: -cl / 2 } }),
		p3: radialPoint(150, cl, { center: { x: 0, y: -cl / 2 } }),
	};
	const p = {
		...base,
		p4: radialPoint(240, cl, { center: base.p0 }),
		p5: radialPoint(300, cl, { center: base.p0 }),
		p6: radialPoint(300, cl, { center: base.p2 }),
		p7: radialPoint(60, cl, { center: base.p2 }),
		p8: radialPoint(60, cl, { center: base.p1 }),
		p9: radialPoint(120, cl, { center: base.p1 }),
		p10: radialPoint(120, cl, { center: base.p3 }),
		p11: radialPoint(240, cl, { center: base.p3 }),
	};
	const s = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, pointToString(v)])) as Record<
		keyof typeof p,
		string
	>;

	const ppath = [
		`M${s.p0}`,
		s.p1,
		s.p2,
		s.p0,
		s.p3,
		s.p1,
		'M',
		s.p4,
		s.p0,
		s.p5,
		s.p6,
		s.p2,
		s.p7,
		s.p8,
		s.p1,
		s.p9,
		s.p10,
		s.p3,
		s.p11,
		s.p4,
		'M',
		s.p2,
		pointToString(radialPoint(0, cl, { center: p.p2 })),
		'M',
		s.p3,
		pointToString(radialPoint(180, cl, { center: p.p3 })),
	].join(' ');
	const qpath = [
		`M${s.p4}`,
		s.p5,
		`M${s.p6}`,
		pointToString(radialPoint(270, cl / 2, { center: p.p6 })),
		`M${s.p7}`,
		pointToString(radialPoint(90, cl / 2, { center: p.p7 })),
		`M${s.p10}`,
		pointToString(radialPoint(90, cl / 2, { center: p.p10 })),
		`M${s.p11}`,
		pointToString(radialPoint(270, cl / 2, { center: p.p11 })),
	].join(' ');
</script>

<DrSvg {...{ width, height }}>
	<pattern
		id="pattern"
		width={unit * Math.sqrt(3) * 2}
		height={(unit + unitb) * 2}
		viewBox={`${vb.join(' ')}`}
		stroke="black"
		fill="#ff000088"
		patternUnits="userSpaceOnUse"
		patternTransform={`translate(${-vb[0]} ${-vb[1]}) rotate(30)`}
	>
		<defs>
			<linearGradient id="lg0">
				<stop offset={0} stop-color={oklch(lightness, 0.0, hue).hex()} />
				<stop offset={1} stop-color={oklch(0.0, 0.0925, hue, 0).hex()} />
			</linearGradient>
			<linearGradient id="lg1" gradientTransform="rotate(90)">
				<stop offset={0} stop-color={oklch(0.0, 0.0925, hue, 0).hex()} />
				<stop offset={1} stop-color={oklch(lightness, 0.0, hue).hex()} />
			</linearGradient>
			<filter id="glow">
				<feMorphology operator="dilate" radius={1} />
				<feGaussianBlur stdDeviation={5} />
				<feMerge>
					<feMergeNode />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
			<filter id="light">
				<feDiffuseLighting
					in="SourceGraphic"
					result="light"
					lighting-color={oklch(0.75, 0.37, 90).hex()}
					surfaceScale="3"
					diffuseConstant="3"
				>
					<feDistantLight azimuth="-90" elevation="10" />
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
			<polygon id="p0" points={polygonPointString(points0)} fill="url(#lg0)" />
			<use href="#p0" transform={`rotate(180)`} />
			<polygon id="p1" points={polygonPointString(points1)} fill="url(#lg1)" />
			<use href="#p1" transform={`rotate(180)`} />
		</g>
		<use
			display="block"
			href="#c"
			transform={`translate(${-unit * Math.sqrt(3)} ${-unit - unitb})`}
		/>
		<use
			display="block"
			href="#c"
			transform={`translate(${unit * Math.sqrt(3)} ${-unit - unitb})`}
		/>
		<use
			display="block"
			href="#c"
			transform={`translate(${-unit * Math.sqrt(3)} ${unit + unitb})`}
		/>
		<use
			display="block"
			href="#c"
			transform={`translate(${unit * Math.sqrt(3)} ${unit + unitb})`}
		/>
		<g
			display="none"
			stroke={oklch(lightness * 1.5, 0.37, hue).hex()}
			fill="none"
			filter="url(#glow)"
		>
			<path d={ppath} />
			<path d={qpath} />
		</g>
	</pattern>
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill="black"
	/>
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill="url(#pattern)"
		filter="url(#light)"
	/>
</DrSvg>
