import { error } from '@sveltejs/kit';
import { drawings } from '$lib/drawings.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const drawing = drawings.find((d) => d.name == params.name);
	if (drawing) return drawing;
	error(404, 'Nope.');
};
