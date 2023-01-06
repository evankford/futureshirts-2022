import { orderRankField } from '@sanity/orderable-document-list';
export default {
	name: 'teamMember',
	title: 'Team Member',
	type: 'document',
	initialValue:{
		questions:[
			{
				question: 'What’s The Oldest Band Tee You Own?',
				answer:  ''
			},
			{
				question: 'What Band Have you seen in concert the most?',
				answer:  ''
			},
			{
				question: 'Hoodie or Crewneck?',
				answer:  ''
			},
			{
				question: 'Favorite Merch Accessory you’ve ever had?',
				answer:  ''
			},
			{
				question: 'Favorite concert ‘moment’?',
				answer:  ''
			},
			{
				question: 'First concert attended?',
				answer:  ''
			},
		]
	},
	fields: [
		orderRankField({ type: 'teamMember' }),
		{
			name: 'title',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name:'questions',
			title: 'Questions',
			type: 'array',
			of: [{type: 'teamQuestion'}],
			select: {
				title: 'title',
				subtitle: 'releaseDate'
			}
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required()

		},
		{
			name: 'active',
			title: 'Show on Site',
			type: 'boolean',
			initialValue: true
		},
	]
};
