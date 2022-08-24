const email = {
	name: 'emailOption',
	type: 'object',
	title: 'Email Destinations',
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'Contact Name'
		},
		{
			name: 'email',
			type: 'string',
			title: 'Email Address',
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
	]
};

export default email;