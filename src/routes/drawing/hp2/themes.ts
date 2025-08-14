import type { GoldenHexCirclePatternTheme } from '$lib/types';
import chroma from 'chroma-js';

const themes: Record<string, GoldenHexCirclePatternTheme> = {
	a: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 90, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 90, 0.5).hex(),
		g0: chroma.oklch(1, 0.1, 90).hex(),
		g1: chroma.oklch(0.9, 0.1, 90).hex(),
		g2: chroma.oklch(0.8, 0.1, 90).hex(),
	},
	b: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 300, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 300, 0.5).hex(),
		g0: chroma.oklch(1, 0.1, 300).hex(),
		g1: chroma.oklch(0.9, 0.1, 300).hex(),
		g2: chroma.oklch(0.8, 0.1, 300).hex(),
	},
	c: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: chroma.oklch(0.85, 0.1, 180, 0.5).hex(),
		hex: chroma.oklch(1, 0.37, 180, 0.5).hex(),
		g0: chroma.oklch(1, 0.1, 180).hex(),
		g1: chroma.oklch(0.9, 0.1, 180).hex(),
		g2: chroma.oklch(0.8, 0.1, 180).hex(),
	},
	d: {
		hexStrokeWidth: 1,
		circleStrokeWidth: 1,
		circle: [
			chroma.oklch(1, 0.36, 90).hex(),
			chroma.oklch(0.75, 0.36, 90).hex(),
			chroma.oklch(0.5, 0.36, 90).hex(),
			chroma.oklch(0.25, 0.36, 90).hex(),
		],
		hex: chroma.oklch(1, 0.37, 240).hex(),
		g0: chroma.oklch(1, 0.12, 60).hex(),
		g1: chroma.oklch(1, 0.24, 60).hex(),
		g2: chroma.oklch(1, 0.36, 60).hex(),
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
		g0: chroma.oklch(0.1, 0.05, 270).hex(),
		g1: chroma.oklch(0.2, 0.05, 270).hex(),
		g2: chroma.oklch(0.3, 0.05, 270).hex(),
	},
};

export default themes;
240;
