
import Image from '../lib/image';
import seoSettings, {seoGroup} from "../lib/seoSettings";

export default {
	name: 'page',
	title: 'Pages',
	type: 'document',
	groups: [
		{
			name: 'main',
			title: 'Main',
			default: true
		},

		seoGroup
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: ['main'],
			validate: (R) => R.required()
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: ['main']
		},
		{ ...Image, group: 'main' },
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			group: ['main'],
			of: [
				{
					type: 'block'
				}
			]
		},
		{
			name: 'email',
			title: 'Email Address',
			type: 'string',
			group: ['main'],
			validation: (Rule) =>
				Rule.custom((email, context) => {
					if (typeof email == undefined || context.parent.slug !='support') {
						return true;
					}
					const regex =
						/[a-z0-9!#$%&'*+=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
					if (regex.test(email)) {
						return true;
					} else {
						return 'Please enter a valid email address';
					}
				}),

			hidden: ({ parent }) => parent.slug.current != 'support'
		},
		{
			name: 'counters',
			type: 'array',
			of: [
				{
					type: 'counter'
				}
			],
			group: 'main',
			hidden: ({ parent }) => parent.slug.current != 'support'
		},
		...seoSettings
	]
};

