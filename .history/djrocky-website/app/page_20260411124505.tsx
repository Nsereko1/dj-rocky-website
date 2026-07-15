"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);

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
                <DropdownItem onClick={() => setIsBioOpen(true)}>Bio</DropdownItem>
              </DropdownMenu>
            </div>

            {/* Contact Number */}
            <div className="text-gray-900 dark:text-white text-sm sm:text-base">
              <span className="hidden sm:inline">📞 Tyla (917) 920-2019</span>
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
                  setIsBioOpen(true);
                  setIsMenuOpen(false);
                }}>Bio</MobileMenuItem>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-screen w-full pt-16 sm:pt-0">
        <Image
          src="/artwork.jpg"
          alt="DJ Rocky"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Bio Modal/Dialog */}
      {isBioOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsBioOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 18" />
              </svg>
            </button>

            {/* Bio Content */}
            <div className="p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                DJ ROCKY - BIOGRAPHY
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  DJ Rocky is an internationally renowned DJ and music producer who has been taking the music world by storm. With a unique blend of electronic, hip-hop, and Latin rhythms, Rocky creates an unforgettable experience wherever he performs.
                </p>
                
                <p>
                  Born and raised in New York City, DJ Rocky discovered his passion for music at an early age. He started DJing at local parties and clubs, quickly gaining recognition for his energetic sets and seamless mixing skills.
                </p>
                
                <p>
                  Over the years, DJ Rocky has performed at some of the most prestigious venues and festivals worldwide, including Tomorrowland, Ultra Music Festival, and EDC Las Vegas. He has shared the stage with industry giants like Diplo, Marshmello, and DJ Snake.
                </p>
                
                <p>
                  His debut album "Rise Up" topped the charts in 15 countries, featuring collaborations with top artists like Bad Bunny, Drake, and Rosalía. With millions of streams across all platforms, DJ Rocky continues to push the boundaries of electronic music.
                </p>
                
                <p>
                  When he's not in the studio or on tour, DJ Rocky dedicates his time to his music academy, helping aspiring DJs learn the craft and break into the industry. His passion for music and mentorship has inspired a new generation of artists.
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Achievements:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>🎵 3x Grammy Award Winner</li>
                    <li>🎵 Billboard Music Award for Best Electronic Artist</li>
                    <li>🎵 Over 50 million streams worldwide</li>
                    <li>🎵 Headlined over 200 festivals globally</li>
                    <li>🎵 #1 DJ in Latin America (2024-2025)</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Booking & Contact:
                  </h3>
                  <p>
                    For booking inquiries, please contact:<br />
                    📞 Tyla (917) 920-2019<br />
                    ✉️ booking@djrockyworld.com
                  </p>
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
              <p>© 2026 Sony Music Entertainment. All Rights Reserved.</p>
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
            
            <div className="text-center">
              <p>Built by <span className="text-purple-600 dark:text-purple-400">45PRESS</span></p>
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