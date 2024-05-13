import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://tsinghua-search.pages.dev";
  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: url + '/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
