import {
	lineIntersection2 as lineIntersection,
	type Circle,
	type Line,
	type Point,
} from '@dopplerreflect/geometry';

type Props = {
	lines: Line[];
	bounds?: { x: number; y: number; width: number; height: number } | undefined;
};

export function getCirclesWithMagnitudeFromLineIntersections({ lines, bounds }: Props): Circle[] {
	const rawIntersections: Point[] = [];
	lines.forEach((_, a) => {
		for (let b = a + 1; b < lines.length; b++) {
			let i = lineIntersection(lines[a], lines[b], true) as Point;
			if (bounds) {
				if (
					i.x > bounds.x &&
					i.y > bounds.y &&
					i.x < bounds.x + bounds.width &&
					i.y < bounds.y + bounds.height
				) {
					rawIntersections.push(i);
				}
			} else {
				rawIntersections.push(i);
			}
		}
	});
	const roundedIntersections = rawIntersections.map((i) => ({
		x: Math.floor(i.x),
		y: Math.floor(i.y),
	}));
	const intersectionsWithMagnitudeMap = new Map();
	roundedIntersections.forEach((intersection) => {
		const i = JSON.stringify(intersection);
		if (!intersectionsWithMagnitudeMap.get(i)) {
			intersectionsWithMagnitudeMap.set(i, 6);
		} else {
			intersectionsWithMagnitudeMap.set(i, intersectionsWithMagnitudeMap.get(i) + 1);
		}
	});
	return [...intersectionsWithMagnitudeMap].map((e) => {
		const c = JSON.parse(e[0]);
		return { x: c.x, y: c.y, r: e[1] };
	});
}
