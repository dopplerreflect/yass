import type { GoldenHexCirclePatternColors } from '$lib/types';
import chroma from 'chroma-js';

const themes: Record<string, GoldenHexCirclePatternColors> = {
	A: {
		circle: chroma.oklch(1, 0.37, 90).hex(),
		hex: chroma.oklch(1, 0.2, 150).hex(),
		g0: chroma.oklch(1, 0.1, 90).hex(),
		g1: chroma.oklch(0.8, 0.1, 90).hex(),
		g2: chroma.oklch(0.8, 0.1, 150).hex(),
	},
	B: {
		circle: chroma.oklch(0.25, 0.36, 300).hex(),
		hex: chroma.oklch(1, 0.12, 240).hex(),
		g0: chroma.oklch(1, 0.12, 60).hex(),
		g1: chroma.oklch(1, 0.24, 60).hex(),
		g2: chroma.oklch(1, 0.36, 60).hex(),
	},
};

export default themes;
