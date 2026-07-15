"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import MusicSection from "./components/ui/MusicSection";
import VideoSection from "./components/ui/VideoSection";
import GallerySection from "./components/ui/GallerySection";
import TourSection from "./components/ui/TourSection";
import BioSection from "./components/ui/BioSection";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync active section with the URL path
  useEffect(() => {
    const path = pathname === "/" ? null : pathname.slice(1);
    setActiveSection(path);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeModal = () => setActiveModal(null);
  const openModal = (type: string) => setActiveModal(type);

  const modalContent = {
    privacy: { title: "Privacy Policy", content: "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit our website. We only collect necessary data to improve your experience and never sell your personal information to third parties." },
    dataUsage: { title: "How We Use Your Data", content: "We use your data to personalize your experience, improve our website, process bookings, and send you relevant updates about DJ Rocky's music, tours, and events. Your information helps us serve you better and provide the content you love." },
    doNotSell: { title: "Do Not Sell My Personal Information", content: "Under California privacy laws and other global regulations, you have the right to opt-out of the sale of your personal information. DJ Rocky/WME/BMLN does NOT sell your personal data to third parties. We only use your information to enhance your experience and communicate about our music and events." },
    globalRights: { title: "Your Global Privacy Rights", content: "Depending on your location, you may have rights including: accessing your data, correcting inaccurate information, requesting deletion, and objecting to certain data processing. Contact us at djrockyug@gmail.com to exercise your rights." },
    terms: { title: "Terms and Conditions", content: "By using this website, you agree to these terms. All content is property of DJ Rocky/WME/BMLN. You may not reproduce, distribute, or modify any content without permission. We reserve the right to update these terms at any time." }
  };

  const openSection = (section: string) => {
    router.push(`/${section}`, { scroll: false });
    setIsMenuOpen(false);
  };

  const goHome = () => {
    router.push("/", { scroll: false });
    setIsMenuOpen(false);
  };

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

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/5 dark:bg-black/5 backdrop-blur-md z-50 border-b border-white/10 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-1 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition font-medium text-lg cursor-pointer"
              >
                MENU <span className={`text-sm transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {/* Dropdown menu - fixed positioning to avoid overflow */}
              <div 
                className={`absolute ${
                  isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } transition-all duration-200 z-50 mt-2
                right-0 sm:left-0 sm:right-auto
                w-48 max-h-[80vh] overflow-y-auto
                bg-white/95 dark:bg-black/95 backdrop-blur-md 
                border border-gray-200 dark:border-gray-800 
                rounded-lg shadow-xl`}
              >
                <DropdownItem onClick={() => openSection("music")}>Music</DropdownItem>
                <DropdownItem onClick={() => openSection("video")}>Videos</DropdownItem>
                <DropdownItem onClick={() => openSection("gallery")}>Gallery</DropdownItem>
                <DropdownItem href="#">Shop</DropdownItem>
                <DropdownItem onClick={() => openSection("tour")}>Tour</DropdownItem>
                <DropdownItem onClick={() => openSection("bio")}>Bio</DropdownItem>
              </div>
            </div>

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
        <MusicSection />
      ) : activeSection === "video" ? (
        <VideoSection />
      ) : activeSection === "gallery" ? (
        <GallerySection />
      ) : activeSection === "tour" ? (
        <TourSection />
      ) : activeSection === "bio" ? (
        <BioSection />
      ) : null}

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 18" />
              </svg>
            </button>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-6">
                {modalContent[activeModal as keyof typeof modalContent]?.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {modalContent[activeModal as keyof typeof modalContent]?.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white/70 py-6 sm:py-8 text-xs sm:text-sm border-t border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">DJ ROCKY</p>
              <p>© 2026 DJ Rocky / WME / BMLN. All Rights Reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center">
              <button onClick={() => openModal('privacy')} className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer">Privacy Policy</button>
              <span className="hidden xs:inline">|</span>
              <button onClick={() => openModal('dataUsage')} className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer">How We Use Your Data</button>
              <span className="hidden xs:inline">|</span>
              <button onClick={() => openModal('doNotSell')} className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer">Do Not Sell My Personal Information</button>
              <span className="hidden lg:inline">|</span>
              <button onClick={() => openModal('globalRights')} className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer">Your Global Privacy Rights</button>
              <span className="hidden xs:inline">|</span>
              <button onClick={() => openModal('terms')} className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer">Terms and Conditions</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}