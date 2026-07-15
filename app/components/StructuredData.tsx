export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema
      {
        "@type": "Person",
        "@id": "https://www.djrockyworld.com/#person",
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
        "image": "https://www.djrockyworld.com/artwork.jpg",
        "url": "https://www.djrockyworld.com",
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
        "@id": "https://www.djrockyworld.com/#musicgroup",
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
          "url": "https://www.djrockyworld.com"
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
          "image": "https://www.djrockyworld.com/album-art.jpg",
          "url": "https://open.spotify.com/album/3ixKIxWyPdu5oocj3n5NID"
        }
      },
      
      // Website Schema
      {
        "@type": "WebSite",
        "@id": "https://www.djrockyworld.com/#website",
        "url": "https://www.djrockyworld.com",
        "name": "DJ Rocky Official Website",
        "description": "Official website of DJ Rocky - Future Afro pioneer, Ugandan DJ, producer, and global entertainer.",
        "publisher": {
          "@id": "https://www.djrockyworld.com/#person"
        },
        "inLanguage": "en-US",
        "copyrightYear": 2026,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.djrockyworld.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      
      // LocalBusiness Schema
      {
        "@type": "EntertainmentBusiness",
        "@id": "https://www.djrockyworld.com/#business",
        "name": "DJ Rocky Entertainment",
        "image": "https://www.djrockyworld.com/logo.svg",
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
        "url": "https://www.djrockyworld.com",
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
      
      // Event Schema for World Tour (keep as is)
      {
        "@type": "MusicEvent",
        "name": "DJ Rocky World Tour 2026",
        "description": "Experience the Future Afro sound live with DJ Rocky's world tour.",
        "image": "https://www.djrockyworld.com/tour-poster.jpg",
        "url": "https://www.djrockyworld.com/tour",
        "performer": {
          "@type": "MusicGroup",
          "name": "DJ Rocky",
          "url": "https://www.djrockyworld.com"
        },
        "organizer": {
          "@type": "Organization",
          "name": "WME Records",
          "url": "https://wmerecords.com"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.djrockyworld.com/events",
          "price": "50.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01T00:00"
        }
      },

      // 🆕 Event Schema for LUX IN NEVERLAND Launch
      {
        "@type": "MusicEvent",
        "name": "LUX IN NEVERLAND Launch",
        "description": "DJ Rocky presents the official launch of LUX IN NEVERLAND – a groundbreaking event showcasing the Future Afro sound. Featuring special performances, exclusive music drops, and immersive experiences.",
        "image": "https://www.djrockyworld.com/lux-in-neverland-poster.jpg",
        "url": "https://www.djrockyworld.com/events/lux-in-neverland",
        "startDate": "2026-08-22T19:00",
        "endDate": "2026-08-23T02:00",
        "location": {
          "@type": "Place",
          "name": "Kampala",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "UG"
          }
        },
        "performer": {
          "@type": "MusicGroup",
          "name": "DJ Rocky",
          "url": "https://www.djrockyworld.com"
        },
        "organizer": {
          "@type": "Organization",
          "name": "WME Records",
          "url": "https://wmerecords.com"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.djrockyworld.com/events",
          "price": "50000",
          "priceCurrency": "UGX",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-07-01T00:00"
        }
      },
      
      // FAQ Schema for common questions (unchanged)
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
      
      // Breadcrumb Schema (unchanged)
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.djrockyworld.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Music",
            "item": "https://www.djrockyworld.com/music"
          }
        ]
      },

      // ========== Ticket FAQs and HowTo (unchanged except domain) ==========
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I buy a ticket for an event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Visit the Events page, select your event, fill in your name, email, and phone, then reserve your ticket. You'll receive a confirmation email with your unique 10‑digit ticket number."
            }
          },
          {
            "@type": "Question",
            "name": "How do I verify my ticket is valid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Go to the Verify page, enter your 10‑digit ticket number, and check its status. If the ticket is reserved or sold, you can request contact details from the ticket holder."
            }
          },
          {
            "@type": "Question",
            "name": "What payment methods do you accept?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept payments via mobile money (MTN MoMo and Airtel Money). After reserving your ticket, our team will contact you to confirm payment."
            }
          },
          {
            "@type": "Question",
            "name": "Can I cancel my ticket reservation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can cancel your reservation by contacting our support team. Unpaid reservations may be cancelled automatically after a certain period."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to purchase a ticket for a DJ Rocky event",
        "description": "Step-by-step guide to reserving and paying for your ticket.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose your event",
            "text": "Go to the Events page and select the event you want to attend."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Reserve your ticket",
            "text": "Fill in your full name, email address, and phone number, then click 'Reserve Ticket'. You'll receive a reservation confirmation."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Pay via mobile money",
            "text": "After reserving, our coordinator will contact you to confirm payment via MTN MoMo or Airtel Money."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Receive your confirmed ticket",
            "text": "Once payment is confirmed, you'll receive a final confirmation email with your ticket number. Present this at the entrance."
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