export default {
	name: 'contactSettings',
	title: 'Contact Settings',
	type: 'document',
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
	initialValue: {
		email: 'info@futureshirts.co',
		title: 'Get In Touch',
		subtitle: `We'd love to hear from you! Use the form here to send us an email with whatever you need!`,
		successTitle: "We've got your message",
		successMessage: "We've got your message! We'll get to it as soon as we can!",
		errorTitle: 'Something went wrong...',
		errorMessage: "We couldn't send your message. Please reload this page and try again."
	},
	fields: [

		{
			name: 'title',
			title: 'Title',
			group: 'content',
			type: 'string'
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			group: 'content',
			type: 'string'
		},

		{
			name: 'email',
			title: 'Send To Emails',
			group: ['settings', 'content'],
			type: 'array',
			of: [
				{ type: 'emailOption'}
			],
			description:
				'Default Emails (all submissions are sent here). You can also set specific emails for "Contacting About" options, and leave this blank.'
		},
		{
			name: 'contactOptions',
			title: 'Contact Options',
			group: 'settings',
			type: 'array',
			of: [{ type: 'contactOption' }]
		},
		{
			name: 'successTitle',
			title: 'Success Title',
			group: 'settings',
			type: 'string',
			validation: (R) => R.required()
		},
		{
			name: 'successMessage',
			title: 'Success Message',
			group: 'settings',
			type: 'markdown',
			validation: (R) => R.required()
		},
		{
			name: 'errorTitle',
			title: 'Error Title',
			group: 'settings',
			type: 'string',
			validation: (R) => R.required()
		},
		{
			name: 'errorMessage',
			title: 'Error Message',
			group: 'settings',
			type: 'markdown',
			validation: (R) => R.required()
		},
		{
			name: 'video',
			title: 'Video',
			group: 'settings',
			type: 'videoOrImage'
		}
	]
};
