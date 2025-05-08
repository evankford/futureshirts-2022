export default {
  name: 'category',
  title: 'Category',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'name',
      title: 'name',
      type: 'reference',
      to: [{ type: 'page' }],
    },
  ],
}