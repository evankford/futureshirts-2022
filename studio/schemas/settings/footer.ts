

export default {
  title: 'Footer',
  name: 'footer',
  type: 'document',

  fields: [
    {
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      description:
        "Will start with '© {{YEAR}} ', so should start with the copyright holder name, then any additional text",
    },
    {
      name: 'menuItems',
      title: 'Menu items',
      type: 'array',
      of: [{type: 'menuItem'}],
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string'
    }
  ]
}