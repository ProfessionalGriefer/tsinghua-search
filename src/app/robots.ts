
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const url = "https://tsinghua-search.pages.dev";
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: url + '/sitemap.xml',
  }
}
