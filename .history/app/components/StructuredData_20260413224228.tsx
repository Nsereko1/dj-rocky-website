export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema
      {
        "@type": "Person",
        "@id": "https://djrocky.com/#person",
        "name": "DJ Rocky",
        "alternateName": "Busuulwa Peter Nsereko",
        "givenName": "Peter",
        "familyName": "Nsereko",
        "birthDate": "1990-11-21",
        "birthPlace": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "UG"
          }
        },
        "nationality": "Ugandan",
        "jobTitle": ["DJ", "Music Producer", "Software Engineer", "Entrepreneur"],
        "description": "DJ Rocky is a Ugandan DJ and producer pioneering the Future Afro sound, blending Dancehall, EDM, AfroBeats, and Hip-Hop.",
        "image": "https://djrocky.com/artwork.jpg",
        "url": "https://djrocky.com",
        "sameAs": [
          "https://open.spotify.com/artist/0G55Xq51I94cNd8Qw1zY7R",
          "https://www.youtube.com/@djrockyug",
          "https://www.instagram.com/djrockyug",
          "https://twitter.com/djrockyug",
          "https://www.facebook.com/djrockyug",
          "https://soundcloud.com/djrockyug",
          "https://music.apple.com/artist/dj-rocky",
          "https://www.tiktok.com/@djrockyug"
        ],
        "knowsLanguage": ["en", "lg", "sw"],
        "alumniOf": {
          "@type": "Organization",
          "name": "Makerere University",
          "url": "https://www.mak.ac.ug"
        },
        "worksFor": [
          {
            "@type": "Organization",
            "name": "WME Records",
            "url": "https://wmerecords.com"
          },
          {
            "@type": "Organization",
            "name": "BMLN Music Cosmos",
            "url": "https://bmlnmusic.com"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "booking",
          "telephone": "+256-703-587550",
          "email": "djrockyug@gmail.com",
          "availableLanguage": ["English", "Luganda"]
        }
      },
      
      // MusicGroup Schema
      {
        "@type": "MusicGroup",
        "@id": "https://djrocky.com/#musicgroup",
        "name": "DJ Rocky",
        "genre": ["Future Afro", "AfroBeats", "EDM", "Dancehall", "Hip-Hop"],
        "foundingDate": "2015",
        "foundingLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "UG"
          }
        },
        "member": {
          "@type": "Person",
          "name": "DJ Rocky",
          "url": "https://djrocky.com"
        },
        "track": {
          "@type": "MusicRecording",
          "name": "Future Afro Anthem",
          "url": "https://open.spotify.com/track/example",
          "duration": "PT3M30S"
        },
        "album": {
          "@type": "MusicAlbum",
          "name": "Afro Evolution",
          "@id": "https://open.spotify.com/album/3ixKIxWyPdu5oocj3n5NID",
          "numTracks": 12,
          "datePublished": "2025",
          "byArtist": {
            "@type": "MusicGroup",
            "name": "DJ Rocky"
          },
          "image": "https://djrocky.com/album-art.jpg",
          "url": "https://open.spotify.com/album/3ixKIxWyPdu5oocj3n5NID"
        }
      },
      
      // Website Schema
      {
        "@type": "WebSite",
        "@id": "https://djrocky.com/#website",
        "url": "https://djrocky.com",
        "name": "DJ Rocky Official Website",
        "description": "Official website of DJ Rocky - Future Afro pioneer, Ugandan DJ, producer, and global entertainer.",
        "publisher": {
          "@id": "https://djrocky.com/#person"
        },
        "inLanguage": "en-US",
        "copyrightYear": 2026,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://djrocky.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      
      // LocalBusiness Schema
      {
        "@type": "EntertainmentBusiness",
        "@id": "https://djrocky.com/#business",
        "name": "DJ Rocky Entertainment",
        "image": "https://djrocky.com/logo.svg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot 23, Kampala Road",
          "addressLocality": "Kampala",
          "addressRegion": "Central",
          "postalCode": "256",
          "addressCountry": "UG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 0.3476,
          "longitude": 32.5825
        },
        "url": "https://djrocky.com",
        "telephone": "+256703587550",
        "priceRange": "$$-$$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "sameAs": [
          "https://www.instagram.com/djrockyug",
          "https://www.facebook.com/djrockyug"
        ]
      },
      
      // Event Schema for Tours
      {
        "@type": "MusicEvent",
        "name": "DJ Rocky World Tour 2026",
        "description": "Experience the Future Afro sound live with DJ Rocky's world tour.",
        "image": "https://djrocky.com/tour-poster.jpg",
        "url": "https://djrocky.com/tour",
        "performer": {
          "@type": "MusicGroup",
          "name": "DJ Rocky",
          "url": "https://djrocky.com"
        },
        "organizer": {
          "@type": "Organization",
          "name": "WME Records",
          "url": "https://wmerecords.com"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://djrocky.com/tickets",
          "price": "50.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01T00:00"
        }
      },
      
      // FAQ Schema for common questions
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I book DJ Rocky for an event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contact us at djrockyug@gmail.com or call +256 703 587550 for booking inquiries."
            }
          },
          {
            "@type": "Question",
            "name": "What is Future Afro music?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Future Afro is a genre pioneered by DJ Rocky, blending Dancehall, EDM, AfroBeats, Hip-Hop, and Pop Culture."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I stream DJ Rocky's music?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DJ Rocky's music is available on Spotify, Apple Music, YouTube Music, and all major streaming platforms."
            }
          }
        ]
      },
      
      // Breadcrumb Schema
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://djrocky.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Music",
            "item": "https://djrocky.com/music"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}