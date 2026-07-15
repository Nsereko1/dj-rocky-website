"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full pt-16 sm:pt-0">
      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image with fade-in effect */}
      <Image
        src="/artwork.jpg"
        alt="DJ Rocky"
        fill
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}