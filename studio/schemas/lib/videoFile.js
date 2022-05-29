import Image from '../lib/image';

export default {
	type: 'file',
	name: 'localVideo',
	title: 'Local Video',
	fields: [
    Object.assign(Image,
    {
      description: 'Fallback image for mobile/while loading video file',
      required: true,
    }),

		{
			type: 'file',
			name: 'smallVersion',
			title: 'Smaller file version',
			description: 'Shows on screens less than 750px wide.',
			options: {
				accept: 'video/mp4'
			}
		}
	],
	options: {
		accept: 'video/mp4'
	}
};
