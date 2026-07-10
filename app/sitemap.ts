import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://alainwater.com/ar', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://alainwater.com/ar/products', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://alainwater.com/ar/our-story', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://alainwater.com/ar/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
