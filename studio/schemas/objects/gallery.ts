//Only used in arrays
import Image from '../lib/image';


export default {
	type: 'object',
	name: 'gallery',
	title: 'Gallery',
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [Image],
			options: {
				isHighlighted: true
			}
		},
		{
			name: 'layout',
			title: 'Layout',
			type: 'string',
			initialValue: 'gallery',
      validation: (R) => R.required(),
			options: {
				list: [
					{
						title: 'Gallery',
						value: 'gallery'
					},
					{
						title: 'Slider',
						value: 'slider'
					}
				],
				layout: 'radio',
				direction: 'horizontal'
			}
		},
		{
			name: 'imageSize',
			title: 'Image Size',
			type: 'string',
      validation: (R) => R.required(),
			initialValue: 'medium',
			options: {
				list: [
					{
						title: 'Small',
						value: 'small'
					},
					{
						title: 'medium',
						value: 'Medium'
					},
					{
						title: 'large',
						value: 'Large'
					}
				],
				layout: 'radio',
				direction: 'horizontal'
			}
		},
		{
			name: 'lightbox',
			title: 'Open items in Lightbox',
			type: 'boolean',
		}
	],
	options: {
		hotspot: true
	},
	preview: {
		select: {
			media: 'asset',
			title: 'alt'
		}
	}
};