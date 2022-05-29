export default {
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',

  fields: [
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{type: 'socialLink'}]
    },
    {
      name: 'image',
      title: 'Site Image',
      type: 'image',
      description: 'Default SEO-embed image for sitewide. Also the default for each page.'
    }
  ]
}