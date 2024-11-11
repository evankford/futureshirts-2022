import { orderRankField } from '@sanity/orderable-document-list';
import{validate as validateEmail} from 'email-validator';

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
			name: 'blurb',
			description: 'Used in client-facing documents.',
			title: 'Blurb',
			group: 'internal',
			type: 'string',
		},
		{
			name: 'positionRef',
			description: 'Position',
			group: 'internal',
			type: 'reference',
			to: [
				{type: 'position'}
			]
		},
		{
			name: 'position',
			description: 'Used in client-facing documents.',
			title: 'Manual Position',
			group: 'internal',
			type: 'string',
		},
		{
			name: 'positionDescription',
			description: 'Used in client-facing documents.',
			title: 'Manual Position Description',
			group: 'internal',
			type: 'text',
		},
		{
			name: 'email',
			description: 'Used in client-facing documents. NEVER publicly shown.',
			title: 'Email Address',
			group: 'internal',
			type: 'string',
			validation: (R) => R.custom((email:string) => {
				if (!email) {
					return true
				}
				return validateEmail(email)
			})
		},
		// {
		// 	name: 'team_refs',
		// 	description: 'Used in client-facing documents.',
		// 	title: 'Team',
		// 	group: 'internal',
		// 	type: 'reference',
		// 	to: [{type: 'team'}],
		// },
		// {
		// 	name: 'position_ref',
		// 	description: 'Used in client-facing documents.',
		// 	title: 'Position',
		// 	group: 'internal',
		// 	type: 'reference',
		// 	to: [{type: 'position'}],
		// },
	]
};
