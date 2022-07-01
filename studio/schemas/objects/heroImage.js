export default {
	type: 'object',
	name: 'heroImage',
	title: 'Hero Image',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			validation: (R) => R.required(),
			options: {
				hotspot: true
			}
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (R) => R.required(),
		}
	]
};