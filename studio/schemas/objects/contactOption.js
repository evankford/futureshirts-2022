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
			type: 'emailArray',
			title: 'Specific Email Contact',
			description: 'Forwards to an email if this option is selected.',
		}
	]
};