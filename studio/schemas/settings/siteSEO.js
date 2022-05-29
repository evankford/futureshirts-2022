  export default {
  name: 'siteSEO',
  title: 'Site settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },

    {
      name: 'nofollow',
      title: 'Disable Site Indexing?',
      type: 'boolean',
      description: 'Disables Google and others from indexing the site for search engines.',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
  ]
}