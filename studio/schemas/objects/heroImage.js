export default {
	type: 'object',
	name: 'heroImage',
	title: 'Hero Image',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			description: 'At least 2000px x 1200px recommended. Make sure to set the hotspot by clicking the pencil on the image after uploading.',
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