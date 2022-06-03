export default [
	{
		name: 'counters',
		title: 'Counter',
		type: 'array',
    of: [ {type : 'counter'}],
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	},
	{
		name: 'computer',
		title: 'Computer Preview 1',
		type: 'video',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	},
	{
		name: 'computer2',
		title: 'Computer Preview 2',
		type: 'video',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	},
	{
		name: 'phone',
		title: 'Phone Preview 1',
		type: 'video',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	},
	{
		name: 'phone2',
		title: 'Phone Preview 2',
		type: 'video',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	},
	{
		name: 'tablet',
		title: 'Tablet Preview',
		type: 'video',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}
];