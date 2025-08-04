<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		goldenCircles,
		phi,
		radialPoint,
		radialPointString
	} from '@dopplerreflect/geometry';
	const inch = 300;
	const width = 8.5 * inch;
	const height = 8.5 * inch;
	const stroke = (1 / 32) * inch;
	const radii = [...Array(4).keys()].map((k) => height * 0.24 * phi ** k);
	const angles = anglesArray(10);
	const circles = goldenCircles(radii, angles);
	angles.forEach((a) => circles.push({ r: radii[2], ...radialPoint(a, radii[0] + radii[3]) }));
	const center = radialPoint(angles[0], radii[0]);
	const shape0 = [
		`M0 ${-radii[0] - radii[1]}`,
		`A${radii[0]} ${radii[0]} 0 0 1 `,
		radialPointString(angles[2], radii[2], { center: radialPoint(angles[0], radii[0]) }),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[3], radii[3], { center: radialPoint(angles[0], radii[0]) }),
		`A${radii[2]} ${radii[2]} 0 0 1 `,
		radialPointString(angles[7], radii[3], { center: radialPoint(angles[0], radii[0]) }),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[8], radii[2], { center: radialPoint(angles[0], radii[0]) }),
		`A${radii[0]} ${radii[0]} 0 0 1 `,
		`0 ${-radii[0] - radii[1]}`,
		`Z`
	].join('');

	const shape1 = [
		`M${radialPointString(angles[7], radii[3], { center: radialPoint(angles[0], radii[0]) })}`,
		`A${radii[3]}, ${radii[3]} 0 1 1 `,
		radialPointString(angles[3], radii[3], { center: radialPoint(angles[0], radii[0]) })
	].join('');

	const shape2 = [
		`M${radialPointString(angles[6], radii[2], { center: radialPoint(angles[0], radii[0]) })}`,
		angles
			.map(
				(a, i) =>
					`A${radii[2]} ${radii[2]} 0 0 0 ${radialPointString(angles[(i + 4) % angles.length], radii[2], { center: radialPoint(a, radii[0]) })}`
			)
			.join(''),
		'Z'
	].join('');
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<path id="shape0" d={shape0} fill="none" stroke="black" stroke-width={stroke} />
		<path id="shape1" d={shape1} fill="none" stroke="black" stroke-width={stroke} />
	</defs>
	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} fill="none" stroke="#eee" stroke-width={(1 / 64) * inch} />
	{/each}
	<!--
	<g transform={`translate(0 ${-radii[0]})`}>
		{#each angles as a}
			<path d={`M0 0L${radialPointString(a, radii[0])}`} stroke="black" />
		{/each}
	</g>
	-->
	{#each angles as a}
		<use href="#shape0" transform={`rotate(${a - 18})`} />
		<use href="#shape1" transform={`rotate(${a - 18})`} />
	{/each}
	<path d={shape2} fill="none" stroke="black" stroke-width={stroke} />
</DrSvg>
