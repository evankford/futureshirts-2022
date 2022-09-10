import EnvironmentPlugin from 'vite-plugin-environment';
import { sveltekit } from '@sveltejs/kit/vite';
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(),
	EnvironmentPlugin(['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'])],
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
	},
	envPrefix: ['VITE_', 'AWS_']
};


export default config;