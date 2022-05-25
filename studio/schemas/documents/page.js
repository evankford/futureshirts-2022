
import seoSettings, {seoGroup} from "../lib/seoSettings";

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    {
    name: 'header',
    title: 'Header'
  },
    {
    name: 'content',
    title: 'Content'
  },
seoGroup,],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: ['header'],
      validate: R=>R.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: ['header']
    },
    {
      name: 'image',
      title: 'Image',
      type: 'picture',
      group: ['header'],
      options: {
        hotspot: true,
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    },
    ...seoSettings
  ]
};

