import { error } from '@sveltejs/kit';
import fs from 'node:fs';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const response = await request.json();
	// console.log({ response });
	const { name, svgText } = response;
	fs.writeFile(`./images/svg/${name}.svg`, svgText, () => {});
	return new Response(JSON.stringify(response));
};
