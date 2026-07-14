<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phi } from '@dopplerreflect/geometry';
	import BasicHexPattern from './BasicHexPattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const hexRadius = 1920 / 55;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="bhp-filter" x="-50%" y="-50%" width="300%" height="300%">
			<feMorphology in="SourceGraphic" operator="erode" radius={hexRadius * phi ** 5} />
			<feGaussianBlur stdDeviation={hexRadius * phi ** 8} />
			<feDiffuseLighting
				lighting-color={chroma.oklch(0.95, 0.37, 90).hex()}
				surfaceScale={2}
				diffuseConstant={1.25}
				result="light"
			>
				<feDistantLight azimuth="-105" elevation="10" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1={1.75}
				k2={0.25}
				k3={0}
				k4={0}
			/>
		</filter>
		<filter id="bhp-strokeFilter">
			<feGaussianBlur stdDeviation={4} />
			<feColorMatrix
				values="
					1 0 0 0 2
					0 1 0 0 2
					0 0 1 0 2
					0 0 0 1 0
				"
			/>
			<feMerge>
				<feMergeNode />
				<feMergeNode />
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<BasicHexPattern
			id="bhp"
			{hexRadius}
			hexFill={chroma.oklch(0.75, 0.37, 90).hex()}
			fillFilter="url(#bhp-filter)"
			circleStroke={chroma.oklch(1, 0.37, 90).hex()}
			circleStrokeFilter="url(#bhp-strokeFilter)"
			hexStroke={chroma.oklch(0.15, 0.185, 90).hex()}
			hexStrokeWidth={4}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#300060" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bhp)" />
</DrSvg>
