import { anglesArray, phi } from '@dopplerreflect/geometry';

export const width = 16 * 150;
export const height = width;
export const scale = 1.25;
export const r = (height / 2 / Math.sqrt(3)) * phi;
export const radii = [...Array(4).keys()].map((n) => r * phi ** n);
export const angles = anglesArray(6);
