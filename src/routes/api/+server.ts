import type { RequestHandler } from './$types';
import type { SerializedSvg } from '$lib/types.d';
import { saveFile } from '$lib/server/saveFile';
import { runCommand } from '$lib/server/runCommand';

export const POST: RequestHandler = async ({ request }) => {
	const response: SerializedSvg = await request.json();
	const { name, body } = response;
	const saved = await saveFile(`./static/drawings/svg/${name}.svg`, body);
	const { stdout, stderr } = await runCommand(`magick ./static/drawings/svg/${name}.svg -resize 512x ./static/drawings/webp/${name}.webp`);
	return new Response(JSON.stringify('whatever'));
};
