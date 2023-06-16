import redirects from "./redirects";


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

	if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/studio')) {
		return Response.redirect('https://futureshirts.sanity.studio', 303);
	}

	const foundRedirect = redirects.find(r=>event.url.pathname == r.from);
	if (foundRedirect){
		return Response.redirect(`${event.url.origin}${foundRedirect.to}`, foundRedirect.status ?? 303)
	}

	return await resolve(event);
}
