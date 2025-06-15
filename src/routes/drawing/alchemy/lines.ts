import { radialPoint, type Line, type GeometryOptions } from "@dopplerreflect/geometry";


export function createLines(angles: number[], radii: number[]): Line[] {

	function centerAtRadius0(angle: number): GeometryOptions {
		return { center: radialPoint(angle, radii[0]) };
	}
	
	const lines = [
		// outermost
		...angles.map((a, i) => [
			radialPoint(a, radii[0], centerAtRadius0(a)),
			radialPoint(angles[(i+1) % 6], radii[0], centerAtRadius0(angles[(i+1) % 6]))
		] as Line),
		// 2nd hex
		...angles.map((a, i) => [
			radialPoint(a, radii[1], centerAtRadius0(a)),
			radialPoint(angles[(i+1) % 6], radii[1], centerAtRadius0(angles[(i+1) % 6]))
		] as Line),
		// 3rd hex
		...angles.map((a, i) => [
			radialPoint(a, radii[2], centerAtRadius0(a)),
			radialPoint(angles[(i+1) % 6], radii[2], centerAtRadius0(angles[(i+1) % 6]))
		] as Line),
		// 4th hex
		...angles.map((a, i) => [
			radialPoint(a, radii[3], centerAtRadius0(a)),
			radialPoint(angles[(i+1) % 6], radii[3], centerAtRadius0(angles[(i+1) % 6]))
		] as Line),
		// from outer vesica
		...angles.map((a, i) => [
			radialPoint(angles[(i + 5) % 6], radii[0], centerAtRadius0(a)),
			radialPoint(angles[(i + 2) % 6], radii[0], centerAtRadius0(angles[(i + 1) % 6]))
		] as Line),
		// innermost hex
		...angles.map((a, i) => [
			radialPoint(a, radii[3]),
			radialPoint(angles[(i + 1) % 6], radii[3])
		] as Line),
		// 5th hex
		...angles.map((a, i) => [
			radialPoint(a, radii[0] - radii[3]),
			radialPoint(angles[(i + 1) % 6], radii[0] - radii[3])
		] as Line),
		// line from 2nd hex
		...angles.map((a, i) => [
			radialPoint(angles[(i + 0) % 6], radii[1], centerAtRadius0(angles[(i + 5) % 6])),
			radialPoint(angles[(i + 1) % 6], radii[1], centerAtRadius0(angles[(i + 2) % 6]))
		] as Line),
		// line from 3rd hex
		...angles.map((a, i) => [
			radialPoint(angles[(i + 0) % 6], radii[2], centerAtRadius0(angles[(i + 5) % 6])),
			radialPoint(angles[(i + 1) % 6], radii[2], centerAtRadius0(angles[(i + 2) % 6]))
		] as Line),
		// center to outside
		...angles.map((a) => [{x: 0, y: 0}, radialPoint(a, radii[0], centerAtRadius0(a))] as Line),
	];

	return lines;
}
