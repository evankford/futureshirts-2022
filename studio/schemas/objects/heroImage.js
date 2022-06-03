export default {
  type: 'object',
  name: 'heroImage',
  title: 'Hero Image',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      required: true,
      options: {
        hotspot: true,
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      required: true
    }
  ]
}