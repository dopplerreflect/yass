import type { RequestHandler } from './$types';
import type { SerializedSvg } from '$lib/components/DrSvg.svelte';
import fs from 'node:fs';
import { $ } from 'bun';

export const POST: RequestHandler = async ({ request }) => {
	const response: SerializedSvg = await request.json();
	const { name, body } = response;
	fs.writeFile(`./static/drawings/svg/${name}.svg`, body, () => {});
	const result =
		await $`magick ./static/drawings/svg/${name}.svg -resize 256x ./static/drawings/webp/${name}.webp`;
	return new Response(JSON.stringify(response));
};
