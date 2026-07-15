"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);
  const openModal = (type: string) => setActiveModal(type);

  const modalContent = {
    privacy: { title: "Privacy Policy", content: "We respect your privacy..." },
    dataUsage: { title: "How We Use Your Data", content: "We use your data to personalize..." },
    doNotSell: { title: "Do Not Sell My Personal Information", content: "DJ Rocky/WME/BMLN does NOT sell your personal data..." },
    globalRights: { title: "Your Global Privacy Rights", content: "Depending on your location..." },
    terms: { title: "Terms and Conditions", content: "By using this website..." }
  };

  // Gallery images
  const galleryImages = ["/image2.jpg"];

  // Tour images - each will keep its original aspect ratio
  const tourImages = [
    { src: "/tour/HCvocixXsAAwGHR.jpeg", alt: "Tour Image 1" },
    { src: "/tour/G5AvVFIXEAAx2Ss.jpeg", alt: "Tour Image 2" },
    { src: "/tour/G5-T6EMXkAAIwIM.jpeg", alt: "Tour Image 3" }
  ];

  const openSection = (section: string) => {
    setActiveSection(section);
  };

  const goHome = () => {
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/5 dark:bg-black/5 backdrop-blur-md z-50 border-b border-white/10 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Menu Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition font-medium text-lg cursor-pointer">
                MENU <span className="text-sm">▼</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <DropdownItem onClick={() => openSection("music")}>Music</DropdownItem>
                <DropdownItem onClick={() => openSection("video")}>Videos</DropdownItem>
                <DropdownItem onClick={() => openSection("gallery")}>Gallery</DropdownItem>
                <DropdownItem href="#">Shop</DropdownItem>
                <DropdownItem onClick={() => openSection("tour")}>Tour</DropdownItem>
                <DropdownItem onClick={() => openSection("bio")}>Bio</DropdownItem>
              </div>
            </div>

            {/* Logo - Click to go home */}
            <button 
              onClick={goHome}
              className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
            >
              DJ ROCKY
            </button>

            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {!activeSection ? (
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
      ) : activeSection === "music" ? (
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Music</h1>
            <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-xl">
              <iframe 
                src="https://open.spotify.com/embed/album/3ixKIxWyPdu5oocj3n5NID?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-xl w-full"
              ></iframe>
              <div className="mt-6 text-center">
                <a 
                  href="https://open.spotify.com/album/3ixKIxWyPdu5oocj3n5NID" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Open in Spotify App 🎵
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : activeSection === "video" ? (
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">Videos</h1>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/4rZmsPXBsoE"
                title="DJ Rocky Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      ) : activeSection === "gallery" ? (
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSection === "tour" ? (
        // Tour Section - Clean: Only images, dynamic size (no text below)
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-10 text-center">Tour</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourImages.map((img, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain hover:scale-105 transition duration-300"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Bio Section (unchanged)
        <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold">Busuulwa Peter Nsereko</p>
            <div className="h-1 w-20 bg-gray-800 dark:bg-gray-600 rounded-full my-6"></div>
            {/* Paste the rest of your full bio content here */}
            <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              <p className="font-bold">
                Busuulwa Peter Nsereko, professionally known as DJ Rocky, is a Ugandan DJ, Producer, Software Engineer, Entrepreneur & Philanthropist...
              </p>
              {/* ... add your full bio text here ... */}
            </div>
          </div>
        </div>
      )}

      {/* Modal & Footer remain the same as before */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              ✕
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">{modalContent[activeModal as keyof typeof modalContent]?.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {modalContent[activeModal as keyof typeof modalContent]?.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white/70 py-8 text-sm border-t border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl font-bold text-gray-800 dark:text-white mb-2">DJ ROCKY</p>
          <p>© 2026 DJ Rocky / WME / BMLN. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 text-xs">
            <button onClick={() => openModal('privacy')}>Privacy Policy</button>
            <button onClick={() => openModal('dataUsage')}>How We Use Your Data</button>
            <button onClick={() => openModal('doNotSell')}>Do Not Sell My Information</button>
            <button onClick={() => openModal('globalRights')}>Global Rights</button>
            <button onClick={() => openModal('terms')}>Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DropdownItem({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition first:rounded-t-lg last:rounded-b-lg"
      >
        {children}
      </button>
    );
  }
  return (
    <a href={href} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition first:rounded-t-lg last:rounded-b-lg">
      {children}
    </a>
  );
}