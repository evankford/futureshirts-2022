export default {
	name: 'lnkVideo',
	title: 'Embedded Video',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (R) => R.required()
		},
		{
			name: 'video',
			type: 'video',
			title: 'Video'
		}
	]
};
