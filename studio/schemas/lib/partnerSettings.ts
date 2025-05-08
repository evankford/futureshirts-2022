export default [
  {
    name: 'unfeaturedTitle',
    title: 'Title for non-featured partners',
    type: 'string',
    group: 'main',
    defaultValue: () => 'And many more wonderful partners',
    hidden: ({ document }) =>  document.slug?.current !== 'partners'
  },
  {
    name: 'includeContact',
    title: 'Include Contact Form?',
    type: 'boolean',
    group: 'main',
    defaultValue: ()=> true,
    hidden: ({ document }) =>  document.slug?.current !== 'partners'
  },
  {
    name: 'contactTitle',
    title: 'Contact Form Title',
    type: 'string',
    group: 'main',
    defaultValue: ()=> true,
    hidden: ({ document }) =>  document.slug?.current !== 'partners'
  }
]
