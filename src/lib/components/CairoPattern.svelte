<svelte:options namespace="svg" />

<script lang="ts">
	type Props = {
		id?: string;
		unit?: number;
		hue?: number;
		lightness?: number;
		rotate?: number;
		azimuth?: number;
	};

	let {
		id = 'CairoPattern',
		unit = 100,
		hue = 300,
		lightness = 0.5,
		rotate = 0,
		azimuth = -90,
	}: Props = $props();

	import { pointToString, radialPoint, type Point } from '@dopplerreflect/geometry';
	import chroma from 'chroma-js';
	const oklch = chroma.oklch;

	let d = $derived.by(() => {
		let unitb = unit * Math.sqrt(3) - unit;
		let vb = [-unit * Math.sqrt(3), -unit - unitb, unit * Math.sqrt(3) * 2, (unit + unitb) * 2];

		const a = { x: -unitb / 2, y: 0 };
		const b = { x: unitb / 2, y: 0 };
		const c = radialPoint(300, unit, { center: b });
		const d = radialPoint(210, unit, { center: c });
		const e = radialPoint(240, unit, { center: a });
		const f = radialPoint(120, unit, { center: a });
		const g = radialPoint(30, unit, { center: f });
		const h = radialPoint(60, unit, { center: b });
		const i = radialPoint(330, unit, { center: h });
		const j = radialPoint(30, unit, { center: c });
		const k = radialPoint(150, unit, { center: e });
		const l = radialPoint(210, unit, { center: f });
		const p = {
			a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
		};

		let s = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, pointToString(v)])) as Record<
			keyof typeof p,
			string
		>;

		const paths = [
			`M${s.a} ${s.b} ${s.c} ${s.d} ${s.e}Z`,
			`M${s.a} ${s.f} ${s.g} ${s.h} ${s.b}Z`,
			`M${s.a} ${s.e} ${s.k} ${s.l} ${s.f}Z`,
			`M${s.b} ${s.c} ${s.j} ${s.i} ${s.h}Z`,
		];
		let guidePoints: [string, Point][] = Object.entries(p).map(([k, v]) => [k, v]);
		return { unitb, vb, guidePoints, paths };
	});
</script>

<pattern
	{id}
	width={unit * Math.sqrt(3) * 2}
	height={(unit + d.unitb) * 2}
	viewBox={`${d.vb.join(' ')}`}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${-d.vb[0]} ${-d.vb[1]}) rotate(${rotate})`}
>
	<defs>
		<linearGradient id={`${id}-lg0`} x1="50%" y1="100%" x2="50%" y2="0%">
			<stop offset={0} stop-color={oklch(lightness, 0.37, hue).hex()} />
			<stop offset={1} stop-color={oklch(0.5, 0.185, hue, 0.5).hex()} />
		</linearGradient>
		<linearGradient id={`${id}-lg1`} x1="50%" y1="0%" x2="50%" y2="100%">
			<stop offset={0} stop-color={oklch(lightness, 0.37, hue).hex()} />
			<stop offset={1} stop-color={oklch(0.5, 0.185, hue, 0.5).hex()} />
		</linearGradient>
		<linearGradient id={`${id}-lg2`}>
			<stop offset={0} stop-color={oklch(0.5, 0.185, hue, 0.5).hex()} />
			<stop offset={1} stop-color={oklch(lightness, 0.37, hue).hex()} />
		</linearGradient>
		<linearGradient id={`${id}-lg3`} x1="100%" y1="50%" x2="0%" y2="50%">
			<stop offset={0} stop-color={oklch(0.5, 0.185, hue, 0.5).hex()} />
			<stop offset={1} stop-color={oklch(lightness, 0.37, hue).hex()} />
		</linearGradient>
		<g id={`${id}-guide`}>
			<rect x={d.vb[0]} y={d.vb[1]} width={d.vb[2]} height={d.vb[3]} fill="none" />
			{#each d.guidePoints as [i, p]}
				<text x={p.x} y={p.y} stroke="none">{i}</text>
			{/each}
		</g>
		<g id={`${id}-paths`}>
			{#each d.paths as path, i}
				<path d={path} fill={`url(#${id}-lg${i})`} />
			{/each}
		</g>
	</defs>
	<use display="none" href={`#${id}-paths`} stroke="white" fill="none" />
	<use display="none" href={`#${id}-paths`} stroke="white" fill="none" transform="rotate(90)" />
	<use display="block" href={`#${id}-paths`} stroke="none" fill={`url(#${id}-lg0)`} />
	<use
		display="block"
		href={`#${id}-paths`}
		stroke="none"
		transform={`translate(${-unit * Math.sqrt(3)} ${-unit - d.unitb})`}
	/>
	<use
		display="block"
		href={`#${id}-paths`}
		stroke="none"
		fill="none"
		transform={`translate(${unit * Math.sqrt(3)} ${-unit - d.unitb})`}
	/>
	<use
		display="block"
		href={`#${id}-paths`}
		stroke="none"
		fill="none"
		transform={`translate(${-unit * Math.sqrt(3)} ${unit + d.unitb})`}
	/>
	<use
		display="block"
		href={`#${id}-paths`}
		stroke="none"
		fill="none"
		transform={`translate(${unit * Math.sqrt(3)} ${unit + d.unitb})`}
	/>
</pattern>
