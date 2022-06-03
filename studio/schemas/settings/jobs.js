export default {
  name: 'jobs',
  title: 'Careers',
  type: 'document',
  initialValue: {
    email: 'info@futureshirts.com',
    title: 'Apply Now',
    successTitle: "We've got your application",
    successMessage: "Thanks for your time! We'll get to it as soon as we can!",
    errorTitle: 'Something went wrong...',
    errorMessage: "We couldn't send your application. Please reload this page and try again.",
    haveOpeningsTitle: 'Accepting Applications',
    haveOpenings: 'We currently are accepting job applications for the following openings. Read on, fill out the form below, and let\'s see if you\'d make a good fit for the Gross Labs team!',
    noCurrentOpeningsTitle: 'No Current Openings',
    noCurrentOpenings: 'Check back later to see if we\'re accepting applications!',
  },
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'messages',
      title: 'Messages'
    }
  ],
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'content',
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
      name: 'title',
      title: 'Form Title',
      type: 'string',
      group: 'content',
      validation: (R) => R.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}]
     },
    {
      name: 'openings',
      title: 'Openings',
      type: 'array',
      group: 'content',
      of: [{type: 'job'}]
    },
    {
      name: 'haveOpeningsTitle',
      title: 'Have Openings Title',
      type: 'string',
      group: 'messages',
    },
    {
      name: 'haveOpenings',
      title: 'Have Openings',
      type: 'text',
      group: 'messages',
    },
    {
      name: 'noCurrentOpenings',
      title: 'No Current Openings',
      type: 'text',
      group: 'messages',
    },
    {
      name: 'noCurrentOpeningsTitle',
      title: 'No Current Openings Title',
      type: 'string',
      group: 'messages',
    },
    {
      name: 'successTitle',
      title: 'Success Title',
      type: 'string',
      group: 'messages',
      validation: (R) => R.required()
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      group: 'messages',
      validation: (R) => R.required()
    },
    {
      name: 'errorTitle',
      title: 'error Title',
      type: 'string',
      group: 'messages',
      validation: (R) => R.required()
    },
    {
      name: 'errorMessage',
      title: 'error Message',
      type: 'text',
      group: 'messages',
      validation: (R) => R.required()
    }
  ]
}