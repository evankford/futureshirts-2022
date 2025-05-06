import { defineField} from 'sanity'

export default [
	defineField({
		name: 'subtitleLine1',
		title: 'Subtitle Line 1',
		type: 'string',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'heroSimple'
	}),defineField({
		name: 'subtitleLine2',
		title: 'Subtitle Line 2',
		type: 'string',
		group: 'content',
		hidden: ({ document }) => !document.layout || document.layout !== 'heroSimple'
	}),
];
