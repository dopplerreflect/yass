<script lang="ts">
	import { width, height, scale } from './setup';
</script>

<defs>
	<filter id="realisticStarfield" x="-20%" y="-20%" width="140%" height="140%">
		<!-- lifted from Bence Szabo on codepen.io https://codepen.io/finnhvman/ -->
		<feTurbulence type="fractalNoise" seed="1" baseFrequency={0.003 / scale} numOctaves="4" />
		<feColorMatrix
			values="1 0 0 0 0
	            0 1 0 0 0
	            0 0 1 0 0
	            0 0 0 0.5 -.2"
		/>
		<feColorMatrix
			values="4.0 0.0 0.0 0.0 -.5
	            0.0 0.0 0.0 0.5 -.5
	            0.0 0.0 4.0 0.0 0.0
	            0.0 0.0 0.0 1.0 0"
			result="n"
		/>
		<feTurbulence baseFrequency={0.15 / scale} result="s" />
		<feTurbulence baseFrequency={0.08 / scale} />
		<feBlend in="s" />
		<feColorMatrix
			values="0.9 0.0 0.0 9 -6
	            0.0 0.5 0.0 9 -6
	            0.0 0.0 0.9 9 -6
	            0 0 0 0 1"
		/>
		<feBlend in="n" />
	</filter>
</defs>
<rect filter="url(#realisticStarfield)" x={-width / 2} y={-height / 2} {...{ width, height }} />
