export default {
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],

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
      type: 'picture',
      description: 'Default SEO-embed image for sitewide. Also the default for each page.'
    }
  ]
}