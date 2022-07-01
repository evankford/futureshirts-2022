export default {
	name: 'job',
	title: 'Job',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			required: true
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string'
		},
		{
			name: 'description',
			title: 'description',
			type: 'markdown',
			required: true
		}
	]
};
