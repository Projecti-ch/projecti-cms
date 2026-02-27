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
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Select or create a category for this project',
      },
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
    // Legacy section fields - hidden, kept for migration
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
