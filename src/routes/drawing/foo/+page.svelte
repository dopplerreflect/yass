<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { PHI, phi } from '@dopplerreflect/geometry';
	const width = 1920;
	const height = 1080;
	const r = (height / 2) * 0.8;
	const [r0, r1, r2] = [...Array(3).keys()].map((k) => r * phi ** k);
	const r3 = (r0 - r1) / 2 + r1;
	const r4 = r3 - r1;
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<filter id="a">
			<feTurbulence baseFrequency="0.001 1" numOctaves={4} seed={2} type="fractalNoise" />
			<feColorMatrix
				values="0 0 0 0  0
							  0 0 0 0  0.75
							  0 0 0 0  1
							  0 0 0 1  0"
			/>
			<feComposite operator="in" in2="SourceAlpha" />
			<feGaussianBlur stdDeviation={8} />
		</filter>
	</defs>
	<path d={`M${-width / 2} ${-height / 2}H${width}V${height}H${-width}Z`} fill="black" />
	<g transform="rotate(-90)">
		<path
			d={`M${r0} 0A${r0} ${r0} 0 1 1 ${r0} -0.1ZM${r1} 0A${r1} ${r1} 0 1 1 ${r1} -0.1ZM${r2} 0A${r2} ${r2} 0 1 1 ${r2} -0.1Z`}
			filter="url(#a)"
			fill-rule="evenodd"
			style="display:none"
		/>
		<circle
			r={r1}
			fill="none"
			stroke="white"
			stroke-dasharray={`0 ${(Math.PI * 2 * r1) / 3}`}
			stroke-linecap="round"
			stroke-width={r1 * Math.sqrt(3)}
			stroke-opacity={0.5}
		/>
		<circle
			r={r1}
			fill="none"
			stroke="white"
			stroke-dasharray={`0 ${(Math.PI * 2 * r1) / 5}`}
			stroke-linecap="round"
			stroke-width={r1 * 1.176}
			stroke-opacity={0.5}
		/>
		<circle
			r={r1}
			stroke="white"
			fill="none"
			stroke-width={r1 * 0.766}
			stroke-opacity={0.5}
			stroke-dasharray={`0 ${(Math.PI * 2 * r1) / 8}`}
			stroke-linecap="round"
		/>
		<circle
			r={r1}
			fill="none"
			stroke="white"
			stroke-dasharray={`0 ${(Math.PI * 2 * r1) / 13}`}
			stroke-linecap="round"
			stroke-width={r1 * 0.479}
			stroke-opacity={0.5}
		/>
	</g>
</DrSvg>
