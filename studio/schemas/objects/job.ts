import {EmailOption} from "./emailOption";
import {BlockSchemaType} from "@sanity/types";
import {JobPreview} from "./job/JobPreview";

export type Job = {
	_key: string
	title: string
	subtitle: string,
	email: EmailOption[],
	description: BlockSchemaType[],
	fullDescription: BlockSchemaType[],
	active: boolean,
}

type JobSettings = {
	title: string
	subtitle?: string
	email: Array<{name:string}>
	url: string
}
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
			title: 'URL',
			type: 'url'
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
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			email: 'email',
			url: 'url'
		},
		prepare: (selection: JobSettings) => {
			console.log(selection)
			const {title, subtitle, email, url}: JobSettings = selection
			return ({
				title,
				subtitle: (
					url ? 'Linked to: ' +  url :
					(email?.length ? 'Sending to ' + email?.map(o=>o.name).join(' + ') : '')
				) + (subtitle ? '. ' + subtitle + '. ' : ''),
			})
		},
	},
	components: {item: JobPreview},

};
