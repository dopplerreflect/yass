<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { phi } from '@dopplerreflect/geometry';
	import BasicHexPattern from './BasicHexPattern.svelte';
	import chroma from 'chroma-js';
	const width = 1920;
	const height = 1080;
	const r = 1920 / 55;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="bhp-filter" x="-50%" y="-50%" width="300%" height="300%">
			<feMorphology in="SourceGraphic" operator="erode" radius={r * phi ** 3} />
			<feGaussianBlur stdDeviation={r * phi ** 3} />
			<feDiffuseLighting
				lighting-color={chroma.oklch(0.25, 0.37, 300).hex()}
				surfaceScale={4}
				diffuseConstant={1}
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="10" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1={1.0}
				k2={0.5}
				k3={0}
				k4={0}
			/>
		</filter>
		<BasicHexPattern
			id="bhp"
			{r}
			fill={chroma.oklch(0.25, 0.185, 300).hex()}
			filter="url(#bhp-filter)"
		/>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="#300060" />
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#bhp)" />
</DrSvg>
