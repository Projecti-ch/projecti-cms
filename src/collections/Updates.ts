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
      admin: {
        description: 'Legacy content field - use sections below for new updates',
      },
    },
    // Section One
    {
      name: 'sectionOne',
      label: 'Section One',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // Section Two
    {
      name: 'sectionTwo',
      label: 'Section Two',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image2',
          label: 'Image 2',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // Section Three
    {
      name: 'sectionThree',
      label: 'Section Three',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
      ],
    },
    // Gallery
    {
      name: 'gallery',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
