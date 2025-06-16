<script>
	//@ts-ignore
	import { oklch } from 'chroma-js';
	import { width, height } from './setup';
	const colors = [...Array(8).keys()].map((i) => oklch(1 - (1 / 8) * i, 0.37, (360 / 8) * i).hex());
</script>

<radialGradient
	id="BgGradient"
	cx={0}
	cy={0}
	r={Math.hypot(width / 2, height / 2) / 2}
	gradientUnits="userSpaceOnUse"
>
	{#each colors as c, i}
		<stop offset={(1 / (colors.length - 1)) * i} stop-color={c} />
	{/each}
</radialGradient>
