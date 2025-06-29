import { BROWSER } from 'esm-env';

export function createZoomState() {
	const initialZoom = {
		level: 1,
		xOffset: 0,
		yOffset: 0
	};

	// Initialize state from sessionStorage or use defaults
	const zoom = $state(
		BROWSER && sessionStorage.getItem('zoom')
			? JSON.parse(sessionStorage.getItem('zoom')!)
			: initialZoom
	);

	// Persist zoom state to sessionStorage whenever it changes
	$effect(() => {
		if (BROWSER) {
			sessionStorage.setItem('zoom', JSON.stringify(zoom));
		}
	});

	const actions = {
		reset: () => Object.assign(zoom, initialZoom),
		zoomIn: () => {
			// zoom.level is the percentage of the viewbox, smaller is more zoomed in
			if (zoom.level > 0.2) zoom.level -= 0.1;
		},
		zoomOut: () => {
			if (zoom.level < 1.0) zoom.level += 0.1;
		},
		setZoomLevel: (level: number) => {
			if (level > 0 && level <= 9) zoom.level = 1 - level / 10;
		},
		pan: (dx: number, dy: number) => {
			zoom.xOffset += dx;
			zoom.yOffset += dy;
		},
		center: () => {
			zoom.xOffset = 0;
			zoom.yOffset = 0;
		}
	};

	return {
		get zoom() {
			return zoom;
		},
		...actions
	};
}
