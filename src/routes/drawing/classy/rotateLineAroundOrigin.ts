import type { Line, Point } from '@dopplerreflect/geometry'

export function rotateLineAroundOrigin(line: Line, angleDeg: number): Line {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rotatePoint = (p: Point): Point => ({
    x: p.x * cos - p.y * sin,
    y: p.x * sin + p.y * cos,
  });

  return [rotatePoint(line[0]), rotatePoint(line[1])];
}
