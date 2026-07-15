<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import BasicHexPattern from './BasicHexPattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const hexRadius = (1920 / 15) * Math.sqrt(3);
	const lightness = 0.95;
	const hue = 240;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="bhp-filter" x="-25%" y="-25%" width="150%" height="150%">
			<feMorphology
				in="SourceGraphic"
				operator="erode"
				radius={`${hexRadius * 0.2} ${hexRadius * 0.115}`}
			/>
			<feGaussianBlur stdDeviation={`${(hexRadius * 0.2) / 8} ${(hexRadius * 0.115) / 8}`} />
			<feDiffuseLighting
				lighting-color={chroma.oklch(lightness * 0.5, 0.37, hue).hex()}
				surfaceScale={8}
				diffuseConstant={1}
				result="light"
			>
				<feDistantLight azimuth="105" elevation="45" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1={0.33}
				k2={0.33}
				k3={0.33}
				k4={0}
			/>
		</filter>
		<filter id="bhp-strokeFilter">
			<feMorphology operator="dilate" radius={1} />
			<feGaussianBlur stdDeviation={3} />
			<feColorMatrix
				values="
					1 0 0 0 -0.25
					0 1 0 0 -0.95
					0 0 1 0 -0.5
					0 0 0 1 0
				"
			/>
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<BasicHexPattern
			id="bhp"
			{hexRadius}
			hexFill={chroma.oklch(lightness * 0.75, 0.0, hue).hex()}
			fillFilter="url(#bhp-filter)"
			hexStroke={chroma.oklch(lightness * 0.25, 0.0925, hue - 120).hex()}
			hexStrokeWidth={hexRadius * 0.115}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bhp)" />
</DrSvg>
