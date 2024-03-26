import linkUrl from "../lib/linkUrl"

export default {
  name: 'menuItem',
  title: 'Menu item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    linkUrl
  ],
}