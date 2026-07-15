import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/ModalContext";
import StructuredData from "./components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "./components/CookieConsent";
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // <-- new import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration for mobile
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Comprehensive metadata for global SEO
export const metadata: Metadata = {
  // Primary metadata
  title: {
    default: "DJ Rocky | Future Afro Pioneer | Ugandan DJ & Producer",
    template: "%s | DJ Rocky",
  },
  description: "DJ Rocky - Busuulwa Peter Nsereko, pioneering Future Afro sound. , producer, software engineer & entrepreneur. Book now for international events, festivals, and exclusive performances. New album 'Afro Evolution' out now.",
  
  // Application metadata
  applicationName: "DJ Rocky Official",
  generator: "Next.js",
  keywords: [
    "DJ Rocky", "Ugandan DJ", "Future Afro", "African EDM", "DJ Producer", 
    "Uganda music", "African music", "Dancehall fusion", "Electronic music Africa",
    "Busuulwa Peter Nsereko", "WME Records", "BMLN Music", "African entertainment",
    "best DJ Uganda", "top African DJ", "international DJ", "music producer Uganda",
    "AfroBeats DJ", "EDM Africa", "festival DJ", "club DJ Kampala"
  ],
  authors: [{ name: "DJ Rocky", url: "https://www.djrockyworld.com" }],
  creator: "DJ Rocky",
  publisher: "WME Records",
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
    date: true,
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "DJ Rocky | Future Afro Pioneer | World-Class Dj",
    description: "Experience the revolutionary Future Afro sound. DJ Rocky - Ugandan DJ, producer, and global entertainer. Book for your next event.",
    url: "https://www.djrockyworld.com",
    siteName: "DJ Rocky Official",
    images: [
      {
        url: "https://www.djrockyworld.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Rocky - Future Afro Pioneer",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["djrockyug@gmail.com"],
    phoneNumbers: ["+256703587550"],
    countryName: "Uganda",
  },
  
  // Twitter/X Cards
  twitter: {
    card: "summary_large_image",
    title: "DJ Rocky | Future Afro Pioneer",
    description: "Ugandan DJ & Producer. Future Afro sound. Book now for global events.",
    creator: "@djrockyug",
    site: "@djrockyug",
    images: [
      {
        url: "https://www.djrockyworld.com/twitter-card.jpg",
        width: 800,
        height: 418,
        alt: "DJ Rocky - Live Performance",
      },
    ],
  },
  
  // Verification for search engines
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
    other: {
      "msvalidate.01": "YOUR_BING_VERIFICATION_CODE",
      "facebook-domain-verification": "YOUR_FACEBOOK_VERIFICATION_CODE",
    },
  },
  
  // Apple specific
  appleWebApp: {
    capable: true,
    title: "DJ Rocky",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  
  // App Links
  appLinks: {
    ios: {
      url: "https://apps.apple.com/app/dj-rocky/id123456789",
      app_store_id: "123456789",
    },
    android: {
      package: "com.djrocky.app",
      app_name: "DJ Rocky Official",
    },
    web: {
      url: "https://www.djrockyworld.com",
      should_fallback: true,
    },
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Category and classification
  category: "Entertainment",
  classification: "Music Artist, DJ, Producer",
  
  // Other metadata
  alternates: {
    canonical: "https://www.djrockyworld.com",
    languages: {
      "en-US": "https://www.djrockyworld.com",
      "en-GB": "https://www.djrockyworld.com/uk",
      "fr-FR": "https://www.djrockyworld.com/fr",
    },
  },
  
  // Assets
  assets: [
    "https://www.djrockyworld.com/artwork.jpg",
    "https://www.djrockyworld.com/logo.svg",
  ],
  
  // Archives
  archives: [
    "https://www.djrockyworld.com/archive/2024",
    "https://www.djrockyworld.com/archive/2025",
  ],
  
  // Bookmark
  bookmarks: [
    "https://www.djrockyworld.com/music",
    "https://www.djrockyworld.com/video",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.scdn.co" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="DJ Rocky News RSS" href="/rss.xml" />
        
        {/* Umami Analytics - Privacy-focused tracking */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="43a4ba47-0beb-4b09-afbd-983bfb294c24"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SessionProviderWrapper>
          <StructuredData />
          <ModalProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </ModalProvider>
          <Analytics />
          
          <SpeedInsights />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}