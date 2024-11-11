export default {
	name: 'lnkContact',
	title: 'Contact Form Embed',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (R) => R.required(),
			description: "Menu title"
		},
		{
			name: 'prettyTitle',
			type: 'string',
			title: 'Pretty Title',
			validation: (R) => R.required(),
		},
		{
			name: 'subtitle',
			type: 'string',
			title: 'Subtitle'
		},
		{
			name: 'email',
			type: 'array',
			of: [{ type: 'emailOption' }],
			title: 'Specific Email Contact',
			description: 'Forwards to an email if this option is selected.'
		}
	],
	initialValue: {
		title: 'Contact',
		prettyTitle: 'Get In Touch',
		subtitle: 'Had a great time chatting with you! As always, feel free to reach out with any questions. What happened in Vegas doesn\'t have to stay in Vegas!'
	}
};
