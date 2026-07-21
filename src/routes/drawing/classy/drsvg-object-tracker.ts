import {
	type Point,
	type Line,
	type Circle,
	lineIntersection,
	lineCircleIntersection,
	findCircleIntersections,
} from '@dopplerreflect/geometry';
export class DRsvgObjectTracker {
	_lines = new Set<Line>();
	_circles = new Set<Circle>();
	_points = new Set<string>();

	add(object: Line): void;
	add(object: Circle): void;

	add(object: Point | Line | Circle): void {
		if (Array.isArray(object) && object.length === 2) {
			console.log('adding line', object);
			[...this._lines]
				.map((l) => lineIntersection(object, l))
				.filter((e) => e !== null)
				.forEach((i) => this.addPoint(i));
			[...this._circles]
				.map((c) => lineCircleIntersection(object, c))
				.filter((a) => a.length > 0)
				.flat()
				.forEach((e) => this.addPoint(e));
			this._lines.add(object);
			return;
		}

		if (!Array.isArray(object) && 'r' in object) {
			console.log('adding circle', object);
			[...this._lines]
				.map((l) => lineCircleIntersection(l, object))
				.filter((a) => a.length > 0)
				.flat()
				.forEach((e) => this.addPoint(e));
			findCircleIntersections([object, ...this._circles]).forEach((c) => this.addPoint(c));
			this._circles.add(object);
			return;
		}
		console.log("what's this?", object);
	}

	addPoint(object: Point): void {
		let { x, y } = object;
		const roundedObject: Point = { x: Math.ceil(x), y: Math.ceil(y) };
		const o = JSON.stringify(roundedObject);
		if (!this._points.has(o)) {
			this._points.add(o);
			console.log('adding point:', roundedObject);
		}
	}

	get lines(): Line[] {
		return [...this._lines].map((v) => v);
	}

	get circles(): Circle[] {
		return [...this._circles].map((v) => v);
	}

	get points(): Point[] {
		return [...this._points].map((v) => JSON.parse(v));
	}
}
