export default {
	name: 'job',
	title: 'Job',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
      validation: (R) => R.required()
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string'
		},
		{
			name: 'email',
			type: 'array',
			of: [
				{type: 'emailOption'}
			],
			title: 'Specific Email Contact(s)',
			description: 'Forwards to an email if this option is selected.',
		},
		{
			name: 'description',
			title: 'Preview',
			type: 'array',
			of: [
				{
					type: 'block'
				}
			]
		},
		{
			name: 'fullDescription',
			title: 'Description',
			type: 'array',
			of: [
				{
					type: 'block'
				}
			]
		},
		{
			name: 'active',
			title: 'Active',
			type: 'boolean',
			initialValue: true,
		}
	]
};
