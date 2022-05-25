import seoSettings, {seoGroup} from '../lib/seoSettings'

export default {
  name: 'news',
  title: 'News',
  type: 'document',
  groups: [
    {
      name: 'main',
      title: 'Main'
    },
    {
      name: 'content',
      title: 'Content'
    },
    {
      name: 'settings',
      title: 'Settings'
    },
    seoGroup
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: ['main'],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: ['main']
    },
    {
      name: 'image',
      title: 'image',
      type: 'picture',
      group: ['main']
    },
    {
      name: 'publishDate',
      title: 'Publish date',
      type: 'date',
      initialValue: new Date(),
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: ['main']
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      group: ['main'],
      of: [
        {type: 'picture'},
        {type: 'block'},
        {type: 'video'},
        {type: 'button'},
        { type: 'gallery'},
      ],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      group: ['settings'],
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    ...seoSettings
  ]
}
