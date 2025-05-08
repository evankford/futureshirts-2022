
import Image from '../lib/image';
import seoSettings, {seoGroup} from "../lib/seoSettings";
import {defineField} from "sanity";
import slugify from "slugify";

export default {
	name: 'linker',
	title: 'Linker',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validate: (R) => R.required()
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			defaultValue: ({parent}) => parent?.title && slugify(parent.title),
			validate: R=>R.required(),
			options: {
				derivedFrom: 'title'
			}
		},
		{
			name: 'embed',
			title: 'Embeds',
			type: 'array',
			of: [
				{type: 'lnkContact'},
				{type: 'lnkVideo'},
				{type: 'lnkPdf'},
				{type: 'menuItem'}
			]
		}
	]
};

