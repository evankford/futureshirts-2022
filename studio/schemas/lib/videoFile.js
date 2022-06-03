
export default {
	type: 'file',
	name: 'video',
	title: 'Local Video',
	fields: [
		{
			type: 'file',
			name: 'smallVersion',
			title: 'Smaller file version',
			description: 'Shows on screens less than 750px wide.',
			options: {
				accept: 'video/mp4'
			}
		},
		{
			type: 'image',
			name: 'image',
			title: 'Image',
			description: 'Fallback/Loading image',
			options: {
				hotspot: true
			}
		}
	],
	options: {
		accept: 'video/mp4'
	}
};
