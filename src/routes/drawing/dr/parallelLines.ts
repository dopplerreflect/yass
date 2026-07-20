type Point = { x: number; y: number };
type Line = [Point, Point];
type ViewBox = [number, number, number, number]; // [x, y, width, height]

/**
 * Returns two lines parallel to the input line, each at `radius` distance on opposite sides,
 * clipped to the edges of the given viewBox so they span the entire box.
 */
export function parallelLinesToViewBox(line: Line, radius: number, viewBox: ViewBox): [Line, Line] {
	const [p1, p2] = line;
	const [vx, vy, vw, vh] = viewBox;

	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	const length = Math.hypot(dx, dy);

	if (length === 0) {
		throw new Error('Line has zero length; perpendicular direction is undefined.');
	}

	// Unit direction and perpendicular
	const ux = dx / length;
	const uy = dy / length;
	const px = -uy; // perpendicular x
	const py = ux; // perpendicular y

	// Offsets for the two parallel lines
	const ox1 = px * radius;
	const oy1 = py * radius;
	const ox2 = -ox1;
	const oy2 = -oy1;

	// For each offset line, compute two points on the infinite line far enough
	// to guarantee intersection with the viewBox, then clip to the box.
	const offsetLine1 = [
		{ x: p1.x + ox1, y: p1.y + oy1 },
		{ x: p2.x + ox1, y: p2.y + oy1 },
	];

	const offsetLine2 = [
		{ x: p1.x + ox2, y: p1.y + oy2 },
		{ x: p2.x + ox2, y: p2.y + oy2 },
	];

	const line1 = clipLineToViewBox(offsetLine1, viewBox);
	const line2 = clipLineToViewBox(offsetLine2, viewBox);

	return [line1, line2];
}

/**
 * Clip an infinite line (defined by two points) to a rectangular viewBox.
 * Returns the two intersection points with the rectangle edges.
 */
function clipLineToViewBox(line: Line, viewBox: ViewBox): Line {
	const [p1, p2] = line;
	const [vx, vy, vw, vh] = viewBox;

	const xMin = vx;
	const yMin = vy;
	const xMax = vx + vw;
	const yMax = vy + vh;

	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;

	// If the line is effectively a point, just return it (degenerate case)
	if (Math.abs(dx) < 1e-12 && Math.abs(dy) < 1e-12) {
		return [p1, p1];
	}

	const intersections: Point[] = [];

	// Helper: intersect with a vertical line x = X
	const intersectWithVertical = (X: number) => {
		if (Math.abs(dx) < 1e-12) return; // parallel to vertical
		const t = (X - p1.x) / dx;
		const y = p1.y + t * dy;
		if (y >= yMin - 1e-9 && y <= yMax + 1e-9) {
			intersections.push({ x: X, y });
		}
	};

	// Helper: intersect with a horizontal line y = Y
	const intersectWithHorizontal = (Y: number) => {
		if (Math.abs(dy) < 1e-12) return; // parallel to horizontal
		const t = (Y - p1.y) / dy;
		const x = p1.x + t * dx;
		if (x >= xMin - 1e-9 && x <= xMax + 1e-9) {
			intersections.push({ x, y: Y });
		}
	};

	// Test all four edges
	intersectWithVertical(xMin);
	intersectWithVertical(xMax);
	intersectWithHorizontal(yMin);
	intersectWithHorizontal(yMax);

	// We expect 0, 1, or 2 intersections. For a proper line crossing the box, we get 2.
	if (intersections.length < 2) {
		// Fallback: if the line is fully inside or just touching, you might want
		// different behavior. Here we just return the original points.
		return [p1, p2];
	}

	// Take the first two distinct intersections
	const a = intersections[0];
	const b = intersections[1];

	return [a, b];
}
