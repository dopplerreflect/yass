<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	const width = 1920;
	const height = 1080;
	const size = 50;
	const r = size / 2;
	const r1 = (Math.hypot(size, size) - size) / 2;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<pattern
			id="sp"
			width={size}
			height={size}
			viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
			patternUnits="userSpaceOnUse"
		>
			<g fill="white">
				<circle {r} />
				<circle r={r1} cx={-size / 2} cy={-size / 2} />
				<circle r={r1} cx={size / 2} cy={-size / 2} />
				<circle r={r1} cx={size / 2} cy={size / 2} />
				<circle r={r1} cx={-size / 2} cy={size / 2} />
			</g>
		</pattern>
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />

	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="url(#sp)" />
</DrSvg>
