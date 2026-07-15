"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition font-medium text-lg cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              MENU <span className={`text-sm transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            <div className={`absolute left-0 mt-2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl transition-all duration-200 z-50 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
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
  const baseClasses = "w-full text-left block px-4 py-2 transition first:rounded-t-lg last:rounded-b-lg cursor-pointer";
  const activeClasses = isActive 
    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold" 
    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white";
  
  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
        {children}
      </button>
    );
  }
  
  return (
    <a href={href} className={`${baseClasses} ${activeClasses}`}>
      {children}
    </a>
  );
}