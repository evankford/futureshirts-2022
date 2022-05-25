export default {
  title: 'Header',
  name: 'header',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],

  fields: [
    {
      name: 'useDynamicLogo',
      title: 'Use Dynamic Logo',
      type: 'boolean',
      description: 'Use hard-coded dynamic logo',
    },
    {
      name: 'staticLogo',
      title: 'Static logo',
      type: 'picture',
      hidden: ({parent, value}) => !value && parent?.useDynamicLogo,
    },

    {
      name: 'menuItems',
      title: 'Menu items',
      type: 'array',
      of: [{type: 'menuItem'}],
    }
  ]
}