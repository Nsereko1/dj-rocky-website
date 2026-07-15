// src/components/ui/GallerySection.tsx
import Image from "next/image";

const galleryImages = ["/image2.jpg"];

export default function GallerySection() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900">
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                width={1800}
                height={1600}
                className="w-full h-auto object-contain hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}