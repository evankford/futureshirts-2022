import slugify from "slugify";

export default [
  {
    name: 'seoTitle',
    title: 'Seo Title',
    type: 'string',
    defaultValue: ({parent}) => parent?.title,
    group: 'seo'
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    defaultValue: ({parent}) => parent?.seoTitle && slugify(parent.seoTitle),
    validate: R=>R.required(),
    group: ['seo'],
    options: {
      derivedFrom: 'seoTitle'
    }
  },
  {
    name: 'seoImage',
    title: 'SEO Image',
    type: 'image',
    group: 'seo',
    defaultValue: ({parent}) => parent?.image
  },
  {
    name: 'seoDescription',
    title: 'Seo Description',
    type: 'text',
    description: '(Recommended) Defaults to a summary text from the page content.',
    group: 'seo'
  },
  {
    name: 'nofollow',
    title: 'Hide from Search Engines?',
    type: 'boolean',
    group: 'seo'
  }
]

  const seoGroup = {
    name: 'seo',
    title: 'SEO'
  }

  export {seoGroup}
