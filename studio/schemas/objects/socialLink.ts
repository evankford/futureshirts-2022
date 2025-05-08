import supportedSocialMedia from "../lib/socials"
const supportedSocialMediaList = supportedSocialMedia.map(m=> { return {value: m.name, title: m.title }})

export default {
	name: 'socialLink',
	title: 'Social link',
	type: 'object',
	fields: [
		{
			name: 'type',
			title: 'Type',
			type: 'string',
			validation: (R) => R.required(),
			options: {
				list: supportedSocialMediaList,
				layout: 'radio',
				direction: 'horizontal'
			}
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (R) => R.required()
		}
	]
};