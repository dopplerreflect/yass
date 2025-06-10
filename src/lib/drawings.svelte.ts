import type { SvelteComponent } from 'svelte';

const modules = import.meta.glob('./drawings/*.svelte', { eager: true });

export type Drawing = {
	name: string;
	path: string;
	module: any;
};

export const drawings: Drawing[] = $state(
	Object.entries(modules).map(([path, module]: any) => ({
		name: path.replace('./drawings/', '').replace('.svelte', ''),
		path,
		module
	}))
);
