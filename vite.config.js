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
			'@fortawesome/free-solid-svg-icons',
		]
	},
	envPrefix: ['VITE_', 'AWS_']
};


export default config;
