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
    }
  ]
}