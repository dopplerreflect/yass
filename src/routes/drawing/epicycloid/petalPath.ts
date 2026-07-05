import { pointToString, type Line, type Point } from '@dopplerreflect/geometry';
export type PathIntersectionIndices = [number, number, number, number];

export function petalPath(
	pathIntersectionIndices: PathIntersectionIndices,
	lineSegmentIntersections: Map<string, Point>,
	epicycloidLineSegments: Line[],
): Point[] {
	const pointsToGoThrough = pathIntersectionIndices.map(
		(i) => [...lineSegmentIntersections.entries()][i],
	);
	pointsToGoThrough.push(pointsToGoThrough[0]);
	// console.log(pointsToGoThrough);
	let fromIndex = JSON.parse(pointsToGoThrough[0][0])[0];
	let toIndex = findClosest(JSON.parse(pointsToGoThrough[1][0]), fromIndex);
	// console.log(fromIndex, toIndex);
	const pathSegments = [pointsToGoThrough[0][1]];
	pointsToGoThrough.forEach((currentPoint, i) => {
		const nextTarget = pointsToGoThrough[i + 1];
		if (nextTarget) {
			const nextLineSegmentIntersectionIndices = JSON.parse(nextTarget[0]);
			toIndex = findClosest(nextLineSegmentIntersectionIndices, fromIndex);

			// console.log(fromIndex, toIndex, nextLineSegmentIntersectionIndices);

			const step = fromIndex > toIndex ? -1 : 1;
			for (let i = fromIndex; i !== toIndex + step; i += step) {
				// console.log(fromIndex, toIndex, i, step);
				if (i === 0) {
					pathSegments.push(currentPoint[1]);
				} else if (nextLineSegmentIntersectionIndices.includes(i)) {
					pathSegments.push(nextTarget[1]);
					// console.log('nextLineSegmentIntersectionIndices');
				} else {
					pathSegments.push(epicycloidLineSegments[i][fromIndex < toIndex ? 1 : 0]);
				}
			}
			fromIndex = nextLineSegmentIntersectionIndices.find((d) => d !== toIndex);
		}
	});
	return pathSegments;
}

function findClosest(arr: number[], target: number): number {
	if (!arr || arr.length === 0) return -1;

	return arr.reduce((closest, current) => {
		return Math.abs(current - target) < Math.abs(closest - target) ? current : closest;
	});
}
