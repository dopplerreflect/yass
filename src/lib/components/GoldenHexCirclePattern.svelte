<script lang="ts">
	type Props = {
		id: string;
		hexRadius?: number;
		hexStrokeWidth?: number;
		hexStroke?: string;
		circleStrokeWidth?: number;
		circleStroke?: string;
		circleFill?: string;
		circleFillOpacity?: number;
	};

	const {
		id,
		hexRadius = 50,
		hexStrokeWidth = 1,
		hexStroke = 'orange',
		circleStrokeWidth = 1,
		circleStroke = 'white',
		circleFill = 'white',
		circleFillOpacity = 0.1,
	}: Props = $props();
	const hexWidth = hexRadius * Math.sqrt(3);

	const angles = anglesArray(6, 60);
	const radii = [...Array(3).keys()].map((k) => hexWidth * phi ** k);

	const circles: Circle[] = [
		radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) =>
			radii.map((r) => ({
				r,
				...radialPoint(a, hexWidth / 2, { center: radialPoint(a, hexWidth / 2) }),
			})),
		),
		{ r: hexWidth, x: 0, y: -hexRadius * 3 },
		{ r: hexWidth, x: 0, y: hexRadius * 3 },
	].flat();

	import {
		anglesArray,
		phi,
		polygon,
		polygonPointString,
		radialPoint,
		type Circle,
	} from '@dopplerreflect/geometry';
</script>

<pattern
	{id}
	width={hexWidth}
	height={hexRadius * 3}
	viewBox={`${-hexWidth / 2} ${-hexRadius * 1.5} ${hexWidth} ${hexRadius * 3}`}
	patternUnits="userSpaceOnUse"
	patternTransform={`translate(${-hexWidth / 2} ${-hexRadius * 1.5})`}
>
	<g id="filledCircles">
		{#each circles as c}
			<circle r={c.r} cx={c.x} cy={c.y} fill={circleFill} fill-opacity={circleFillOpacity} />
		{/each}
	</g>
	<g id="strokedCircles" filter="url(#shadow)">
		{#each circles as c}
			<circle
				r={c.r}
				cx={c.x}
				cy={c.y}
				stroke={circleStroke}
				stroke-width={circleStrokeWidth}
				fill="none"
			/>
		{/each}
	</g>
	<g id="hexLines" filter="url(#shadow2)">
		<polygon
			points={polygonPointString(polygon(6, hexRadius))}
			stroke={hexStroke}
			stroke-width={hexStrokeWidth}
			fill="none"
		/>
		<path
			d={`M0 ${-hexRadius * 2}v${hexRadius}M0 ${hexRadius}v${hexRadius}`}
			stroke={hexStroke}
			stroke-width={hexStrokeWidth}
		/>
	</g>
	<defs>
		<filter id="shadow">
			<feGaussianBlur result="blur" in="SourceAlpha" stdDeviation={hexStrokeWidth} />
			<feOffset dx={0} dy={hexStrokeWidth * 2} result="blackOffset" />
			<feColorMatrix
				in="blur"
				values="0 0 0 0 1
								0 0 0 0 1
								0 0 0 0 1
								0 0 0 1 0"
				result="white"
			/>
			<feOffset dx={0} dy={hexStrokeWidth * 0} result="whiteOffset" />

			<feMerge>
				<feMergeNode in="whiteOffset" />
				<feMergeNode in="blackOffset" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<filter id="shadow2">
			<feGaussianBlur in="SourceAlpha" stdDeviation={hexStrokeWidth * 2} />
			<feOffset dx={0} dy={hexStrokeWidth * 3} />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
</pattern>
