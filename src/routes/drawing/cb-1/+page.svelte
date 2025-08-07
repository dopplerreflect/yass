<script lang="ts">
	import DrSvg from '$lib/components/DrSvg.svelte';
	import {
		anglesArray,
		goldenCircles,
		phi,
		radialPoint,
		radialPointString,
	} from '@dopplerreflect/geometry';
	const inch = 300;
	const width = 8.5 * inch;
	const height = 8.5 * inch;
	const stroke = (1 / 32) * inch;
	const radii = [...Array(4).keys()].map((k) => height * 0.24 * phi ** k);
	const angles = anglesArray(10);
	const angles60 = anglesArray(60);
	const angles240 = anglesArray(240);

	const commonPoint = { center: radialPoint(angles[0], radii[0]) };
	const circles = goldenCircles(radii, angles);
	angles.forEach((a) => circles.push({ r: radii[2], ...radialPoint(a, radii[0] + radii[3]) }));
	const shape0 = [
		`M0 ${-radii[0] - radii[1]}`,
		`A${radii[0]} ${radii[0]} 0 0 1 `,
		radialPointString(angles[2], radii[2], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[3], radii[3], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 1 `,
		radialPointString(angles[7], radii[3], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[8], radii[2], commonPoint),
		`A${radii[0]} ${radii[0]} 0 0 1 `,
		`0 ${-radii[0] - radii[1]}`,
		`Z`,
	].join('');

	const shape1 = [
		`M${radialPointString(angles[7], radii[3], commonPoint)}`,
		`A${radii[3]}, ${radii[3]} 0 1 1 `,
		radialPointString(angles[3], radii[3], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 1 `,
		radialPointString(angles[7], radii[3], commonPoint),
		'Z',
	].join('');

	const shape2 = [
		`M${radialPointString(angles[6], radii[2], commonPoint)}`,
		...angles.map(
			(a, i) =>
				`A${radii[2]} ${radii[2]} 0 0 0 ${radialPointString(angles[(i + 4) % 10], radii[2], { center: radialPoint(a, radii[0]) })}`,
		),
		'Z',
		`M${radialPointString(angles[6] - 24, radii[1], commonPoint)}`,
		...angles.map(
			(a, i) =>
				`A${radii[1]} ${radii[1]} 0 0 0 ${radialPointString(angles[(i + 4) % 10] + 24, radii[1], { center: radialPoint(a, radii[0]) })}`,
		),
		'Z',
	].join('');

	const shape3 = [
		`M${radialPointString(angles[8], radii[2], commonPoint)}`,
		`A${radii[2]} ${radii[2]} 0 0 1 `,
		radialPointString(angles[2], radii[2], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[3], radii[3], commonPoint),
		`A${radii[3]} ${radii[3]} 0 1 0 `,
		radialPointString(angles[7], radii[3], commonPoint),
		`A${radii[2]} ${radii[2]} 0 0 0 `,
		radialPointString(angles[8], radii[2], commonPoint),
		'Z',
	].join('');
</script>

<DrSvg {...{ width, height }}>
	<defs>
		<path id="shape0" d={shape0} fill="none" stroke="black" stroke-width={stroke} />
		<path id="shape1" d={shape1} fill="white" stroke="black" stroke-width={stroke} />
		<g id="shape1-10">
			{#each angles as a}
				<use href="#shape1" transform={`rotate(${a - 18})`} />
			{/each}
		</g>
		<mask id="mask1-10">
			<use href="#shape1-10" />
		</mask>

		<path id="shape3" d={shape3} fill="white" />
		<mask id="shape3-mask">
			<use href="#shape3" />
		</mask>
		<g id="shape3-rays" mask="url(#shape3-mask)">
			{#each angles60 as a}
				<path
					d={`M${radialPointString(angles[0], radii[0])}L${radialPointString(a, radii[2], commonPoint)}`}
					stroke="black"
				/>
			{/each}
		</g>
	</defs>

	<rect x={-width / 2} y={-height / 2} {...{ width, height }} fill="white" />
	{#each circles as c}
		<circle r={c.r} cx={c.x} cy={c.y} fill="none" stroke="#F99" stroke-width={(1 / 64) * inch} />
	{/each}
	<use href="#shape1-10" />
	{#each angles240 as a}
		<path
			d={`M0 0L${radialPointString(a, radii[0] * 2)}`}
			stroke="black"
			stroke-width={2}
			mask="url(#mask1-10)"
		/>
	{/each}
	{#each angles as a}
		<use href="#shape0" transform={`rotate(${a - 18})`} style="display:inline;" />
		<g transform={`rotate(${a - 18})`}>
			<use href="#shape3" stroke="black" stroke-width={stroke} />
			<use href="#shape3-rays" />
		</g>
	{/each}
	<path d={shape2} stroke="black" stroke-width={stroke} fill="none" />
</DrSvg>
