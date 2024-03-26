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
			name: 'url',
			title: 'Posting URL',
			type: 'url',
			description: 'Preferred! Should be the job posting url from Paylocity.'
		},
		{
			name: 'email',
			type: 'array',
			of: [
				{type: 'emailOption'}
			],
			title: 'Specific Email Contact(s)',
			description: '(DEPRECATED) Forwards to an email if this option is selected.',
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
