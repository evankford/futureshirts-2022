import { defineField, defineArrayMember} from 'sanity'


export default [
	defineField({
		name: 'counters',
		title: 'Counter',
		type: 'array',
		of: [defineArrayMember({ type: 'counter' })],
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}),
	defineField({
		name: 'computer',
		title: 'Computer Preview 1',
		description: '1920 x 1056px. For videos, keep the large version to < 4mb.',
		type: 'videoOrImage',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}),
	defineField({
		name: 'computer2',
		title: 'Computer Preview 2',
		type: 'videoOrImage',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}),
	defineField({
		name: 'phone',
		title: 'Phone Preview 1',
		type: 'videoOrImage',
		description: '900 x 1950px. For videos, keep the large version to < 4mb.',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}),
	defineField({
		name: 'phone2',
		title: 'Phone Preview 2',
		type: 'videoOrImage',
		description: '900 x 1950px. For videos, keep the large version to < 4mb.',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	}),
	defineField({
		name: 'tablet',
		title: 'Tablet Preview',
		description: '970 x 1056px. For videos, keep the large version to < 4mb.',
		type: 'videoOrImage',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'ecommerce'
	})
];
