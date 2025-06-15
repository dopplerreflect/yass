import { anglesArray, phi } from "@dopplerreflect/geometry";
import { createLines, linesExtendedToEdge } from "./lines";
import { getCircles } from './circles';

export const width = 768;
export const height = 768;
export const r = (height / 2) * phi ** 2;
export const radii = [...Array(4).keys()].map((n) => r * phi ** n);
export const angles = anglesArray(6);

export const circles = getCircles(radii, angles);
export const brightLines = createLines(angles, radii);
export const dimLines = linesExtendedToEdge(brightLines, angles);
