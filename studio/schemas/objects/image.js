//Only used in arrays

export default {
  type: 'object',
  name: 'picture',
  title: 'Image',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Optional'
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Photo Attribution'
    }
  ],
  options: {
    hotspot: true
  },
  preview: {
    select: {
      media: 'asset',
      title: 'alt',
    },
  }
}