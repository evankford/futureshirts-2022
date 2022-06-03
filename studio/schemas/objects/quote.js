export default {
	type: 'object',
	name: 'quote',
	title: 'Quote',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			required: true,
			description: 'Should be artist/company name'
		},
		{
			name: 'image',
			title: 'Main Image',
			type: 'image',
			required: true,
			options: {
				hotspot: true
			}
		},
		{
			name: 'logo',
			title: 'Logo',
			type: 'image',
			required: true
		},
		{
			name: 'quote',
			title: 'Quote',
			type: 'markdown',
			required: true,
			initialValue: 'Futureshirts delivered on their promise to make more money from merch while doing less work'
		},
		{
			name: 'quoteTitle',
			title: 'Quote Title',
			type: 'string',
			description: "Usually a person's name",
      initialValue: "So-and-So Jones"
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			description: "Usually a person's title",
      initialValue: "Tour Manager • Artist Name"
		}
	]
};