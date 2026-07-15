// src/components/ui/TourSection.tsx
import Image from "next/image";

const tourImages = [
  { src: "/tour/HCvocixXsAAwGHR.jpeg", alt: "Tour" },
  { src: "/tour/G5AvVFIXEAAx2Ss.jpeg", alt: "Tour" },
  { src: "/tour/G5-T6EMXkAAIwIM.jpeg", alt: "Tour" }
];

export default function TourSection() {
  return (
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
  );
}