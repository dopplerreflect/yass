import { error } from '@sveltejs/kit';
import { drawings } from '$lib/drawings.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	if (params.name) {
		const drawing = drawings.find((d) => d.name == params.name);
		if (drawing) return drawing;
		error(404, 'Nope.');
	}
	return {};
};
