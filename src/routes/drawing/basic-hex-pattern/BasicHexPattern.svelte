<svelte:options namespace="svg" />

<script lang="ts">
	import { anglesArray, radialPointString } from '@dopplerreflect/geometry';

	type Props = {
		id: string;
		r: number;
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		filter?: string;
	};

	let { id, r, fill = 'none', stroke = 'none', strokeWidth = 1, filter = '' }: Props = $props();

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
			id={`${id}-path`}
			d={`M0 ${y} 0 ${-r}ZM0 ${r} 0 ${r * 1.5}ZM${hexPoints}Z`}
			fill="none"
			{stroke}
			stroke-width={strokeWidth}
		/>
		<path id={`${id}-fill`} d={`M${hexPoints}Z`} {...{ fill, filter }} />
	</defs>
	<use href={`#${id}-fill`} />
	<use href={`#${id}-fill`} transform={`translate(${-width / 2} ${-r * 1.5})`} />
	<use href={`#${id}-fill`} transform={`translate(${width / 2} ${-r * 1.5})`} />
	<use href={`#${id}-fill`} transform={`translate(${-width / 2} ${r * 1.5})`} />
	<use href={`#${id}-fill`} transform={`translate(${width / 2} ${r * 1.5})`} />
	<use href={`#${id}-path`} />
</pattern>
