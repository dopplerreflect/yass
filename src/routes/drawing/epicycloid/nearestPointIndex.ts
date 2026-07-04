type Point = { x: number; y: number };

export function nearestPointIndex(target: Point, points: Map<string, Point>): string {
	if (points.size === 0) return '';

	let bestIndex = '';
	let bestDistSq = Infinity;

	for (const [key, value] of points) {
		const dx = value.x - target.x;
		const dy = value.y - target.y;
		const distSq = dx * dx + dy * dy;

		if (distSq < bestDistSq) {
			bestDistSq = distSq;
			bestIndex = key;
		}
	}

	return bestIndex;
}
