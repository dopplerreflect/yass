<script>
	//@ts-ignore
	import { oklch } from 'chroma-js';
	import { width, height, circles } from './setup';
</script>

<defs>
	<g id="circles">
		{#each circles as c}
			<circle r={c.r} cx={c.x} cy={c.y} fill="none" />
		{/each}
	</g>
	<mask id="circleMask">
		<g stroke="white" stroke-width={1.5}>
			<use href="#circles" />
		</g>
	</mask>
	<filter id="circleBlur">
		<feMorphology operator="dilate" radius={3} />
		<feGaussianBlur stdDeviation={21} />
	</filter>
	<g id="circleGlow" filter="url(#circleBlur)">
		<rect
			mask="url(#circleMask)"
			x={-width / 2}
			y={-height / 2}
			{...{ width, height }}
			fill="url(#BgGradient)"
		/>
	</g>
</defs>
<use href="#circleGlow" />
<g stroke={oklch(0.95, 0.11, 300).alpha(0.5).hex()} stroke-width={1.5}>
	<use href="#circles" />
</g>
