<script>
	import { width, height } from './setup';
	import { brightLines } from './lines';
	import { getDots } from './dots';
	const dots = getDots(brightLines);
</script>

<defs>
	<radialGradient id="dotGradient">
		<stop offset={0} stop-color="white" />
		<stop offset={1} stop-color="white" stop-opacity={0} />
	</radialGradient>
	<mask id="dotMask">
		{#each dots as c}
			<circle cx={c.x} cy={c.y} r={c.r * 1.5} fill="url(#dotGradient)" />
		{/each}
	</mask>
	<g id="dots">
		<rect
			id="dotRect"
			mask="url(#dotMask)"
			x={-width / 2}
			y={-height / 2}
			{...{ width, height }}
			fill="url(#BgGradient)"
		/>
		<filter id="dotBlur">
			<feMorphology operator="dilate" radius={1} />
			<feGaussianBlur stdDeviation={3} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<g filter="url(#dotBlur)">
			{#each dots as c}
				<circle cx={c.x} cy={c.y} r={c.r * 0.33} fill="white" />
			{/each}
		</g>
	</g>
</defs>
<use href="#dots" />
