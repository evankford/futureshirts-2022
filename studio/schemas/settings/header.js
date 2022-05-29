import Image from '../lib/image'
export default {
	title: 'Header',
	name: 'header',
	type: 'document',
	__experimental_actions: ['create','update', /*'delete',*/ 'publish'],

	fields: [
		{
			name: 'staticLogo',
			title: 'Static logo',
			type: 'image',
		},
		{
			name: 'staticLogoOverlay',
			title: 'Static logo (overlay)',
			type: 'image',
		},
		{
			name: 'menuItems',
			title: 'Menu items',
			type: 'array',
			of: [{ type: 'menuItem' }]
		}
	]
};
