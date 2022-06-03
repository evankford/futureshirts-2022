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
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Title'
				},
				{
					name: 'ref',
					title: 'Reference',
					type: 'reference',
					to: [
						{ type: 'page' }
						// {type: 'news'}
					]
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
