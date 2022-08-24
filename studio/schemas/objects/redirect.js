export default {
  type: 'object',
  name: 'redirect',
  title: 'Redirect',
  fields: [
    {
      name: 'source',
      type: 'text',
      description: 'Relative to the root URL of the site.',
      validation: (R)=>R.required()
    },
    {
      name: 'destination',
      type: 'text',
      description: 'Relative to the root URL of the site, or a different site if beginning with http',
      validation: (R)=>R.required()
    }
  ]
}