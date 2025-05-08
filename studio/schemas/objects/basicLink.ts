export default {
	type: 'object',
	name: 'basicLink',
	title: 'Basic Link',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (R) => R.required(),
		},
		{
			name: 'url',
			title: 'URL',
			type: 'string',
			validation: (R) => R.required(),
		}
	]
};
