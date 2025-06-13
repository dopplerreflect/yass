import type { RequestHandler } from './$types';
import type { SerializedSvg } from '$lib/types.d';
import {writeFile} from 'node:fs/promises'
import { exec } from 'node:child_process';
export const POST: RequestHandler = async ({ request }) => {
	const response: SerializedSvg = await request.json();
	const { name, body } = response;
	// Bun.write(`./static/drawings/svg/${name}.svg`, body);
	// const result =
	// 	await $`magick ./static/drawings/svg/${name}.svg -resize 512x ./static/drawings/webp/${name}.webp`;
	await writeFile(`./static/drawings/svg/${name}.svg`, body);
	exec(`magick ./static/drawings/svg/${name}.svg -resize 512x ./static/drawings/webp/${name}.webp`, (error, stdout, stderr) => {
		if(error) {
			console.log(error);
		}
		console.log({stdout, stderr})
	})
	return new Response(JSON.stringify(response));
};
