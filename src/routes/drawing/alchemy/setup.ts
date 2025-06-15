import { anglesArray, phi } from "@dopplerreflect/geometry";

export	const width = 768;
export	const height = 768;
export	const r = (height / 2) * phi ** 2;
export	const radii = [...Array(4).keys()].map((n) => r * phi ** n);
export	const angles = anglesArray(6);
