<svelte:options namespace="svg" />

<script lang="ts">
	import { anglesArray, radialPoint, radialPointString } from '@dopplerreflect/geometry';

	type Props = {
		id: string;
		r: number;
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		fillFilter?: string;
		strokeFilter?: string;
	};

	let {
		id,
		r,
		fill = 'none',
		stroke = 'none',
		strokeWidth = 1,
		fillFilter = '',
		strokeFilter = '',
	}: Props = $props();

	const width = $derived(r * Math.sqrt(3));
	const height = $derived(r * 3);
	const x = $derived(-width / 2);
	const y = $derived(-r * 1.5);

	const hexPoints = anglesArray(6, 30)
		.map((a) => radialPointString(a, r))
		.join(' ');
</script>

<pattern
	{...{ id, width, height }}
	viewBox={[x, y, width, height].join(' ')}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${x} ${y})`}
>
	<defs>
		<path
			id={`${id}-hex`}
			d={`M0 ${y} 0 ${-r}ZM0 ${r} 0 ${r * 1.5}ZM${hexPoints}Z`}
			fill="none"
			{stroke}
			stroke-width={strokeWidth}
		/>
		<path id={`${id}-fill`} d={`M${hexPoints}Z`} {fill} filter={fillFilter} />
		<g id={`${id}-fillg`}>
			<use href={`#${id}-fill`} />
			{#each [60, 120, 240, 300].map((a) => radialPointString(a, r * Math.sqrt(3))) as t}
				<use href={`#${id}-fill`} transform={`translate(${t})`} />
			{/each}
		</g>
		<g id={`${id}-cg`} {stroke} filter={strokeFilter}>
			<circle r={r * Math.sqrt(3)} fill="none" />
			<circle r={r * Math.sqrt(3)} cy={-r * 3} fill="none" />
			<circle r={r * Math.sqrt(3)} cy={r * 3} fill="none" />
			{#each anglesArray(6, 0).map( (a) => ({ r: r * Math.sqrt(3), ...radialPoint(a, r * Math.sqrt(3)) }), ) as c, i}
				<circle cx={c.x} cy={c.y} r={c.r} fill="none" />
			{/each}
		</g>
	</defs>
	<use href={`#${id}-fillg`} />
	<use display="none" href={`#${id}-hex`} />
	<use href={`#${id}-cg`} />
</pattern>
