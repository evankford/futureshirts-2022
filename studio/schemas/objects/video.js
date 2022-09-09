
import videoFile from "../lib/videoFile"

export default {
	name: 'video',
	type: 'object',
	title: 'Video',
	fields: [
		{
			name: 'type',
			title: 'Type',
			type: 'string',
			initialValue: 'local',

			options: {
				layout: 'select',
				list: [
					{ value: 'youtube', title: 'Youtube' },
					{ value: 'vimeo', title: 'Vimeo' },
					{ value: 'local', title: 'Local' }
				]
			}
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},

		{
			name: 'url',
			title: 'Url',
			type: 'url',
			hidden: ({ parent, value }) => !value && parent.type == 'local'
			// validation: (R) => R.required()
		},
		{
			name: 'fallbackImage',
			title: 'Fallback Image',
			type: 'image',
			options: {
				hotspot: true,
				accept: 'image/jpeg'
			},
			hidden: ({ parent, value }) => !value && parent.type == 'local'
			// validation: (R) => R.required()
		},
    videoFile
	]
};