<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import themes from './themes';
	const scale = 1;
	const width = 1920 * scale;
	const height = 1080 * scale;
	// const width = (height / Math.sqrt(3)) * 2;
	const hexRadius = height / 6;
	const theme = themes.e;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern id="hp" {...{ hexRadius, theme, scale }} />
		<filter id="lighting" x={-width / 2} y={-height / 2} {width} {height}>
			<feDiffuseLighting
				in="SourceGraphic"
				surfaceScale={2 * scale}
				diffuseConstant={1.5 * scale}
				lighting-color={theme.g0}
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="10" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				result="lit"
				k1="1.0"
				k2="1.0"
				k3="1.0"
				k4="0"
			/>
		</filter>
		<filter id="glowshadow">
			<feMorphology operator="dilate" radius={10 * scale} />
			<feGaussianBlur stdDeviation={15 * scale} />
			<feColorMatrix
				values="
				1 0 0 0.2 1.0
				0 1 0 0.0 1.0
				0 0 1 1.0 1.0
				0 0 0 1.0 0
				"
				result="glow"
			/>
			<feMorphology in="SourceAlpha" operator="dilate" radius={1 * scale} />
			<feGaussianBlur stdDeviation={10 * scale} />
			<feOffset dy={20 * scale} result="shadow" />
			<feMerge>
				<feMergeNode in="shadow" />
				<feMergeNode in="glow" />
			</feMerge>
		</filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill={'white'} />
	<rect
		display="block"
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill="url(#hp)"
		filter="url(#lighting)"
	/>
	<mask id="hp-paths-mask">
		<circle r={hexRadius * Math.sqrt(3)} fill="white" />
	</mask>
	<use display="block" href="#hp-paths" filter="url(#glowshadow)" />
	<use display="block" href="#hp-paths" mask="url(#hp-paths-mask)" filter="url(#lighting)" />
	<use display="none" href="#hp-g0" />
	<use display="none" href="#hp-g1" />
	<use display="none" href="#hp-g2" />
	<use display="none" href="#hp-guide" />
</DrSvg>
