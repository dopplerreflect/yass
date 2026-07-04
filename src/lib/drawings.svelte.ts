import type { Drawing } from '$lib/types.d';
import archived from '../archived.json';

const modules = import.meta.glob('../routes/drawing/**/+page.svelte', { eager: true });

export const drawings: Drawing[] = $state(
	Object.entries(modules).map(([path, module]: any) => {
		const name = path.replace(/.*drawing\//, '').replace(/\/\+page\.svelte/, '');
		return {
			name,
			path,
			module,
			archived: archived.includes(name),
		};
	}),
);
