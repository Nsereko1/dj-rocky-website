import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ==========================================
      // ALL BOTS - Default Rule
      // ==========================================
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/dashboard/',
          '/*.json$',
          '/*.xml$',
          '/_next/',
        ],
      },
      
      // ==========================================
      // MAJOR SEARCH ENGINES
      // ==========================================
      
      // Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/gallery', '/tour'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/', '/video'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'APIs-Google',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Bing / Microsoft
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'BingPreview',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'MSNBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'MSNBot-Media',
        allow: ['/', '/gallery', '/video'],
        crawlDelay: 1,
      },
      {
        userAgent: 'AdIdxBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'BingAds',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Yahoo
      {
        userAgent: 'Slurp',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Yahoo! Slurp',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'YahooSeeker',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Yandex (Russia)
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'YandexImages',
        allow: ['/', '/gallery'],
        crawlDelay: 2,
      },
      {
        userAgent: 'YandexVideo',
        allow: ['/', '/video'],
        crawlDelay: 2,
      },
      {
        userAgent: 'YandexNews',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Baidu (China)
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Baiduspider-image',
        allow: ['/', '/gallery'],
        crawlDelay: 2,
      },
      {
        userAgent: 'Baiduspider-video',
        allow: ['/', '/video'],
        crawlDelay: 2,
      },
      
      // DuckDuckGo
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckGo-Favicons-Bot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Other Search Engines
      {
        userAgent: 'Barkrowler',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Exabot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Sogou',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Sogou web spider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Sosospider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'YoudaoBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Naverbot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Daumoa',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'SeznamBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'MojeekBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Qwantify',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Swisscows',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Ecosia',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 3,
      },
      
      // ==========================================
      // SOCIAL MEDIA BOTS
      // ==========================================
      
      // X / Twitter
      {
        userAgent: 'Twitterbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Twitterbot/1.0',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'X-Bot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Meta / Facebook / Instagram
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Facebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookcatalog',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Instagram',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        crawlDelay: 1,
      },
      
      // LinkedIn
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Pinterest
      {
        userAgent: 'Pinterest',
        allow: ['/', '/gallery', '/tour'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Pinterestbot',
        allow: ['/', '/gallery', '/tour'],
        crawlDelay: 1,
      },
      
      // Reddit
      {
        userAgent: 'RedditBot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // TikTok
      {
        userAgent: 'TikTokBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Bytedance',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Discord
      {
        userAgent: 'Discordbot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Telegram
      {
        userAgent: 'TelegramBot',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Slack
      {
        userAgent: 'Slackbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Slack-ImgProxy',
        allow: ['/', '/gallery'],
        crawlDelay: 1,
      },
      
      // Snapchat
      {
        userAgent: 'Snapchat',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Snap URL Preview Service',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Tumblr
      {
        userAgent: 'Tumblr',
        allow: '/',
        crawlDelay: 1,
      },
      
      // VKontakte (VK)
      {
        userAgent: 'VKShare',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'VKRobot',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Line
      {
        userAgent: 'Line',
        allow: '/',
        crawlDelay: 1,
      },
      
      // WeChat
      {
        userAgent: 'WeChat',
        allow: '/',
        crawlDelay: 2,
      },
      
      // QQ
      {
        userAgent: 'QQBrowser',
        allow: '/',
        crawlDelay: 2,
      },
      
      // ==========================================
      // AI & LLM CRAWLERS
      // ==========================================
      
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Google AI
      {
        userAgent: 'Google-Extended',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'GoogleOther-Image',
        allow: ['/', '/gallery'],
        crawlDelay: 2,
      },
      {
        userAgent: 'GoogleOther-Video',
        allow: ['/', '/video'],
        crawlDelay: 2,
      },
      
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'CohereBot',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Apple
      {
        userAgent: 'Applebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'AppleNewsBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Apple-PubSub',
        allow: '/',
        crawlDelay: 1,
      },
      
      // Amazon
      {
        userAgent: 'Amazonbot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Amazon Alexa',
        allow: '/',
        crawlDelay: 2,
      },
      
      // Other AI Bots
      {
        userAgent: 'YouBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'AndiBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'ExaBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Meta-ExternalFetcher',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'KagiBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'PhindBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'PetalBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Brightbot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'AwarioRssBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'AwarioSmartBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'DataForSeoBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'magpie-crawler',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'omgili',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'omgilibot',
        allow: '/',
        crawlDelay: 3,
      },
      
      // ==========================================
      // SEO & MARKETING TOOLS
      // ==========================================
      
      // Ahrefs
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'AhrefsSiteAudit',
        allow: '/',
        crawlDelay: 3,
      },
      
      // SEMrush
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'SemrushBot-SA',
        allow: '/',
        crawlDelay: 3,
      },
      
      // Moz
      {
        userAgent: 'MozBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'rogerbot',
        allow: '/',
        crawlDelay: 3,
      },
      
      // Majestic
      {
        userAgent: 'MJ12bot',
        allow: '/',
        crawlDelay: 3,
      },
      
      // Other SEO Tools
      {
        userAgent: 'Screaming Frog SEO Spider',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'Sitebulb',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'DotBot',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'MegaIndex.ru',
        allow: '/',
        crawlDelay: 3,
      },
      {
        userAgent: 'SeekportBot',
        allow: '/',
        crawlDelay: 3,
      },
      
      // ==========================================
      // ARCHIVE & RESEARCH BOTS
      // ==========================================
      
      // Internet Archive
      {
        userAgent: 'ia_archiver',
        allow: '/',
        crawlDelay: 5,
      },
      {
        userAgent: 'Wayback Save Page',
        allow: '/',
        crawlDelay: 5,
      },
      
      // Common Crawl
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 5,
      },
      
      // ==========================================
      // MONITORING & SECURITY
      // ==========================================
      
      // Uptime Monitoring
      {
        userAgent: 'UptimeRobot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Pingdom',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'StatusCake',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Better Uptime Bot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Site24x7',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Freshping',
        allow: '/',
        crawlDelay: 10,
      },
    ],
    
    // Sitemap location
    sitemap: 'https://www.djrockyworld.com/sitemap.xml',
    
    // Host declaration
    host: 'https://www.djrockyworld.com',
  }
}