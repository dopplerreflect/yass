import { anglesArray, phi } from '@dopplerreflect/geometry';

export const width = 1920;
export const height = 1080;
export const r = (height / 2 / Math.sqrt(3)) * 0.75;
export const radii = [...Array(4).keys()].map((n) => r * phi ** n);
export const angles = anglesArray(6);
