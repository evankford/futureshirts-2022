import ecommerce from './sectionFields/ecommerce';
import { orderRankField } from '@sanity/orderable-document-list';
import heroSimple from "./sectionFields/heroSimple";

export default {
	name: 'section',
	title: 'Front Page Section',
	type: 'document',
	groups: [
		{
			name: 'content',
			title: 'Content',
			default: true,
		},
		{
			name: 'settings',
			title: 'Settings'
		},
	],
	fields: [
		{
			name: 'layout',
			title: 'Layout',
			type: 'string',
			group: ['settings'],
			options: {
				list: [
					{
						title: 'Hero Slider',
						value: 'hero'
					},
					{
						title: 'Simple Hero',
						value: 'heroSimple'
					},
					{
						title: 'More Than Shirts',
						value: 'more'
					},
					{
						title: 'Product Development',
						value: 'product'
					},
					{
						title: 'Tour + On-Site',
						value: 'tour'
					},
					{
						title: 'E-Commerce',
						value: 'ecommerce'
					},
					{
						title: 'Licensing',
						value: 'licensing'
					},
					{
						title: 'Team',
						value: 'team'
					},
					{
						title: 'Partners',
						value: 'partners'
					},
					{
						title: 'Connect + Contact',
						value: 'connect'
					}
				]
			}
		},
		{
			name: 'anchor',
			title: 'Anchor Link',
			type: 'string',
			group: ['settings'],
			validation: (R) => R.required()
		},
		orderRankField({ type: 'section' }),
		{
			name: 'intro',
			title: 'Intro',
			type: 'string',
			group: ['content'],
			hidden: ({ document }) => !['more', 'team', 'partners'].includes(document.layout)
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: ['content'],
			validation: (Rule) => Rule.required()
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: ['content'],
			hidden: ({ document }) => !['licensing'].includes(document.layout)
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			group: ['content'],
			fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
			options: { hotspot: true },
			hidden: ({ document }) =>
				!document.layout || ['connect', 'ecommerce', 'tour', 'more', 'hero', 'partners', 'heroSimple'].includes(document.layout)
		},
		{
			name: 'image2',
			title: 'Image 2',
			type: 'image',
			group: ['content'],
			fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
			options: { hotspot: true },
			hidden: ({ document }) => !document.layout || document.layout !== 'licensing'
		},
		{
			name: 'imageSmall',
			title: 'Image (Small)',
			type: 'image',
			group: ['content'],
			fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
			options: { hotspot: true },
			hidden: ({ document }) => !document.layout || document.layout != 'product'
		},
		{
			name: 'box',
			title: 'Box',
			type: 'array',
			of: [{ type: 'block' }],
			group: ['content'],
			hidden: ({ document }) => !document.layout || ['connect', 'team', 'partners', 'heroSimple'].includes(document.layout)
		},
		{
			name: 'quoteGallery',
			title: 'Quotes',
			type: 'array',
			of: [{ type: 'quote' }],
			group: ['content'],
			hidden: ({ document }) => !document.layout || document.layout !== 'tour'
		},
		{
			name: 'logoGallery',
			title: 'Gallery',
			type: 'array',
			of: [
				{
					type: 'image',
					name: 'image',
					fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }]
				}
			],
			group: ['content'],
			options: {
				layout: 'grid'
			},
			hidden: ({ document }) =>
				!document.layout || !['team', 'licensing'].includes(document.layout)
		},
		{
			name: 'heroGallery',
			title: 'Hero Gallery',
			type: 'array',
			of: [{ type: 'heroImage' }],
			group: ['content'],
			hidden: ({ document }) => !document.layout || document.layout !== 'hero'
		},
		{
			name: 'moreVideo',
			title: 'More Video',
			description: 'An .mp4 video about 3MB or smaller. 720 x 720px preferred',
			type: 'videoOrImage',
			group: ['content'],
			hidden: ({ document }) => !document.layout || document.layout !== 'more'
		},
		{
			name: 'instagramWidget',
			title: 'Instagram Widget',
			type: 'code',
			group: ['content'],
			hidden: ({ document }) => !document.layout || document.layout !== 'connect'
		},

		{
			name: 'showSocials',
			title: 'Show Socials?',
			type: 'boolean',
			initialValue: true,
			group: ['content'],
			hidden: ({ document }) => !document.layout || document.layout !== 'connect'
		},
		...ecommerce,
		...heroSimple
	]
};
