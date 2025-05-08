import { orderRankField } from '@sanity/orderable-document-list';
export default {
	name: 'position',
	title: 'Position',
	type: 'document',
	fields: [
		orderRankField({ type: 'position' }),
		{
			name: 'title',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'description',
			title: 'Description',
			type: 'markdown',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'active',
			title: 'Show in Document Builder',
			type: 'boolean',
			initialValue: true
		},

	]
};
