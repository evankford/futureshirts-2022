export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  initialValue: {
    email: 'info@futureshirts.co',
    title: 'Get In Touch',
    successTitle: "We've got your message",
    successMessage: "We've got your message! We'll get to it as soon as we can!",
    errorTitle: 'Something went wrong...',
    errorMessage: "We couldn't send your message. Please reload this page and try again."
  },
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((email) => {
          if (typeof email == undefined) {
            return true
          }
          const regex =
            /[a-z0-9!#$%&'*+=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm
          if (regex.test(email)) {
            return true
          } else {
            return 'Please enter a valid email address'
          }
        })
    },
    {
      name: 'successTitle',
      title: 'Success Title',
      type: 'string',
      validation: (R) => R.required()
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      validation: (R) => R.required()
    },
    {
      name: 'errorTitle',
      title: 'Error Title',
      type: 'string',
      validation: (R) => R.required()
    },
    {
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      validation: (R) => R.required()
    }
  ]
}