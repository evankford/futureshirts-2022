export default {
	name: 'support',
	title: 'Support',
	type: 'document',
	groups: [
		{
			name: 'content',
			title: 'Content',
			default: true
		},
		{
			name: 'messages',
			title: 'Messages'
		}
	],

	// __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string'
		},
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'block' }]
		},

		{
			name: 'successTitle',
			title: 'Success Title',
			type: 'string',
			group: 'messages',
			validation: (R) => R.required()
		},
		{
			name: 'successMessage',
			title: 'Success Message',
			type: 'text',
			group: 'messages',
			validation: (R) => R.required()
		},
		{
			name: 'errorTitle',
			title: 'error Title',
			type: 'string',
			group: 'messages',
			validation: (R) => R.required()
		},
		{
			name: 'errorMessage',
			title: 'error Message',
			type: 'text',
			group: 'messages',
			validation: (R) => R.required()
		}
	]
};