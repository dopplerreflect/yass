<svelte:options namespace="svg" />

<script lang="ts">
	import { anglesArray, radialPoint, type Circle } from '@dopplerreflect/geometry';

	const SQRT3 = Math.sqrt(3);

	type Props = {
		id: string;
		size: number;
		stroke?: string;
		strokeWidth?: number;
	};
	const { id, size, stroke = 'white', strokeWidth = 1 }: Props = $props();

	const psize = size * 3;

	const r = size * SQRT3;
	const angles = anglesArray(6);
	const center = { x: psize / 2, y: psize / 2 / SQRT3 };
	const circles: Circle[] = [
		{ r, ...center },
		...angles.map((a) => ({ r, ...radialPoint(a, r, { center: center }) })),
		{ r, x: psize * 1.5, y: psize / 2 / SQRT3 },
		{ r, x: -psize / 2, y: psize / 2 / SQRT3 },
	];
</script>

<pattern {id} width={psize} height={psize / SQRT3} patternUnits="userSpaceOnUse">
	{#each circles as c}
		<circle cx={c.x} cy={c.y} r={c.r} {stroke} stroke-width={strokeWidth} fill="none" />
	{/each}
</pattern>
