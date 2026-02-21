import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'date'],
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
      label: 'Project Title',
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
      name: 'heroImage',
      label: 'Hero Image / Thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      label: 'Project Category',
      type: 'select',
      options: [
        { label: 'Planung', value: 'planung' },
        { label: 'Analyse', value: 'analyse' },
      ],
      required: true,
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
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
