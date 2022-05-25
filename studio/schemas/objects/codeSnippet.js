export default {
  name: "codeSnippet",
  type: "object",
  title: "Button",
  fields: [
    {
      type: "boolean",
      name: "active",
      title: "Enable code snippet",
      initialValue: true
    },
    {
      type: "text",
      name: "title",
      title: "Code Snippet Title",
      initialValue: "Code Snippet"
    },
    {
      type: 'code',
      name: 'code',
      title: "Code Snippet",
      description: 'Inserted before the end of the </head> tag.',
      options: {
        language: 'html'
      }
    },
  ]
}