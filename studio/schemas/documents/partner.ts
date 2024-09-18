import { orderRankField } from '@sanity/orderable-document-list';
import {validUrl} from "../../../src/lib/rules/validUrl";

export default {
	name: 'partner',
	title: 'Partner',
	type: 'document',
	fields: [
		orderRankField({ type: 'partner' }),
		{
			name: 'title',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'active',
			title: 'Show on Site',
			type: 'boolean',
			initialValue: true
		},
		{
			name: 'featured',
			title: 'Featured?',
			type: 'boolean',
			description: 'Shows this partner as a "featured" partner, with a full image.'
		},
		{
			name: 'featuredImage',
			title: 'Featured Image',
			type: 'image',
			options: { hotspot: true },
			validation: Rule => Rule.custom((field: string, context) => {
				if (context.document.featured && !field) {
					return 'This field is required when the partner is featured'
				}
				return true
			})
		},{
			name: 'logo',
			title: 'Logo',
			type: 'image',
		},
		{
			name: 'websiteUrl',
			title: 'Website URL',
			type: 'url',
		},
		{
			name: 'storeUrl',
			title: 'Store URL',
			type: 'url',
		},
	]
};
