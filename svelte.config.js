import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['phone']
			},
			resolve: {
				// mainFields: ['main', 'module', 'browser']
			},
			ssr: {
				noExternal: [
					'@fortawesome/free-brands-svg-icons',
					'@fortawesome/pro-regular-svg-icons',
					'@fortawesome/pro-solid-svg-icons'
				]
			}
		}
	}
};

export default config;
