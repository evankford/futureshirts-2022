/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/studio')) {
		return new Response('Redirect', {
			status: 300,
			headers: { location: 'https://futureshirts.sanity.studio' }
		});
	}
	const response = await resolve(event);
	return response;
}
