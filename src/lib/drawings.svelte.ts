import type { Drawing } from "$lib/types.d"

const modules = import.meta.glob('./drawings/*.svelte', { eager: true });

export const drawings: Drawing[] = $state(
	Object.entries(modules).map(([path, module]: any) => ({
		name: path.replace('./drawings/', '').replace('.svelte', ''),
		path,
		module
	}))
);
