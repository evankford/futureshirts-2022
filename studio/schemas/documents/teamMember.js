import { orderRankField } from '@sanity/orderable-document-list';
export default {
	name: 'teamMember',
	title: 'Team Member',
	type: 'document',
	groups: [
		{
			name: 'main',
			title: 'Main',
			default: true
		},
		{
			name: 'internal',
			title: 'Internal',

		}
	],
	fields: [
		orderRankField({ type: 'teamMember' }),
		{
			name: 'title',
			title: 'Name',
			type: 'string',
			group: 'main',
			validation: (Rule) => Rule.required()
		},
		{
			name:'questions',
			title: 'Questions',
			type: 'array',
			group: 'main',
			of: [{type: 'teamQuestion'}],
			initialValue: [{
				_type: 'teamQuestion',
				question: 'What’s The Oldest Band Tee You Own?'
			},
				{
					_type: 'teamQuestion',
					question: 'What Band Have you seen in concert the most?'
				},
				{
					_type: 'teamQuestion',
					question: 'Hoodie or Crewneck?'
				},
				{
					_type: 'teamQuestion',
					question: 'Favorite Merch Accessory you’ve ever had?'
				},
				{
					_type: 'teamQuestion',
					question: 'Favorite concert ‘moment’?'
				},
				{
					_type: 'teamQuestion',
					question: 'First concert attended?'
				}]
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			group: 'main',
			options: { hotspot: true },
			validation: (Rule) => Rule.required()

		},
		{
			name: 'active',
			title: 'Show on Site',
			type: 'boolean',
			group: 'main',
			initialValue: true
		},
		{
			name: 'position',
			description: 'Used in client-facing documents.',
			title: 'Position',
			group: 'internal',
			type: 'string',
		},
		{
			name: 'team',
			description: 'Used in client-facing documents.',
			title: 'Team',
			group: 'internal',
			type: 'string',
		},
		{
			name: 'blurb',
			description: 'Used in client-facing documents.',
			title: 'Blurb',
			group: 'internal',
			type: 'string',
		}
	]
};
