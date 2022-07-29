import { sveltekit } from '@sveltejs/kit/vite';
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
	server: {
		port: 3003
	},
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
};


export default config;