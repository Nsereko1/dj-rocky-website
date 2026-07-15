import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://djrocky.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DJ Rocky News & Updates</title>
    <description>Latest news, releases, and tour dates from DJ Rocky - Future Afro Pioneer</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <copyright>© ${new Date().getFullYear()} DJ Rocky / WME / BMLN. All Rights Reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <webMaster>djrockyug@gmail.com (DJ Rocky)</webMaster>
    <managingEditor>djrockyug@gmail.com (DJ Rocky)</managingEditor>
    <category>Music</category>
    <category>Entertainment</category>
    <generator>Next.js</generator>
    <ttl>60</ttl>
    
    <item>
      <title>New Album "Afro Evolution" Out Now</title>
      <description>Stream the latest album featuring the revolutionary Future Afro sound</description>
      <link>${baseUrl}/music</link>
      <guid isPermaLink="true">${baseUrl}/news/afro-evolution-album</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <source url="${baseUrl}/rss.xml">DJ Rocky News</source>
      <category>New Release</category>
      <enclosure url="${baseUrl}/album-art.jpg" length="0" type="image/jpeg"/>
    </item>
    
    <item>
      <title>World Tour 2026 Announced</title>
      <description>DJ Rocky announces global tour dates for 2026</description>
      <link>${baseUrl}/tour</link>
      <guid isPermaLink="true">${baseUrl}/news/world-tour-2026</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Tour</category>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}