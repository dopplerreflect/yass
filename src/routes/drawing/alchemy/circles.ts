import { PHI, radialPoint, type Circle } from "@dopplerreflect/geometry";

export function getCircles(radii: number[], angles: number[]): Circle[] {
	return [
		{ r: radii[0] * Math.sqrt(3), x: 0, y: 0 },
		{ r: radii[0] * PHI, x: 0, y: 0 },
		...radii.map((r) => ({ r, x: 0, y: 0 })),
		...angles.map((a) => radii.map((r) => ({ r, ...radialPoint(a, radii[0]) })))
	].flat();
}
