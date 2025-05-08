export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
          {title: 'Anchor', value: 'anchor'},
          {title: 'Submenu', value: 'submenu'}
        ]
      },
      layout: 'radio'
    },
    {
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      validation: (Rule) => {
        Rule.required().custom((anchor) => {
          if (anchor == undefined) {
            return true
          }
          return string[0] != '#'
            ? true
            : "Shouldn't include the '#' at the beginning of the anchor."
        })
      },
      hidden: ({parent, value}) => !value && !['anchor'].includes(parent.type)
    },
    {
      name: 'ref',
      title: 'Reference',
      type: 'reference',
      to: [
        {type: 'page'}
        // {type: 'news'}
      ],
      hidden: ({parent, value}) => !value && parent.type !== 'internal',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      hidden: ({parent, value}) => !value && parent.type !== 'external',
    },
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      hidden: ({parent, value}) => !value && parent.type !== 'external',
    },
    {
      name: 'submenus',
      title: "Submenu Items",
      type: 'array',
      of: [
        {type: 'menuItem'}
      ],
      hidden: ({parent, value}) => !value && parent?.type !== 'submenu'
    }
  ]
}