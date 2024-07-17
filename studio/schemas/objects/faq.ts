export default {
	type: 'object',
	name: 'faq',
	title: 'FAQ',
	fields: [
		{
			name: 'question',
			title: 'Question',
			type: 'string',
			validation: (R) => R.required(),
		},
		{
			name: 'answer',
			title: 'Answer',
			type: 'text',
			validation: (R) => R.required(),
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
		},
		{
			name: 'imageUrl',
			title: 'Image Url',
			type: 'url',
			description: 'links out via the image!',
			hidden: ({ current, value }) => !value && current?.image
		},
		{
			name: 'imageLinkText',
			title: 'Image Link Text',
			type: 'string',
			description: 'Text for the image link!',
			hidden: ({ current, value }) => !value && current?.image
		},
		{
			name: 'hidden',
			title: 'Hide in Document Builder',
			type: 'boolean',
			initialValue: false
		},

	]
};
