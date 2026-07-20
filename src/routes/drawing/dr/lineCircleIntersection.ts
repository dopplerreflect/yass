// created with perplexity.ai
import type { Point, Line, Circle } from '@dopplerreflect/geometry';
/**
 * Finds the intersection points between a line segment and a circle.
 *
 * @param line - Array of two points defining the line segment
 * @param circle - Object with x, y (center) and r (radius)
 * @returns Array of intersection points (0, 1, or 2 points)
 */
export function lineCircleIntersection(line: Line, circle: Circle): Point[] {
	const [p1, p2] = line;
	const { x: cx = 0, y: cy = 0, r } = circle;

	// Vector from p1 to p2
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;

	// Vector from p1 to circle center
	const fx = p1.x - cx;
	const fy = p1.y - cy;

	// Quadratic coefficients: at² + bt + c = 0
	const a = dx * dx + dy * dy;
	const b = 2 * (fx * dx + fy * dy);
	const c = fx * fx + fy * fy - r * r;

	// Calculate discriminant
	const discriminant = b * b - 4 * a * c;

	// No intersection if discriminant is negative
	if (discriminant < 0) {
		return [];
	}

	const intersections: Point[] = [];

	// One intersection (tangent line)
	if (discriminant === 0) {
		const t = -b / (2 * a);
		if (t >= 0 && t <= 1) {
			intersections.push({
				x: p1.x + t * dx,
				y: p1.y + t * dy,
			});
		}
	}
	// Two intersections
	else {
		const sqrtDiscriminant = Math.sqrt(discriminant);
		const t1 = (-b + sqrtDiscriminant) / (2 * a);
		const t2 = (-b - sqrtDiscriminant) / (2 * a);

		if (t1 >= 0 && t1 <= 1) {
			intersections.push({
				x: p1.x + t1 * dx,
				y: p1.y + t1 * dy,
			});
		}

		if (t2 >= 0 && t2 <= 1) {
			intersections.push({
				x: p1.x + t2 * dx,
				y: p1.y + t2 * dy,
			});
		}
	}

	return intersections;
}
