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
    // Content Sections (dynamic array)
    {
      name: 'sections',
      label: 'Content Sections',
      type: 'array',
      admin: {
        description: 'Add as many content sections as needed',
      },
      fields: [
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
        },
        {
          name: 'body',
          label: 'Section Content',
          type: 'richText',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image2',
          label: 'Image 2 (Optional)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Add a second image for side-by-side layout',
          },
        },
      ],
    },
    // Legacy fields - hidden, kept for migration
    {
      name: 'content',
      type: 'richText',
      admin: { hidden: true },
    },
    {
      name: 'sectionOne',
      type: 'group',
      admin: { hidden: true },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sectionTwo',
      type: 'group',
      admin: { hidden: true },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'image2', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sectionThree',
      type: 'group',
      admin: { hidden: true },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
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
