<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { PHI, starPoints } from '@dopplerreflect/geometry';
	const width = 1920;
	const height = 1080;
	const u = height / 6;
</script>

<DrSvg {...{ width, height }}>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="black" />
	<defs>
		<filter id="blur">
			<feGaussianBlur stdDeviation={1} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<g id="drawing" filter="url(#blur)">
		<path d={`M${-width / 2} 0H${width}`} stroke="blue" />
		<circle r={u} cx={-u} stroke-width={1} stroke="blue" fill="none" />
		<circle r={u} cx={u} stroke-width={1} stroke="blue" fill="none" />
		<path d={`M${-u / 2} ${-height / 2}V${height}`} stroke="blue" />
		<path d={`M${u / 2} ${-height / 2}V${height}`} stroke="blue" />
		<circle r={u * 2} stroke="blue" fill="none" />
		<circle r={u * 2} cx={-u} stroke="blue" fill="none" />
		<circle r={u * 2} cx={-u * 2} stroke="blue" fill="none" />
		<circle r={u * 2} cx={u} stroke="blue" fill="none" />
		<circle r={u * 2} cx={u * 2} stroke="blue" fill="none" />
		<path d={`M0 ${-height / 2}V${height}`} stroke="blue" />
		<path d={`M${-u} ${-height / 2}V${height}`} stroke="blue" />
		<path d={`M${u} ${-height / 2}V${height}`} stroke="blue" />
		<path d={`M${-width / 2} ${-u}H${width}`} stroke="blue" />
		<path d={`M${-width / 2} ${u}H${width}`} stroke="blue" />

		<circle r={u} stroke-width={1} stroke="white" fill="none" />

		<circle cx={u / 2} r={(u / 2) * Math.sqrt(5)} stroke="yellow" fill="none" />
		<circle cx={-u / 2} r={(u / 2) * Math.sqrt(5)} stroke="yellow" fill="none" />

		<circle r={u * PHI} stroke="white" fill="none" />

		<circle r={u * PHI ** 2} stroke="white" fill="none" />
		<!--
		<circle cx={-u} r={u * PHI ** 2} stroke="blue" fill="none" />
		<circle cx={u} r={u * PHI ** 2} stroke="blue" fill="none" />
		-->
	</g>
</DrSvg>
