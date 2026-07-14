<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import BasicHexPattern from './BasicHexPattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const hexRadius = 1920 / 21;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="bhp-filter" x="-50%" y="-50%" width="300%" height="300%">
			<feMorphology
				in="SourceGraphic"
				operator="erode"
				radius={`${hexRadius * 0.2} ${hexRadius * 0.115}`}
			/>
			<feGaussianBlur stdDeviation={`${(hexRadius * 0.2) / 8} ${(hexRadius * 0.115) / 8}`} />
			<feDiffuseLighting
				lighting-color={chroma.oklch(1, 0.37, 60).hex()}
				surfaceScale={3}
				diffuseConstant={1.5}
				result="light"
			>
				<feDistantLight azimuth="-105" elevation="10" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1={1}
				k2={0.75}
				k3={0}
				k4={0}
			/>
		</filter>
		<filter id="bhp-strokeFilter">
			<feGaussianBlur stdDeviation={4} />
			<feColorMatrix
				values="
					1 0 0 0 0
					0 0.5 0 0 0
					0 0 1 0 0
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
			circleStroke={chroma.oklch(1.0, 0.185, 300).hex()}
			circleStrokeFilter="url(#bhp-strokeFilter)"
			hexStroke={chroma.oklch(0.0, 0.185, 300).hex()}
			hexStrokeWidth={hexRadius * 0.115}
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#300060" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bhp)" />
</DrSvg>
