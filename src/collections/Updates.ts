import type { CollectionConfig } from 'payload'

export const Updates: CollectionConfig = {
  slug: 'updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date'],
  },
  access: {
    read: () => true, // Allow public read access for marketing website
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'Update Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slugTitle',
      label: 'Slug Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'metaDescription',
      label: 'Meta Description',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
