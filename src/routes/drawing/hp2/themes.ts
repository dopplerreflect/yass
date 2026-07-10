import type { GoldenHexCirclePatternTheme } from '$lib/types';
import chroma from 'chroma-js';

const themes: Record<string, GoldenHexCirclePatternTheme> = {
	a: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 90, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 90, 0.5).hex(),
		g2: chroma.oklch(1, 0.37, 90).hex(),
		g1: chroma.oklch(0.7, 0.37, 120).hex(),
		g0: chroma.oklch(0.4, 0.37, 150).hex(),
		lighting: chroma.oklch(0.7, 0.37, 120).hex(),
		diffuseConstant: 1.0,
	},
	b: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 90, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 90, 0.5).hex(),
		g0: chroma.oklch(0.72, 0.37, 150).hex(),
		g1: chroma.oklch(0.72, 0.37, 210).hex(),
		g2: chroma.oklch(0.72, 0.37, 270).hex(),
		lighting: chroma.oklch(0.72, 0.37, 210).hex(),
		diffuseConstant: 1.0,
	},
	c: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 180, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 180, 0.5).hex(),
		g0: chroma.oklch(0.1, 0.37, 300).hex(),
		g1: chroma.oklch(0.5, 0.37, 300).hex(),
		g2: chroma.oklch(0.9, 0.37, 300).hex(),
		lighting: chroma.oklch(0.5, 0.37, 300).hex(),
		diffuseConstant: 1.0,
	},
	d: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 180, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 180, 0.5).hex(),
		g0: chroma.oklch(0.5, 0.37, 90).hex(),
		g1: chroma.oklch(0.75, 0.37, 90).hex(),
		g2: chroma.oklch(1.0, 0.37, 90).hex(),
		lighting: chroma.oklch(0.75, 0.37, 90).hex(),
		diffuseConstant: 1.0,
	},
	e: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: [
			chroma.oklch(0.3, 0.1, 300).hex(),
			chroma.oklch(0.26, 0.1, 300).hex(),
			chroma.oklch(0.23, 0.1, 300).hex(),
			chroma.oklch(0.2, 0.1, 300).hex(),
		],
		hex: chroma.oklch(0.3, 0.1, 270).hex(),
		g0: chroma.oklch(0.25, 0.0925, 270).hex(),
		g1: chroma.oklch(0.75, 0.0925, 180).hex(),
		g2: chroma.oklch(1.0, 0.37, 90).hex(),
		lighting: chroma.oklch(0.75, 0.37, 180).hex(),
		diffuseConstant: 1.5,
	},
};

export default themes;
240;
