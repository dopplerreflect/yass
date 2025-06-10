import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const response = await request.json();
	console.log({ response });
	return new Response(JSON.stringify(response));
};
