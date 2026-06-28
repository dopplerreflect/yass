<script lang="ts">
	import chroma from 'chroma-js';
	import { width, height, scale } from './setup';
	import { brightLines } from './lines';
	import { getDots } from './dots';
	import { Delaunay } from 'd3-delaunay';

	const dots = getDots(brightLines);

	const delaunay = Delaunay.from(dots.map((d) => [d.x, d.y]));
	const voronoi = delaunay.voronoi([-width / 2, -height / 2, width, height]);
	const voronoiPath = voronoi.render();
	console.log(voronoiPath);
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
	<mask id="voronoiMask">
		<path d={voronoiPath} stroke="white" fill="none" stroke-width={1} filter="url(#dotBlur)" />
	</mask>
	}
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
			<feMorphology operator="dilate" radius={1 * scale} />
			<feGaussianBlur stdDeviation={3 * scale} />
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
<rect
	id="voronoiRect"
	mask="url(#voronoiMask)"
	fill="url(#BgGradient)"
	x={-width / 2}
	y={-height / 2}
	{...{ width, height }}
/>
