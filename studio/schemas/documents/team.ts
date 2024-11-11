import { orderRankField } from '@sanity/orderable-document-list';
export default {
	name: 'team',
	title: 'Team',
	type: 'document',
	groups: [
		{
			name: 'about',
			title: 'About'
		},
		{
			name: 'members',
			title: 'Members',
		},
		{
			name: 'onboarding',
			title: 'Onboarding',
		},
	],
	fields: [
		orderRankField({ type: 'team' }),
		{
			name: 'title',
			group: ['about'],
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'subtitle',
			group: ['about'],
			title: 'Subtitle',
			type: 'string'
		},
		{
			name: 'description',
			group: ['about'],
			title: 'Description',
			type: 'markdown',
			// validation: (Rule) => Rule.required()
		},
		{
			name: 'active',
			group: ['onboarding'],
			title: 'Show in Document Builder',
			type: 'boolean',
			initialValue: true
		},
		{
			name: 'abstract_team',
			group: ['members'],
			title: 'Use Positions',
			description: 'Uses positions instead of individual team members',
			type: 'boolean',
			initialValue: true
		},
		{
			name: 'members_ref',
			group: ['members'],
			description: 'Used in client-facing documents.',
			title: 'Team Members',
			type: 'array',
			of: [{type: 'reference', to: {type: 'teamMember'}}],
			hidden: ({ document }) => document.abstract_team
		},
		{
			name: 'positions_ref',
			group: ['members'],
			description: 'Used in client-facing documents.',
			title: 'Positions',
			type: 'array',
			of: [{type: 'reference', to: {type: 'position'}}],
			hidden: ({ document }) => !document.abstract_team
		},
		{
			name: 'faqTitle',
			group: ['onboarding'],
			title: 'FAQ Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'FAQs'
		},
		{
			name: 'faqSubtitle',
			group: ['onboarding'],
			title: 'FAQ Subtitle',
			type: 'string',
			initialValue: 'Have questions? Get answers.'
		},
		{
			name: 'faqs',
			title: 'FAQs',
			group: ['onboarding'],
			description: 'Onboarding section FAQs',
			type: 'array',
			of: [{ type: 'faq'}]
		}
	]
};
