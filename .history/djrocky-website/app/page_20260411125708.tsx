"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation with Dropdown */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur z-50 border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              DJ ROCKY
            </h1>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-900 dark:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <DropdownMenu title="Menu">
                <DropdownItem href="#">Music</DropdownItem>
                <DropdownItem href="#">Videos</DropdownItem>
                <DropdownItem href="#">Gallery</DropdownItem>
                <DropdownItem href="#">Shop</DropdownItem>
                <DropdownItem href="#">Tour</DropdownItem>
                <DropdownItem onClick={() => setShowBio(true)}>Bio</DropdownItem>
              </DropdownMenu>
            </div>

            {/* Contact Number */}
            <div className="text-gray-900 dark:text-white text-sm sm:text-base">
              <span className="hidden sm:inline">📞 DJ Rocky (256) 703-587550</span>
              <span className="sm:hidden">📞</span>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <div className="flex flex-col space-y-3">
                <MobileMenuItem href="#">Music</MobileMenuItem>
                <MobileMenuItem href="#">Videos</MobileMenuItem>
                <MobileMenuItem href="#">Gallery</MobileMenuItem>
                <MobileMenuItem href="#">Shop</MobileMenuItem>
                <MobileMenuItem href="#">Tour</MobileMenuItem>
                <MobileMenuItem onClick={() => {
                  setShowBio(true);
                  setIsMenuOpen(false);
                }}>Bio</MobileMenuItem>
              </div>
            </div>
          )}
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
            {/* Back Button */}
            <button
              onClick={() => setShowBio(false)}
              className="mb-8 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>

            {/* Bio Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                DJ ROCKY
              </h1>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold">
                Busuulwa Peter Nsereko
              </p>
              
              <div className="h-1 w-20 bg-purple-600 dark:bg-purple-400 rounded-full my-6"></div>
              
              <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Busuulwa Peter Nsereko</span>, professionally known as <span className="font-bold text-purple-600 dark:text-purple-400">DJ Rocky</span>, is a Ugandan DJ, Producer, Software Engineer, Entrepreneur & Philanthropist. Born on November 21st in Kampala, he has emerged as one of Africa's dynamic Creators, forging a bold Kool sound he calls <span className="font-bold text-purple-600 dark:text-purple-400">"Future Afro"</span> — a fusion of Dancehall, EDM, AfroBeats, Hip-Hop, and Pop Culture that transcends Borders and Generations.
                </p>

                <p>
                  From his early stage experimenting with Beats and Production, DJ Rocky bridges Cultures. Known for collaborating with diverse artists on groundbreaking records, he delivers energetic stage performances, captivating audiences with electric and transformative shows.
                </p>

                <p>
                  His signature sound, <span className="font-bold text-purple-600 dark:text-purple-400">Future Afro</span>, represents the evolution of African music — blending traditional rhythms with modern electronic production, creating a unique sonic experience that resonates globally.
                </p>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl my-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🎵 Beyond the Music
                  </h2>
                  <p>
                    Beyond the studio and stage, DJ Rocky has founded <span className="font-bold text-purple-600 dark:text-purple-400">WME Records</span> and <span className="font-bold text-purple-600 dark:text-purple-400">BMLN Music Cosmos</span>, platforms designed to mentor emerging talent, empower artists, and cultivate creativity across Africa and the globe.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 my-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Achievements</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Pioneer of Future Afro Sound</li>
                      <li>Founder of WME Records</li>
                      <li>International Performer</li>
                      <li>Tech & Music Innovator</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mission</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Empower African Artists</li>
                      <li>Bridge Global Cultures</li>
                      <li>Innovate Music Production</li>
                      <li>Philanthropic Initiatives</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Booking & Contact
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    For booking inquiries, collaborations, and press:<br />
                    <span className="font-semibold">📞 DJ Rocky (256) 703-587550</span><br />
                    <span className="font-semibold">✉️ djrockyug@gmail.com</span>
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 inline-block">
                    Book Now
                  </a>
                  <a 
                    href="https://open.spotify.com/artist/0G55Xq51I94cNd8Qw1zY7R" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-bold py-3 px-6 rounded-full transition inline-block"
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
      <footer className="bg-gray-50 dark:bg-black text-gray-600 dark:text-white/70 py-6 sm:py-8 text-xs sm:text-sm border-t border-gray-200 dark:border-white/10">
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

// Dropdown Component
function DropdownMenu({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition font-medium">
        {title} ▼
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black/95 backdrop-blur border border-gray-200 dark:border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {children}
      </div>
    </div>
  );
}

function DropdownItem({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left block px-4 py-2 text-gray-700 dark:text-white hover:bg-purple-600 hover:text-white transition first:rounded-t-lg last:rounded-b-lg"
      >
        {children}
      </button>
    );
  }
  
  return (
    <a
      href={href}
      className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-purple-600 hover:text-white transition first:rounded-t-lg last:rounded-b-lg"
    >
      {children}
    </a>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left py-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition text-lg"
      >
        {children}
      </button>
    );
  }
  
  return (
    <a
      href={href}
      className="block py-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition text-lg"
    >
      {children}
    </a>
  );
}