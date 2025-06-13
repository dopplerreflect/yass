import type { RequestHandler } from './$types';
import type { SerializedSvg } from '$lib/types.d';
import { writeFile } from 'node:fs'
import { exec } from 'node:child_process';
export const POST: RequestHandler = async ({ request }) => {
	const response: SerializedSvg = await request.json();
	const { name, body } = response;
	try {
		writeFile(`./static/drawings/svg/${name}.svg`, body, (err) => {
			if(err) {
				console.error(`Error writing ${name}.svg`, err);
			}
		});
		exec(`magick ./static/drawings/svg/${name}.svg -resize 512x ./static/drawings/webp/${name}.webp`, (error, stdout, stderr) => {
			if(error) {
				console.log(`Error writing ${name}.webp:`, error.message);
			}
		});
	} catch(err) {
		console.error("Error saving svg and/or png", err);
	}
	return new Response(JSON.stringify('whatever'));
};
