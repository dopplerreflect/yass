<svelte:options namespace="svg" />

<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import CairoPattern from '$lib/components/CairoPattern.svelte';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;

	const width = 1920;
	const height = 1080;
	const unit = (width * 0.144) / 2;
	const hue = 90;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<CairoPattern id="cp" {unit} {hue} lightness={0.75} />
		<filter id="topLight" x="-20%" y="-20%" width="140%" height="140%">
			<feMorphology in="SourceAlpha" operator="erode" radius={6}></feMorphology>
			<feGaussianBlur stdDeviation={1} result="blur" />
			<feDiffuseLighting
				in="blur"
				surfaceScale={8}
				diffuseConstant={1}
				lighting-color={oklch(1, 0.37, hue).hex()}
				result="light"
			>
				<feDistantLight azimuth="90" elevation="5" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="1"
				k2="1"
				k3="1"
				k4="0"
			/>
			<feGaussianBlur stdDeviation={0} />
		</filter>
	</defs>
	<path
		display="block"
		d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
		fill={oklch(0.1, 0.037, 300).hex()}
	/>
	<g display="block">
		<path
			display="block"
			d={`M${-width / 2} ${-height / 2}h${width}v${height}h${-width}Z`}
			fill="url(#cp)"
			filter="url(#topLight)"
		/>
	</g>
	<use display="none" href="#cp-paths" stroke="white" fill="none" />
	<use display="none" href="#cp-paths" stroke="white" fill="none" transform="rotate(90)" />
	<use display="none" href="#cp-guide" stroke="white" fill="yellow" />
</DrSvg>
