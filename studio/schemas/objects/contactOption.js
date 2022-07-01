export default {
	name: 'contactOption',
	title: 'Contact Option',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (R) => R.required(),
		},
		{
			name: 'email',
			type: 'string',
			title: 'Forwarding Email',
			description: 'Forwards to an email if filled.',
			validation: (Rule) =>
				Rule.regex(
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					{
						name: 'email', // Error message is "Does not match email-pattern"
						invert: false // Boolean to allow any value that does NOT match pattern
					}
				)
		},
		{
			name: 'message',
			type: 'markdown',
			title: 'Message',
			description: 'Include to show a link or message to help guide users towards appropriate forms'
		}
	]
};