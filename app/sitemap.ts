import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.djrockyworld.com'
  
  // Core pages
  const routes = [
    '',
    '/music',
    '/video',
    '/gallery',
    '/tour',
    '/bio',
    '/shop',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  // Additional pages with lower priority
  const secondaryRoutes = [
    '/privacy',
    '/terms',
    '/contact',
    '/booking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...routes, ...secondaryRoutes]
}