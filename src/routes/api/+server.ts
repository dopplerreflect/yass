import type { RequestHandler } from './$types';
import type { SerializedSvg } from '$lib/types.d';
import { saveFile } from '$lib/server/saveFile';
import { runCommand } from '$lib/server/runCommand';

export const POST: RequestHandler = async ({ request }) => {
	const response: SerializedSvg = await request.json();
	const { name, body } = response;
	const width = body.match(/data-image-width=\"(\d+)\"/)![1];
	const height = body.match(/data-image-height=\"(\d+)\"/)![1];
	await saveFile(`./static/drawings/svg/${name}.svg`, body);
	await saveFile(`/tmp/${name}.svg`, body.replace(/data-thumbnail-/g, ''));
	const braveCommand = `brave --headless --window-size=${width},${height} --screenshot=/tmp/${name}.webp file:///home/doppler/Code/yass/static/drawings/svg/${name}.svg`;
	console.log(braveCommand);

	await runCommand(braveCommand);

	// const magickCommand = `magick rsvg:/tmp/${name}.svg -gravity center -crop '%[fx:min(w,h)]x%[fx:min(w,h)]+0x0' -resize 512x ./static/drawings/webp/${name}.webp`;
	const magickCommand = `magick /tmp/${name}.webp -gravity center -crop '%[fx:min(w,h)]x%[fx:min(w,h)]+0x0' -resize 512x ./static/drawings/webp/${name}.webp`;
	console.log(magickCommand);

	await runCommand(magickCommand);

	console.log('done rendering');
	return new Response(JSON.stringify('whatever'));
};
