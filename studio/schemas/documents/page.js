
import Image from '../lib/image';
import seoSettings, {seoGroup} from "../lib/seoSettings";

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
  {
    name: 'main',
    title: 'Main',
    default: true
  },

seoGroup,
],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: ['main'],
      validate: R=>R.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: ['main']
    },
    {...Image, group: 'main' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      group: ['main'],
      of: [
        {
          type: 'block'
        }
      ]
    },
    ...seoSettings
  ]
};

