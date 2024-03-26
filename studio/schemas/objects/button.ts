import linkUrl from "../lib/linkUrl";

export default {
  name: "button",
  type: "object",
  title: "Button",
  fields: [
    {
      name: 'title',
      title: 'Button Title',
      type: 'string',
    },
    linkUrl
    //TODO could add style here
  ]
}