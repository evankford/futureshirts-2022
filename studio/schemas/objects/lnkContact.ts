export default {
	name: 'lnkContact',
	title: 'Contact Form Embed',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (R) => R.required()
		},
		{
			name: 'email',
			type: 'array',
			of: [{ type: 'emailOption' }],
			title: 'Specific Email Contact',
			description: 'Forwards to an email if this option is selected.'
		}
	]
};
