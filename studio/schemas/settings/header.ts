import Image from '../lib/image'
export default {
	title: 'Header',
	name: 'header',
	type: 'document',
	__experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],

	fields: [
		{
			name: 'contactLink',
			title: 'Contact Link',
			type: 'object',
			validation: (R) => R.required(),
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Title',
					validation: (R) => R.required()
				},
				{
					name: 'slug',
					title: 'Contact Page URL',
					type: 'string',
					initialValue: '/contact',
					validation: (R) => R.required()
				}
			],
			initialValue: {
				title: 'Get in Touch'
			}
		},
		{
			name: 'menuItems',
			title: 'Menu items',
			type: 'array',
			of: [{ type: 'menuItem' }]
		}
	]
};
