export default {
	name: 'jobs',
	title: 'Jobs',
	type: 'document',
	initialValue: {
		email: 'info@futureshirts.com',
		title: 'Apply Now',
		successTitle: "We've got your application",
		successMessage: "Thanks for your time! We'll get to it as soon as we can!",
		errorTitle: 'Something went wrong...',
		errorMessage: "We couldn't send your application. Please reload this page and try again.",
		haveOpeningsTitle: 'Accepting Applications',
		haveOpenings:
			"We currently are accepting job applications for the following openings. Read on, fill out the form below, and let's see if you'd make a good fit for the Gross Labs team!",
		noCurrentOpeningsTitle: 'No Current Openings',
		noCurrentOpenings: "Check back later to see if we're accepting applications!"
	},
	groups: [
		{
			name: 'content',
			title: 'Content',
			default: true
		},
		{
			name: 'settings',
			title: 'Settings'
		}
	],
	// __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
	fields: [
		{
			name: 'email',
			title: 'Email',
			type: 'array',
			of: [{type: 'emailOption'}],
			group: 'settings',
			description:
				'Default Emails (all submissions are sent here). You can also set specific emails for "Contacting About" options, and leave this blank.'
		},
		{
			name: 'openings',
			title: 'Openings',
			type: 'array',
			group: 'content',
			of: [{ type: 'job' }]
		},
		{
			name: 'title',
			title: 'Page Title',
			type: 'string',
			group: 'content',
			validation: (R) => R.required()
		},
		{
			name: 'subtitle',
			title: 'Page Subtitle',
			type: 'string',
			group: 'content'
		},
		{
			name: 'image',
			title: 'Hero Image',
			description: 'Shows behind the hero. Use a large image (around 2400 x 1200px).',
			type: 'image',
			group: 'content'
		},

		{
			name: 'haveOpeningsTitle',
			title: 'Have Openings Title',
			type: 'string',
			group: 'settings'
		},
		{
			name: 'haveOpenings',
			title: 'Have Openings',
			type: 'text',
			group: 'settings'
		},
		{
			name: 'noCurrentOpenings',
			title: 'No Current Openings',
			type: 'text',
			group: 'settings'
		},
		{
			name: 'noCurrentOpeningsTitle',
			title: 'No Current Openings Title',
			type: 'string',
			group: 'settings'
		},
		{
			name: 'successTitle',
			title: 'Success Title',
			type: 'string',
			group: 'settings',
			validation: (R) => R.required()
		},
		{
			name: 'successMessage',
			title: 'Success Message',
			type: 'text',
			group: 'settings',
			validation: (R) => R.required()
		},
		{
			name: 'errorTitle',
			title: 'error Title',
			type: 'string',
			group: 'settings',
			validation: (R) => R.required()
		},
		{
			name: 'errorMessage',
			title: 'error Message',
			type: 'text',
			group: 'settings',
			validation: (R) => R.required()
		}
	]
};