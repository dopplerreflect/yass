<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, phi, radialPointString } from '@dopplerreflect/geometry';
	const width = 1800;
	const height = 1800;
	const r = height / 2;
	const radii = [...Array(3).keys()].map((i) => r * phi ** i);
	const angles = anglesArray(20);
	const splatPath =
		'M' +
		angles.map((a, i) => radialPointString(a, i % 2 === 0 ? radii[0] : radii[1])).join('Q0 0 ') +
		`Q0 0 ${radialPointString(angles[0], radii[0])}Z`;
</script>

<DrSvg {...{ width, height }}>
	<path d={`M${-width / 2} ${-height / 2}H${width}V${height}H${-width}Z`} fill="black" />
	<g stroke="yellow" stroke-width={2} fill="white">
		<path d={splatPath} />
	</g>
</DrSvg>
