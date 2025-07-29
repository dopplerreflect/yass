import type { Drawing } from '$lib/types.d';

const modules = import.meta.glob('../routes/drawing/**/+page.svelte', { eager: true });

export const drawings: Drawing[] = $state(
	Object.entries(modules).map(([path, module]: any) => {
		return {
			name: path.replace(/.*drawing\//, '').replace(/\/\+page\.svelte/, ''),
			path,
			module
		};
	})
);
