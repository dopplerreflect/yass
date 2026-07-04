import type { Line, Point } from '@dopplerreflect/geometry';

export function findLineIntersections(lines: Line[]): Point[] {
	const intersections: Point[] = [];
	const seen = new Set<string>();

	for (let i = 0; i < lines.length; i++) {
		for (let j = i + 6; j < lines.length; j++) {
			const intersection = lineIntersection(lines[i], lines[j]);
			if (intersection) {
				const key = `${round(intersection.x)},${round(intersection.y)}`;
				if (!seen.has(key)) {
					intersections.push(intersection);
					seen.add(key);
				}
			}
		}
	}

	return intersections;
}

function round(value: number): number {
	return Number(value.toFixed(9)); // Reduced precision to avoid duplicates
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

/* This one goes beyond actual line boundaries
 *
 */
export function lineIntersection2(line1: Line, line2: Line, avoidNulls = false): Point {
	const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line1;
	const [{ x: x3, y: y3 }, { x: x4, y: y4 }] = line2;
	const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	let x = Number(
		(((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator).toFixed(1),
	);

	let y = Number(
		(((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator).toFixed(1),
	);

	// if (x === -0) x = 0;
	// if (y === -0) y = 0;

	return { x, y };
}
