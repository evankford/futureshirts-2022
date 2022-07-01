export default {
	name: 'contactSettings',
	title: 'Contact Settings',
	type: 'document',
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
			name: 'video',
			title: 'Video',
			type: 'video'
		},
		{
			name: 'email',
			title: 'Email Address',
			type: 'string',
			validation: (Rule) =>
				Rule.required().custom((email) => {
					if (typeof email == undefined) {
						return true;
					}
					const regex =
						/[a-z0-9!#$%&'*+=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
					if (regex.test(email)) {
						return true;
					} else {
						return 'Please enter a valid email address';
					}
				})
		},
		{
			name: 'contactOptions',
			title: 'Contact Options',
			type: 'array',
			of: [{ type: 'contactOption' }]
		},
		{
			name: 'successTitle',
			title: 'Success Title',
			type: 'string',
			validation: (R) => R.required()
		},
		{
			name: 'successMessage',
			title: 'Success Message',
			type: 'markdown',
			validation: (R) => R.required()
		},
		{
			name: 'errorTitle',
			title: 'Error Title',
			type: 'string',
			validation: (R) => R.required()
		},
		{
			name: 'errorMessage',
			title: 'Error Message',
			type: 'markdown',
			validation: (R) => R.required()
		}
	]
};