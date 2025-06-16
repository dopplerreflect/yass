<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import BgGradient from './BgGradient.svelte';
	import Starfield from './Starfield.svelte';
	import Circles from './Circles.svelte';
	import Lines from './Lines.svelte';
	import Dots from './Dots.svelte';
	import { width, height, radii } from './setup';
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<BgGradient />
		<filter id="bigMaskFilter">
			<feGaussianBlur stdDeviation={radii[3]} />
		</filter>
		<mask id="bigMask">
			<circle r={radii[0] * Math.sqrt(3)} fill="white" filter="url(#bigMaskFilter)" />
		</mask>
	</defs>
	<Starfield />
	<g mask="url(#bigMask)">
		<Circles />
		<Lines />
		<Dots />
	</g>
</DrSvg>
