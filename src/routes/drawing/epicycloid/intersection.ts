import { anglesArray, radialPoint, type Line, type Point } from '@dopplerreflect/geometry';
import { nearestPointIndex } from './nearestPointIndex';

export function findLineIntersections(lines: Line[], epicycloidPoints: Point[], n: number) {
	type IntersectionSegmentIndices = string;

	const lineSectionIntersectionMap = new Map<IntersectionSegmentIndices, Point>();

	lineSectionIntersectionMap.set(JSON.stringify([0, lines.length - 1]), lines[0][0]);
	for (let i = 0; i < lines.length; i++) {
		for (let j = i + 1; j < lines.length; j++) {
			const intersection = lineIntersection(lines[i], lines[j]);
			if (intersection) {
				const intersectionSegmentIndices: IntersectionSegmentIndices = JSON.stringify([i, j]);
				if (!lineSectionIntersectionMap.get(intersectionSegmentIndices)) {
					lineSectionIntersectionMap.set(intersectionSegmentIndices, intersection);
				}
			}
		}
	}

	// get first point radius to determine approximate intersections of other innermost line segments
	const innermostRadius = Math.hypot(epicycloidPoints[0].x, epicycloidPoints[0].y);

	const innermostPoints = anglesArray(n, 0).map((a) => radialPoint(a, innermostRadius));
	const pointIndicesToKeep: string[] = [];
	innermostPoints.forEach((p, i) => {
		const targetPoint = { x: Number(p.x.toFixed(1)), y: Number(p.y.toFixed(1)) };
		pointIndicesToKeep.push(nearestPointIndex(targetPoint, lineSectionIntersectionMap));
	});

	lineSectionIntersectionMap.keys().forEach((k) => {
		const [i, j] = JSON.parse(k);
		const previous = JSON.stringify([i - 1, j - 1]);
		if (!pointIndicesToKeep.includes(previous)) lineSectionIntersectionMap.delete(previous);
	});

	const mapKeys = [...lineSectionIntersectionMap.keys()];
	const lastKey = mapKeys[mapKeys.length - 1];
	lineSectionIntersectionMap.delete(lastKey);

	return lineSectionIntersectionMap;
}

export function lineIntersection(
	line1: Line,
	line2: Line,
	avoidNulls: boolean = false,
): Point | null {
	const [p1, p2] = line1;
	const [p3, p4] = line2;

	const denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);

	if (Math.abs(denominator) < 1e-9 && !avoidNulls) {
		return null; // Lines are parallel or coincident
	}

	const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denominator;
	const u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / denominator;

	if ((t >= 0 && t <= 1 && u >= 0 && u <= 1) || avoidNulls) {
		const x = p1.x + t * (p2.x - p1.x);
		const y = p1.y + t * (p2.y - p1.y);
		return { x, y };
	}

	return null; // Lines don't intersect within the segments
}
