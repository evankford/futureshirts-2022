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
		alias: {
			'@/styles' : 'src/lib/styles'
		}
	},
	ssr: {
		noExternal: [
			'@fortawesome/free-brands-svg-icons',
			'@fortawesome/free-solid-svg-icons',
		]
	},
	envPrefix: ['VITE_', 'AWS_', 'SANITY_', 'ADOBE_']
};


export default config;
