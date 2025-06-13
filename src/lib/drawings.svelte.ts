import type { Drawing } from "$lib/types.d"

const modules = import.meta.glob('../routes/drawing/**/+page.svelte', { eager: true });

export const drawings: Drawing[] = $state(
	Object.entries(modules).map(([path, module]: any) => ({
		name: path.replace(/.*drawing\//, '').replace(/\/\+page\.svelte/, ''),
		path,
		module
	}))
);
