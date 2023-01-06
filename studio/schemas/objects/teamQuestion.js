export default {
  name: "teamQuestion",
  type: "object",
  title: "Team Member Question",
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: "string"
    }
  ]
}
