export default {
	name: 'contactOption',
	title: 'Contact Option',
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
		},
		{
			name: 'message',
			type: 'array',
			of: [{ type: 'block' }],
			title: 'Message',
			description:
				'Allows showing folks a link, etc, when a specific option is selected. Great for sending job seekers to the jobs page.',
		},

	]
};