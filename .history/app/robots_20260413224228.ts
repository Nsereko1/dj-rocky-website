import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://djrocky.com/sitemap.xml',
    host: 'https://djrocky.com',
  }
}