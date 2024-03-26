import { orderRankField } from '@sanity/orderable-document-list';
export default {
	name: 'team',
	title: 'Team',
	type: 'document',
	fields: [
		orderRankField({ type: 'team' }),
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
			// validation: (Rule) => Rule.required()
		},

		{
			name: 'abstract_team',
			title: 'Use Positions',
			description: 'Uses positions instead of individual team members',
			type: 'boolean',
			initialValue: true
		},
		{
			name: 'members_ref',
			description: 'Used in client-facing documents.',
			title: 'Team Members',
			type: 'array',
			of: [{type: 'reference', to: {type: 'teamMember'}}],
			hidden: ({ document }) => document.abstract_team
		},
		{
			name: 'positions_ref',
			description: 'Used in client-facing documents.',
			title: 'Positions',
			type: 'array',
			of: [{type: 'reference', to: {type: 'position'}}],
			hidden: ({ document }) => !document.abstract_team
		},
		{
			name: 'active',
			title: 'Show in Document Builder',
			type: 'boolean',
			initialValue: true
		},
	]
};
