//Only used in arrays

export default {
	type: 'object',
	name: 'gallery',
	title: 'Gallery',
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [{ type: 'picture' }, { type: 'video'}],
			options: {
				isHighlighted: true
			}
		},
		{
			name: 'layout',
			title: 'Layout',
			type: 'string',
			initialValue: 'gallery',
			required: true,
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
			required: true,
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