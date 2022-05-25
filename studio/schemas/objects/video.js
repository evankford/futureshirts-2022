
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
      initialValue: 'youtube',
      default: 'youtube',
      options: {
        layout: 'select',
        list: [
          {value: 'youtube', title: 'Youtube'},
          {value: 'vimeo', title: 'Vimeo'},
          {value: 'local', title: 'Local'}
        ]
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      type: 'boolean',
      name: 'background',
      title: 'Is background?',
      initialValue: true,
      description: 'Mutes and autoplays the video rather than showing controls.'
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      hidden: ({parent, value}) => !value && parent.type == 'local',
      // validation: (R) => R.required()
    },
    Object.assign(videoFile, { hidden: ({parent, value}) => !value && parent.type !== 'local'}),
    {
      name: 'fallbackImage',
      title: 'Fallback Image',
      type: 'picture',
      options: {
        hotspot: true,
        accept: 'image/jpeg'
      },
      hidden: ({parent, value}) => !value && parent.type == 'local',
      // validation: (R) => R.required()
    }
  ]
}