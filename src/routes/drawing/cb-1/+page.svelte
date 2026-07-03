<script lang="ts">
	import chroma from 'chroma-js';
	import { Delaunay } from 'd3';
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		goldenCircles,
		phi,
		phylotaxis,
		radialPoint,
		radialPointString,
		type Circle,
	} from '@dopplerreflect/geometry';
	import type { Polygon } from 'geometric';
	const width = 1920;
	const height = 1080;
	const radii = [...Array(4).keys()].map((k) => height * 0.25 * 0.94 * phi ** k);
	const angles = anglesArray(8);

	const gCircles = goldenCircles(radii, angles);
	const bumpiness = radii[3] * phi ** 3;

	const circles2: Circle[] = [
		...radii.slice(1, 4).map((r) => ({ x: 0, y: 0, r })),
		...angles.map((a) => radii.slice(2, 4).map((r) => ({ r, ...radialPoint(a, radii[0]) }))).flat(),
	];

	const smallPetalPathOutlineParts: string[] = angles.map((a, i) => {
		return `A${radii[1]} ${radii[1]} 0 0 1 ${radialPointString(a + 60, radii[1], { center: radialPoint(a, radii[0]) })}`;
	});

	const smallPetalOutlinePath =
		`M${radialPointString(angles[0] - 60, radii[1], { center: radialPoint(angles[0], radii[0]) })}` +
		smallPetalPathOutlineParts.join('') +
		'Z';

	const bigPetalOutlinePathParts: string[] = angles.map((a, i) => {
		return `A${radii[0]} ${radii[0]} 0 0 1 ${radialPointString(a + 45, radii[0], { center: radialPoint(a, radii[0]) })}`;
	});

	const bigPetalOutlinePath =
		`M${radialPointString(angles[0] - 45, radii[0], { center: radialPoint(angles[0], radii[0]) })}` +
		bigPetalOutlinePathParts.join('') +
		'Z';

	const phyloPoints = phylotaxis(89, radii[1]);

	const delaunay = Delaunay.from(phyloPoints.map((p) => [p.x, p.y]));
	const voronoi = delaunay.voronoi([-radii[1], -radii[1], radii[1], radii[1]]);
	const phyloPolygons: Polygon[] = [];
	for (let i = 0; i < phyloPoints.length; i++) {
		phyloPolygons.push(voronoi.cellPolygon(i));
	}
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={bumpiness * 0.75}></feMorphology>
			<feGaussianBlur stdDeviation={bumpiness * 0.75} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={bumpiness * 0.75}
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
				k2="1.0"
				k3="0.8"
				k4="0"
			/>
		</filter>

		<filter id="topLight2" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={bumpiness * 0.25}></feMorphology>
			<feGaussianBlur stdDeviation={bumpiness * 0.25} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={bumpiness * 0.5}
				diffuseConstant="2"
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
				k3="0.5"
				k4="0"
			/>
		</filter>
		<path
			id="small-petal"
			d={`M${radialPointString(90 + 22.5, radii[2], { center: radialPoint(0, radii[0]) })}A${radii[2]} ${radii[2]} 1 0 1 ${radialPointString(-90 - 22.5, radii[2], { center: radialPoint(0, radii[0]) })}L${radialPointString(-61, radii[1], { center: radialPoint(0, radii[0]) })}A${radii[1]} ${radii[1]} 0 0 1 ${radialPointString(61, radii[1], { center: radialPoint(0, radii[0]) })}ZM${radialPointString(0, radii[1])}A${radii[2]} ${radii[2]} 0 1 0 ${radialPointString(359, radii[1])}ZM${radialPointString(0, radii[3], { center: radialPoint(0, radii[0]) })}A${radii[3]} ${radii[3]} 0 1 1 ${radialPointString(359, radii[3], { center: radialPoint(0, radii[0]) })}Z`}
			fill-rule="evenodd"
		/>
		<g id="small-petals">
			{#each angles as a}
				<use href="#small-petal" transform={`rotate(${a})`} />
			{/each}
		</g>
		<filter id="small-ring-grow">
			<feMorphology operator="dilate" radius="1" />
		</filter>
		<path
			id="small-ring"
			d={`M${radialPointString(0, radii[2])}A${radii[2]} ${radii[2]} 0 1 1 ${radialPointString(359, radii[2])}ZM${radialPointString(0, radii[3])}A${radii[3]} ${radii[3]} 0 1 1 ${radialPointString(359, radii[3])}Z`}
			fill-rule="evenodd"
			filter="url(#small-ring-grow)"
		/>
		<mask id="small-ring-mask">
			<use href="#small-ring" fill="white" />
		</mask>
		<path
			id="big-ring"
			d={`M${radialPointString(0, radii[1])}A${radii[1]} ${radii[1]} 0 1 1 ${radialPointString(359, radii[1])}ZM${radialPointString(0, radii[2])}A${radii[2]} ${radii[2]} 0 1 1 ${radialPointString(359, radii[2])}Z`}
			fill-rule="evenodd"
		/>
		<mask id="big-ring-mask">
			<use href="#big-ring" fill="white" />
		</mask>
		<g id="rings">
			{#each angles as a}
				<use href="#small-ring" transform={`rotate(${a}) translate(${radii[0]} 0)`} />
			{/each}
		</g>
		<filter id="big-petal-blur">
			<feMorphology in="SourceAlpha" operator="dilate" radius="1" />
			<feGaussianBlur stdDeviation={6} />
			<feMerge>
				<feMergeNode />
				<feMergeNode />
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<g id="big-petal">
			<path
				d={`M${radialPointString(22.5, radii[1])}A${radii[1]} ${radii[1]} 0 0 0 ${radialPointString(-22.5, radii[1])}L${radialPointString(-45, radii[0], { center: radialPoint(0, radii[0]) })}A${radii[0]} ${radii[0]} 0 0 1 ${radialPointString(45, radii[0], { center: radialPoint(0, radii[0]) })}Z`}
			/>
			<g filter="url(#big-petal-blur)">
				{#each [...Array(14).keys()] as a}
					<path
						d={`M${radialPointString(0, 0)}L${radialPointString(-45 + (90 / 13) * a, radii[0], { center: radialPoint(0, radii[0]) })}`}
						stroke={chroma.oklch(0.75, 0.37, 90).hex()}
						stroke-width={2}
					/>
				{/each}
			</g>
		</g>
		<g id="big-petals">
			{#each angles as a}
				<use href="#big-petal" transform={`rotate(${a})`} />
			{/each}
		</g>

		<path id="all-big-petals" d={bigPetalOutlinePath} fill="white" />
		<mask id="big-petals-mask">
			<use href="#all-big-petals" />
			<circle r={radii[1]} fill="black" />
		</mask>

		<path id="all-small-petals" d={smallPetalOutlinePath} />
		<mask id="small-petals-mask">
			<use href="#all-small-petals" fill="white" />
			<use href="#rings" fill="black" />
			<circle r={radii[1]} fill="black" />
		</mask>

		<mask id="rings-mask">
			<use href="#rings" fill="white" />
		</mask>

		<circle id="center-circle" r={radii[3]} />
		<mask id="center-circle-mask">
			<use href="#center-circle" fill="white" />
		</mask>
		<linearGradient id="gradient" x1="-100%">
			<stop offset={0.25} stop-color={chroma.oklch(1, 0.37, 90).hex()} />
			<stop offset={1} stop-color={chroma.oklch(0.25, 0.37, 60).hex()} />
		</linearGradient>
		<radialGradient id="rgradient" gradientTransform="scale(2)" cx="25%" cy="25%">
			<stop offset={0.25} stop-color={chroma.oklch(1, 0.37, 90).hex()} />
			<stop offset={1} stop-color={chroma.oklch(0.25, 0.37, 60).hex()} />
		</radialGradient>
		<radialGradient id="rgradient2">
			<stop offset={0.25} stop-color={chroma.oklch(1, 0.37, 90).hex()} />
			<stop offset={1} stop-color={chroma.oklch(0.25, 0.37, 60).hex()} />
		</radialGradient>
		<radialGradient
			id="bgGradient"
			gradientUnits="userSpaceOnUse"
			cx={0}
			cy={0}
			r={Math.hypot(width / 2, height / 2)}
		>
			<stop offset="0" stop-color={chroma.oklch(0.5, 0.37, 300).hex()} />
			<stop offset="1" stop-color={chroma.oklch(0, 0.17, 300).hex()} />
		</radialGradient>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bgGradient)" />
	<filter id="flower-drop-shadow">
		<feDropShadow stdDeviation={8} dy={16} />
	</filter>
	<g id="flower" filter="url(#flower-drop-shadow)">
		<g id="poly-circle">
			{#each phyloPolygons as points, i}
				<polygon id={`poly-${i}`} {points} />
				<mask id={`poly-mask-${i}`}>
					<use href={`#poly-${i}`} fill="white" />
				</mask>
				<use
					href={`#poly-${i}`}
					mask={`url(#poly-mask-${i})`}
					fill={chroma
						.oklch(
							1 - (1 / radii[1]) * Math.hypot(phyloPoints[i].x, phyloPoints[i].y),
							0.37,
							30 + (270 / phyloPoints.length) * i,
						)
						.hex()}
					filter="url(#topLight2)"
				/>
			{/each}
		</g>
		<use
			href="#big-petals"
			filter="url(#topLight)"
			mask="url(#big-petals-mask)"
			fill={chroma.oklch(0.5, 0.37, 300).hex()}
		/>
		<use
			href="#rings"
			filter="url(#topLight)"
			mask="url(#rings-mask)"
			fill={chroma.oklch(0.0, 0.37, 300).hex()}
		/>
		<use
			href="#small-petals"
			filter="url(#topLight)"
			mask="url(#small-petals-mask)"
			fill="url(#gradient)"
		/>

		<g opacity={0.8}>
			<use
				href="#big-ring"
				filter="url(#topLight)"
				mask="url(#big-ring-mask)"
				fill="url(#rgradient)"
			/>
			<use
				href="#small-ring"
				filter="url(#topLight)"
				mask="url(#small-ring-mask)"
				fill={chroma.oklch(0.0, 0.37, 300).hex()}
			/>
			<use
				href="#center-circle"
				filter="url(#topLight)"
				mask="url(#center-circle-mask)"
				fill="url(#rgradient2)"
			/>
		</g>
	</g>
	<filter id="blur">
		<feMorphology operator="dilate" radius="1" />
		<feGaussianBlur stdDeviation={4} result="blur" />
		<feColorMatrix
			in="SourceGraphic"
			values="
				1 0 0 0 0
				0 0.5 0 0 0
				0 0 0 0 0
				0 0 0 1 0
			"
			result="color"
		/>
		<feGaussianBlur stdDeviation="1" />
		<feMerge>
			<feMergeNode in="blur" />
			<feMergeNode />
		</feMerge>
	</filter>
	<g id="golden-circles" filter="url(#blur)" opacity={0.33}>
		{#each gCircles as c}
			<circle cx={c.x} cy={c.y} r={c.r} stroke={chroma.oklch(1, 0.17, 90).hex()} fill="none" />
		{/each}
	</g>
</DrSvg>
