<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import GoldenHexCirclePattern from '$lib/components/GoldenHexCirclePattern.svelte';
	import themes from './themes';
	const scale = 1;
	const width = 1920 * scale;
	const height = 1080 * scale;
	const theme = themes.f;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<GoldenHexCirclePattern id="hp" hexRadius={height / 9} {theme} {scale} />
		<filter id="lighting" x="-20%" y="-20%" width="140%" height="140%">
			<feDiffuseLighting
				in="SourceGraphic"
				surfaceScale={1 * scale}
				diffuseConstant={1.5 * scale}
				lighting-color="#ffffff"
				result="light"
			>
				<feDistantLight azimuth="-90" elevation="5" />
			</feDiffuseLighting>
			<feComposite
				in="SourceGraphic"
				in2="light"
				operator="arithmetic"
				k1="0.8"
				k2="0.75"
				k3="1.0"
				k4="0"
			/>
		</filter>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<rect
		display="block"
		x={-width / 2}
		y={-height / 2}
		{...{ width, height }}
		fill="url(#hp)"
		filter="url(#lighting)"
	/>
</DrSvg>
