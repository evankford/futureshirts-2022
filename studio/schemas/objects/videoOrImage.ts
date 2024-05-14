
import videoFile from "../lib/videoFile"

export default {
  name: 'videoOrImage',
  type: 'object',
  title: 'Video or Image',
  fields: [
    {
      name : 'is',
      type: 'string',
      title: 'Video or Image',
      initialValue: 'image',
      options: {
       layout: 'select',
       list: [
        {value: 'image', title: 'Image'},
        {value: 'video', title: 'Video'},
       ]
      }
    },
      {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg'
      },
      hidden:({parent})=>parent?.is !='image'
      // validation: (R) => R.required()
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'local',
      default: 'local',
      hidden: ({parent})=> parent?.is !== 'video',
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
      description: 'Mutes and autoplays the video rather than showing controls.',
      hidden: ({parent})=> parent?.is != 'video',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',

      hidden: ({parent}) =>  parent?.is !== 'video' || parent.type == 'local',
      // validation: (R) => R.required()
    },
    Object.assign(videoFile, { hidden: ({parent}) => parent?.is !== 'video' || parent.type !== 'local' }),

  ]
}
