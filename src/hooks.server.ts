/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/studio')) {
		return Response.redirect('https://futureshirts.sanity.studio', 303);
	}
	const response = await resolve(event);
	return response;
}
