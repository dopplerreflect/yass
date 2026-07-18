<svelte:options namespace="svg" />

<script lang="ts">
	type Props = {
		id?: string;
		unit?: number;
		erode?: number;
		rotate?: number;
		colors?: [string, string, string];
	};

	let {
		id = 'SnubSquareTilingPattern',
		unit = 100,
		erode = 100 / 12,
		rotate = 0,
		colors = ['red', 'white', 'blue'],
	}: Props = $props();

	import { pointToString, radialPoint, type Point } from '@dopplerreflect/geometry';

	let d = $derived.by(() => {
		let unitb = unit * Math.sqrt(3) - unit;
		let vb = [-unit * Math.sqrt(3), -unit - unitb, unit * Math.sqrt(3) * 2, (unit + unitb) * 2];
		let cl = unitb * Math.sqrt(3);

		let base = {
			p0: { x: 0, y: -cl / 2 },
			p1: { x: 0, y: cl / 2 },
			p2: radialPoint(30, cl, { center: { x: 0, y: -cl / 2 } }),
			p3: radialPoint(150, cl, { center: { x: 0, y: -cl / 2 } }),
		};
		let o = {
			...base,
			p4: radialPoint(240, cl, { center: base.p0 }),
			p5: radialPoint(300, cl, { center: base.p0 }),
			p6: radialPoint(300, cl, { center: base.p2 }),
			p7: radialPoint(60, cl, { center: base.p2 }),
			p8: radialPoint(60, cl, { center: base.p1 }),
			p9: radialPoint(120, cl, { center: base.p1 }),
			p10: radialPoint(120, cl, { center: base.p3 }),
			p11: radialPoint(240, cl, { center: base.p3 }),
		};
		let p = {
			...o,
			p12: radialPoint(270, cl, { center: o.p11 }),
			p13: radialPoint(270, cl, { center: o.p6 }),
			p14: radialPoint(0, cl, { center: base.p2 }),
			p15: radialPoint(90, cl, { center: o.p7 }),
			p16: radialPoint(90, cl, { center: o.p10 }),
			p17: radialPoint(180, cl, { center: base.p3 }),
		};
		let s = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, pointToString(v)])) as Record<
			keyof typeof p,
			string
		>;

		let guidePoints: [string, Point][] = Object.entries(p).map(([k, v]) => [k, v]);

		let ppath = [
			`M${s.p0}`,
			s.p1,
			s.p2,
			s.p0,
			s.p3,
			s.p1,
			'M',
			s.p4,
			s.p0,
			s.p5,
			s.p6,
			s.p2,
			s.p7,
			s.p8,
			s.p1,
			s.p9,
			s.p10,
			s.p3,
			s.p11,
			s.p4,
			'M',
			s.p2,
			pointToString(radialPoint(0, cl, { center: p.p2 })),
			'M',
			s.p3,
			pointToString(radialPoint(180, cl, { center: p.p3 })),
		].join(' ');
		let qpath = [
			`M${s.p4}`,
			s.p5,
			`M${s.p6}`,
			pointToString(radialPoint(270, cl / 2, { center: p.p6 })),
			`M${s.p7}`,
			pointToString(radialPoint(90, cl / 2, { center: p.p7 })),
			`M${s.p10}`,
			pointToString(radialPoint(90, cl / 2, { center: p.p10 })),
			`M${s.p11}`,
			pointToString(radialPoint(270, cl / 2, { center: p.p11 })),
		].join(' ');

		const ppaths: string[] = [
			`M${s.p0} ${s.p3} ${s.p11} ${s.p4}Z`,
			`M${s.p0} ${s.p2} ${s.p6} ${s.p5}Z`,
			`M${s.p1} ${s.p2} ${s.p7} ${s.p8}Z`,
			`M${s.p1} ${s.p3} ${s.p10} ${s.p9}Z`,
			`M${s.p0} ${s.p1} ${s.p2}Z`,
			`M${s.p0} ${s.p1} ${s.p3}Z`,
			`M${s.p4} ${s.p11} ${s.p12}Z`,
			`M${s.p5} ${s.p6} ${s.p13}Z`,
			`M${s.p8} ${s.p7} ${s.p15}Z`,
			`M${s.p9} ${s.p10} ${s.p16}Z`,
			`M${s.p0} ${s.p4} ${s.p5}Z`,
			`M${s.p1} ${s.p8} ${s.p9}Z`,
			`M${s.p3} ${s.p11} ${s.p17}Z`,
			`M${s.p2} ${s.p6} ${s.p14}Z`,
			`M${s.p2} ${s.p7} ${s.p14}Z`,
			`M${s.p3} ${s.p10} ${s.p17}Z`,
		];
		return { unitb, vb, cl, guidePoints, ppaths, ppath, qpath };
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
		<rect id="guideRect" x={d.vb[0]} y={d.vb[1]} width={d.vb[2]} height={d.vb[3]} />
		<g id="guidePoints">
			{#each d.guidePoints as [i, p]}
				<circle cx={p.x} cy={p.y} r={3} fill="yellow" />
				<text x={p.x} y={p.y} fill="yellow">{i}</text>
			{/each}
		</g>
		<g id="ppaths">
			{#each d.ppaths.slice(0, 4) as p}
				<path d={p} fill={colors[0]} filter="url(#shrink)" />
			{/each}
			{#each d.ppaths.slice(4, 10) as p}
				<path d={p} fill={colors[1]} filter="url(#shrink)" />
			{/each}
			{#each d.ppaths.slice(10, 16) as p}
				<path d={p} fill={colors[2]} filter="url(#shrink)" />
			{/each}
		</g>
		<filter id="shrink">
			<feMorphology operator="erode" radius={erode} />
		</filter>
	</defs>
	<use href="#ppaths" />
</pattern>
