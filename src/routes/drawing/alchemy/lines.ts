import {
	arrayMap,
	lineIntersection,
	radialPoint,
	type Line,
	type GeometryOptions,
	type Point
} from '@dopplerreflect/geometry';
import { angles, radii } from './setup';

function createLines(angles: number[], radii: number[]): Line[] {
	function centerAtRadius0(angle: number): GeometryOptions {
		return { center: radialPoint(angle, radii[0]) };
	}

	const lines = [
		// outermost
		...angles.map(
			(a, i) =>
				[
					radialPoint(a, radii[0], centerAtRadius0(a)),
					radialPoint(angles[(i + 1) % 6], radii[0], centerAtRadius0(angles[(i + 1) % 6]))
				] as Line
		),
		// 2nd hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(a, radii[1], centerAtRadius0(a)),
					radialPoint(angles[(i + 1) % 6], radii[1], centerAtRadius0(angles[(i + 1) % 6]))
				] as Line
		),
		// 3rd hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(a, radii[2], centerAtRadius0(a)),
					radialPoint(angles[(i + 1) % 6], radii[2], centerAtRadius0(angles[(i + 1) % 6]))
				] as Line
		),
		// 4th hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(a, radii[3], centerAtRadius0(a)),
					radialPoint(angles[(i + 1) % 6], radii[3], centerAtRadius0(angles[(i + 1) % 6]))
				] as Line
		),
		// from outer vesica
		...angles.map(
			(a, i) =>
				[
					radialPoint(angles[(i + 5) % 6], radii[0], centerAtRadius0(a)),
					radialPoint(angles[(i + 2) % 6], radii[0], centerAtRadius0(angles[(i + 1) % 6]))
				] as Line
		),
		// innermost hex
		...angles.map(
			(a, i) => [radialPoint(a, radii[3]), radialPoint(angles[(i + 1) % 6], radii[3])] as Line
		),
		// 5th hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(a, radii[0] - radii[3]),
					radialPoint(angles[(i + 1) % 6], radii[0] - radii[3])
				] as Line
		),
		// line from 2nd hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(angles[(i + 0) % 6], radii[1], centerAtRadius0(angles[(i + 5) % 6])),
					radialPoint(angles[(i + 1) % 6], radii[1], centerAtRadius0(angles[(i + 2) % 6]))
				] as Line
		),
		// line from 3rd hex
		...angles.map(
			(a, i) =>
				[
					radialPoint(angles[(i + 0) % 6], radii[2], centerAtRadius0(angles[(i + 5) % 6])),
					radialPoint(angles[(i + 1) % 6], radii[2], centerAtRadius0(angles[(i + 2) % 6]))
				] as Line
		),
		// center to outside
		...angles.map((a) => [{ x: 0, y: 0 }, radialPoint(a, radii[0], centerAtRadius0(a))] as Line)
	];

	// extend lines from 2nd hex to outer hex
	angles.forEach((_, i) => {
		lines.splice(i + 36, 1, [
			lineIntersection(lines[(i + 5) % 6], lines[i + 36], true) as Point,
			lineIntersection(lines[(i + 1) % 6], lines[i + 36], true) as Point
		]);
	});
	return lines;
}

function linesExtendedToEdge(lines: Line[], angles: number[]): Line[] {
	const newLines = [...lines];
	arrayMap(8, (n) => n).forEach((n) => {
		angles.forEach((_, i) => {
			newLines.splice(i + (n + 1) * 6, 1, [
				lineIntersection(lines[(i + 5) % 6], lines[i + (n + 1) * 6], true) as Point,
				lineIntersection(lines[(i + 1) % 6], lines[i + (n + 1) * 6], true) as Point
			]);
		});
	});
	return newLines;
}

export const brightLines = createLines(angles, radii);
export const dimLines = linesExtendedToEdge(brightLines, angles);
