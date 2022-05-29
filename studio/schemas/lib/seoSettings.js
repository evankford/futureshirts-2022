import slugify from "slugify";

export default [
  {
    name: 'seoTitle',
    title: 'Seo Title',
    type: 'string',
    defaultValue: ({parent, value}) => parent?.title,
    required: true,
    group: 'seo'
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    defaultValue: ({parent, value}) => parent?.seoTitle && slugify(parent.seoTitle),
    validate: R=>R.required(),
    group: 'seo',
    options: {
      derivedFrom: 'seoTitle'
    }
  },
  {
    name: 'seoImage',
    title: 'SEO Image',
    type: 'image',
    group: 'seo',
    defaultValue: ({parent, value}) => parent?.image
  },
  {
    name: 'seoDescription',
    title: 'Seo Description',
    type: 'text',
    description: '(Recommended) Defaults to a summary text from the page content.',
    group: 'seo'
  }
]

  const seoGroup = {
    name: 'seo',
    title: 'SEO'
  }

  export {seoGroup}