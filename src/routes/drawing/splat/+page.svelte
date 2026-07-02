<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		phi,
		radialPoint,
		radialPointString,
		type Circle,
	} from '@dopplerreflect/geometry';
	const width = 1080;
	const height = 1080;
	const r = height / 4;
	const radii = [...Array(4).keys()].map((i) => r * phi ** i);
	radii.splice(1, 0, radii[1] + radii[3] * phi);

	const angles = anglesArray(6);

	const circles: Circle[] = [
		...radii.map((r) => ({ x: 0, y: 0, r })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) }))).flat(),
	];

	const path0: string = [
		`${radii
			.slice(0, 2)
			.map((r) => `M${radialPointString(0, r)}A${r} ${r} 0 1 1 ${radialPointString(359, r)}Z`)
			.join('')}`,
		...angles.map(
			(a) =>
				`${radii
					.slice(0, 2)
					.map(
						(r) =>
							`M${radialPointString(0, r, { center: radialPoint(a, radii[0]) })}A${r} ${r} 0 1 1 ${radialPointString(359, r, { center: radialPoint(a, radii[0]) })}Z`,
					)
					.join('')}`,
		),
	].join('');

	const path1: string = [
		`${radii
			.slice(2, 4)
			.map((r) => `M${radialPointString(0, r)}A${r} ${r} 0 1 1 ${radialPointString(359, r)}Z`)
			.join('')}`,
		...angles.map(
			(a) =>
				`${radii
					.slice(2, 4)
					.map(
						(r) =>
							`M${radialPointString(0, r, { center: radialPoint(a, radii[0]) })}A${r} ${r} 0 1 1 ${radialPointString(359, r, { center: radialPoint(a, radii[0]) })}Z`,
					)
					.join('')}`,
		),
	].join('');
</script>

<DrSvg {...{ width, height }}>
	<path d={`M${-width / 2} ${-height / 2}H${width}V${height}H${-width}Z`} fill="black" />
	{#each circles as c}
		<circle cx={c.x} cy={c.y} r={c.r} stroke="white" fill="none" />
	{/each}

	<path d={path0} stroke="none" fill="red" fill-rule="evenodd" />
	<path d={path1} stroke="none" fill="white" fill-rule="evenodd" />
	<!--
	<path
		d="M270 0A270 270 0 1 1 269.95887769222566 -4.712149738066677ZM166.8691769624716 0A166.8691769624716 166.8691769624716 0 1 1 166.8437619785712 -2.9122686982041204Z"
		stroke="red"
		fill="white"
		fill-rule="evenodd"
	/>
	-->
</DrSvg>
