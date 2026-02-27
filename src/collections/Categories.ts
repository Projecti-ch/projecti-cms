import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug'],
    group: 'Settings',
  },
  access: {
    read: () => true, // Allow public read access for marketing website
  },
  fields: [
    {
      name: 'label',
      label: 'Display Name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name shown to users (e.g., "Planung", "Analyse")',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "planung", "analyse")',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Optional description for this category',
      },
    },
  ],
}
