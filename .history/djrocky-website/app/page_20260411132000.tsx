"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation - Almost Transparent */}
      <nav className="fixed top-0 left-0 right-0 bg-white/5 dark:bg-black/5 backdrop-blur-md z-50 border-b border-white/10 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Menu with Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition font-medium text-lg cursor-pointer">
                MENU <span className="text-sm">▼</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <DropdownItem href="#">Music</DropdownItem>
                <DropdownItem href="#">Videos</DropdownItem>
                <DropdownItem href="#">Gallery</DropdownItem>
                <DropdownItem href="#">Shop</DropdownItem>
                <DropdownItem href="#">Tour</DropdownItem>
                <DropdownItem onClick={() => setShowBio(true)}>Bio</DropdownItem>
              </div>
            </div>

            {/* Center - DJ ROCKY (Home Button) */}
            <button 
              onClick={() => setShowBio(false)}
              className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
            >
              DJ ROCKY
            </button>

            {/* Contact Number - Right Side */}
            <div className="text-gray-900 dark:text-white text-sm">
              <span>📞 (256) 703-587550</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Either Hero Image or Bio */}
      {!showBio ? (
        // Hero Image
        <div className="relative h-screen w-full pt-16 sm:pt-0">
          <Image
            src="/artwork.jpg"
            alt="DJ Rocky"
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        // Bio Section - Plain background
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            {/* Bio Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold">
                Busuulwa Peter Nsereko
              </p>
              
              <div className="h-1 w-20 bg-gray-800 dark:bg-gray-600 rounded-full my-6"></div>
              
              <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <p className="font-bold">
                  <span className="font-bold text-gray-900 dark:text-white">Busuulwa Peter Nsereko</span>, professionally known as <span className="font-bold text-gray-800 dark:text-gray-400">DJ Rocky</span>, is a Ugandan DJ, Producer, Software Engineer, Entrepreneur & Philanthropist. Born on November 21st in Kampala, he has emerged as one of Africa's dynamic Creators, forging a bold Kool sound he calls <span className="font-bold text-gray-800 dark:text-gray-400">"Future Afro"</span> — a fusion of Dancehall, EDM, AfroBeats, Hip-Hop, and Pop Culture that transcends Borders and Generations.
                </p>

                <p className="font-bold">
                  From his early stage experimenting with Beats and Production, DJ Rocky bridges Cultures. Known for collaborating with diverse artists on groundbreaking records, he delivers energetic stage performances, captivating audiences with electric and transformative shows.
                </p>

                <p className="font-bold">
                  His signature sound, <span className="font-bold text-gray-800 dark:text-gray-400">Future Afro</span>, represents the evolution of African music — blending traditional rhythms with modern electronic production, creating a unique sonic experience that resonates globally.
                </p>

                <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-xl my-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🎵 Beyond the Music
                  </h2>
                  <p className="font-bold">
                    Beyond the studio and stage, DJ Rocky has founded <span className="font-bold text-gray-800 dark:text-gray-400">WME Records</span> and <span className="font-bold text-gray-800 dark:text-gray-400">BMLN Music Cosmos</span>, platforms designed to mentor emerging talent, empower artists, and cultivate creativity across Africa and the globe.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 my-6">
                  <div className="bg-gray-100 dark:bg-gray-900/50 p-5 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Achievements</h3>
                    <ul className="space-y-2 list-disc list-inside font-bold">
                      <li>Pioneer of Future Afro Sound</li>
                      <li>Founder of WME Records</li>
                      <li>International Performer</li>
                      <li>Tech & Music Innovator</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-900/50 p-5 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mission</h3>
                    <ul className="space-y-2 list-disc list-inside font-bold">
                      <li>Empower African Artists</li>
                      <li>Bridge Global Cultures</li>
                      <li>Innovate Music Production</li>
                      <li>Philanthropic Initiatives</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-900/50 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Booking & Contact
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">
                    For booking inquiries, collaborations, and press:<br />
                    <span className="font-semibold">📞 (256) 703-587550</span><br />
                    <span className="font-semibold">✉️ djrockyug@gmail.com</span>
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href="#" className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 inline-block">
                    Book Now
                  </a>
                  <a 
                    href="https://open.spotify.com/artist/0G55Xq51I94cNd8Qw1zY7R" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-400 hover:bg-gray-800 hover:text-white font-bold py-3 px-6 rounded-full transition inline-block"
                  >
                    Listen on Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white/70 py-6 sm:py-8 text-xs sm:text-sm border-t border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <p>© 2026 DJ Rocky / WME / BMLN. All Rights Reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Send Us Feedback</a>
              <span className="hidden xs:inline">|</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a>
              <span className="hidden xs:inline">|</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">How We Use Your Data</a>
              <span className="hidden sm:inline">|</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Do Not Sell My Personal Information</a>
              <span className="hidden lg:inline">|</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Your California Privacy Rights</a>
              <span className="hidden xs:inline">|</span>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dropdown Item Component
function DropdownItem({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition first:rounded-t-lg last:rounded-b-lg cursor-pointer"
      >
        {children}
      </button>
    );
  }
  
  return (
    <a
      href={href}
      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition first:rounded-t-lg last:rounded-b-lg cursor-pointer"
    >
      {children}
    </a>
  );
}