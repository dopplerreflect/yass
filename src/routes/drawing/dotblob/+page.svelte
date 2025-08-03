<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import { anglesArray, PHI, phi, radialPointString } from '@dopplerreflect/geometry';
	const width = 1920;
	const height = 1080;
	const r = (height / 2) * 0.8 * phi;
	const angles = anglesArray(240);
	const dotDefs = [
		[3, Math.sqrt(3)],
		[5, 1.176],
		[8, 0.766]
	];
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<g id="dotblob" transform="rotate(-90)">
			{#each dotDefs as dotDef}
				{@const [count, widthFactor] = dotDef}
				<circle
					{r}
					fill="none"
					stroke="white"
					stroke-dasharray={`0 ${(Math.PI * 2 * r) / count}`}
					stroke-linecap="round"
					stroke-width={r * widthFactor}
				/>
			{/each}
		</g>
		<mask id="dotblob-mask">
			<use href="#dotblob" />
		</mask>
	</defs>
	<path d={`M${-width / 2} ${-height / 2}H${width}V${height}H${-width}Z`} fill="black" />
	<g mask="url(#dotblob-mask)">
		{#each angles as a}
			<path d={`M0 0L${radialPointString(a, r + (r * Math.sqrt(3)) / 2)}`} stroke="white" />
		{/each}
	</g>
	<use href="#dotblob" stroke-opacity={0.5} />
</DrSvg>
