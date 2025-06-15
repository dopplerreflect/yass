import { lineIntersection, type Circle, type Line, type Point } from "@dopplerreflect/geometry";
import { height, width } from "./setup";

export function getDots(lines: Line[]): Circle[] {
  const rawIntersections: Point[] = [];
  lines.forEach((_, i) => {
    for (let n = i + 1; n < lines.length; n++) {
      let int = lineIntersection(lines[i], lines[n], true) as Point;
      if (Math.abs(int.x) < width && Math.abs(int.y) < height) {
        rawIntersections.push(int);
      }
    }
  });
  const roundedIntersections = rawIntersections.map((i) => ({
    x: Math.floor(i.x),
    y: Math.floor(i.y)
  }));
  const intersectionsWithMagnitudeMap = new Map();
  roundedIntersections.forEach((intersection) => {
    const i = JSON.stringify(intersection);
    if (!intersectionsWithMagnitudeMap.get(i)) {
      intersectionsWithMagnitudeMap.set(i, 2);
    } else {
      intersectionsWithMagnitudeMap.set(i, intersectionsWithMagnitudeMap.get(i) + 1);
    }
  });
  return [...intersectionsWithMagnitudeMap].map((e) => {
    const c = JSON.parse(e[0]);
    return { x: c.x, y: c.y, r: e[1] };
  })
}
