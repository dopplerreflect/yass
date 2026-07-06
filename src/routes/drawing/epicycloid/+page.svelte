<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { pointToString, type Line, type Point } from '@dopplerreflect/geometry';
	import { findLineIntersections } from './intersection';
	import { petalPath, type PathIntersectionIndices } from './petalPath';
	import chroma from 'chroma-js';

	const scale = 1;
	const width = 1920 * scale;
	const height = 1080 * scale;

	const R = (height / 2) * 0.3;

	const n = 5;
	const d = 6;
	const k = n / d;

	const angles: number[] = [];
	for (let x = 0; x <= Math.PI * d * 2; x += 0.082) {
		angles.push(x);
	}

	const epicycloidPoint = (angle: number): Point => ({
		x: Number((R * (k + 1) * Math.cos(angle) - R * Math.cos((k + 1) * angle)).toFixed(2)),
		y: Number((R * (k + 1) * Math.sin(angle) - R * Math.sin((k + 1) * angle)).toFixed(2)),
	});

	const epicycloidPoints: Point[] = angles.map((a) => epicycloidPoint(a));

	const epicycloidLineSegments: Line[] = epicycloidPoints
		.slice(0, -1)
		.map((p, i) => [p, epicycloidPoints[i + 1]]);

	const lineSegmentIntersections = findLineIntersections(
		epicycloidLineSegments,
		epicycloidPoints,
		n,
	);

	const petalPathsPoints = [
		[0, 1, 10, 11, 18, 19, 24, 25, 28, 29],
		[0, 1, 9, 29],
		[28, 29, 26, 25],
		[24, 25, 20, 19],
		[18, 19, 12, 11],
		[10, 11, 2, 1],
		[1, 2, 17, 9],
		[29, 9, 8, 26],
		[25, 26, 21, 20],
		[19, 20, 13, 12],
		[11, 12, 3, 2],
		[9, 8, 16, 17],
		[26, 8, 7, 21],
		[20, 21, 14, 13],
		[12, 13, 4, 3],
		[2, 3, 23, 17],
		[17, 16, 22, 23],
		[8, 7, 15, 16],
		[21, 7, 6, 14],
		[13, 14, 5, 4],
		[3, 4, 27, 23],
		[23, 22, 27],
		[16, 15, 22],
		[7, 6, 15],
		[14, 6, 5],
		[4, 5, 27],
	].map((a) =>
		petalPath(a as PathIntersectionIndices, lineSegmentIntersections, epicycloidLineSegments),
	);

	const innermostRadius = Math.hypot(petalPathsPoints[0][0].x, petalPathsPoints[0][0].y);
	const outermostRadius = Math.hypot(
		petalPathsPoints[petalPathsPoints.length - 1][0].x,
		petalPathsPoints[petalPathsPoints.length - 1][0].y,
	);
	const radiusDelta = outermostRadius - innermostRadius;

	const petalPaths = petalPathsPoints.map((pathPoints, i) => {
		const d = `M${pathPoints.map((p) => pointToString(p)).join(' ')}Z`;

		const thisRadius = outermostRadius - Math.hypot(pathPoints[0].x, pathPoints[0].y);

		let l = 0.5 + (0.35 / radiusDelta) * thisRadius;
		if (i === 0) l = 0.9;

		let c = 0.185 + (0.185 / radiusDelta) * thisRadius;

		const fill = chroma.oklch(l, c, 90).hex();
		return { d, fill };
	});
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="glow">
			<feMorphology operator="dilate" radius={2 * scale} />
			<feGaussianBlur stdDeviation={3 * scale} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={8 * scale} />
			<feGaussianBlur stdDeviation={5 * scale} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={5 * scale}
				diffuseConstant={1.5}
				lighting-color="#ffffff"
				result="light"
			>
				<feDistantLight azimuth={-90} elevation={5} />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1={0}
				k2={1}
				k3={0.8}
				k4={0}
			/>
		</filter>
		{#each petalPaths as { d }, i}
			<path id={`path-${i}`} {d} />
			<mask id={`mask-path-${i}`}>
				<use href={`#path-${i}`} fill="white" />
			</mask>
		{/each}
		<radialGradient
			id="bgGradient"
			gradientUnits="userSpaceOnUse"
			cx={0}
			cy={0}
			r={Math.hypot(width / 2, height / 2)}
		>
			<stop offset="0" stop-color={chroma.oklch(0.75, 0.37, 300).hex()} />
			<stop offset="1" stop-color={chroma.oklch(0, 0.185, 300).hex()} />
		</radialGradient>
		<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
			<feDropShadow stdDeviation={8} dy={8} />
		</filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bgGradient)" />
	<g filter="url(#shadow)">
		{#each petalPaths as { d, fill }, i}
			<use
				href={`#path-${i}`}
				{fill}
				stroke={chroma.oklch(0.5, 0.37, 90).hex()}
				filter="url(#topLight)"
				mask={`url(#mask-path-${i})`}
			/>
		{/each}
	</g>
	<g filter="url(#glow)" display="block">
		{#each lineSegmentIntersections as [lineSegmentIndexPair, point], i}
			<circle cx={point.x} cy={point.y} r={2 * scale} fill="yellow" />
			<text display="none" x={point.x} y={point.y} fill="yellow" font-size={`${1 * scale}em`}
				>{i}{lineSegmentIndexPair}</text
			>
		{/each}
		{#each epicycloidPoints as point, i}
			<circle cx={point.x} cy={point.y} r={1 * scale} fill={chroma.oklch(1, 0.0925, 90).hex()} />
			<text display="none" x={point.x} y={point.y} fill="yellow" font-size="0.5em">{i}</text>
		{/each}
	</g>
</DrSvg>
