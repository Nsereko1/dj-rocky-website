// src/components/ui/VideoSection.tsx
export default function VideoSection() {
  return (
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
  );
}