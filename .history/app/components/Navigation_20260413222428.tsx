"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle both mouse and touch events for closing menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    // Add both mouse and touch event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Improved toggle function with event handling
  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (section: string) => {
    router.push(`/${section}`);
    setIsMenuOpen(false);
  };

  const goHome = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/5 dark:bg-black/5 backdrop-blur-md z-50 border-b border-white/10 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Menu Dropdown - Mobile Optimized */}
          <div className="relative" ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              onTouchStart={toggleMenu}
              className="flex items-center gap-1 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 active:text-gray-600 dark:active:text-gray-300 transition font-medium text-lg cursor-pointer touch-manipulation select-none"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              aria-label="Menu"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              MENU <span className={`text-sm transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {/* Dropdown Menu - Mobile Optimized */}
            <div 
              className={`absolute left-0 mt-2 w-56 sm:w-48 bg-white/98 dark:bg-black/98 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl transition-all duration-200 z-50 ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
              }`}
              style={{
                WebkitBackdropFilter: 'blur(12px)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <DropdownItem 
                onClick={() => navigateTo("music")} 
                isActive={isActive("/music")}
              >
                Music
              </DropdownItem>
              <DropdownItem 
                onClick={() => navigateTo("video")}
                isActive={isActive("/video")}
              >
                Videos
              </DropdownItem>
              <DropdownItem 
                onClick={() => navigateTo("gallery")}
                isActive={isActive("/gallery")}
              >
                Gallery
              </DropdownItem>
              <DropdownItem href="#">
                Shop
              </DropdownItem>
              <DropdownItem 
                onClick={() => navigateTo("tour")}
                isActive={isActive("/tour")}
              >
                Tour
              </DropdownItem>
              <DropdownItem 
                onClick={() => navigateTo("bio")}
                isActive={isActive("/bio")}
              >
                Bio
              </DropdownItem>
            </div>
          </div>

          {/* Logo - Mobile Optimized */}
          <button
            onClick={goHome}
            className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 active:text-gray-600 dark:active:text-gray-300 transition cursor-pointer touch-manipulation select-none"
            aria-label="Home"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            DJ ROCKY
          </button>

          {/* Spacer for symmetry */}
          <div className="w-14 sm:w-20"></div>
        </div>
      </div>
    </nav>
  );
}

function DropdownItem({ 
  href, 
  children, 
  onClick,
  isActive 
}: { 
  href?: string; 
  children: React.ReactNode; 
  onClick?: () => void;
  isActive?: boolean;
}) {
  const baseClasses = "w-full text-left block px-5 py-3 sm:px-4 sm:py-2 text-base sm:text-sm transition first:rounded-t-lg last:rounded-b-lg cursor-pointer touch-manipulation select-none";
  const activeClasses = isActive 
    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold" 
    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-800 hover:text-gray-900 dark:hover:text-white";
  
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };
  
  if (onClick) {
    return (
      <button 
        onClick={handleClick}
        onTouchStart={handleClick}
        className={`${baseClasses} ${activeClasses}`}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        {children}
      </button>
    );
  }
  
  return (
    <a 
      href={href} 
      className={`${baseClasses} ${activeClasses}`}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </a>
  );
}