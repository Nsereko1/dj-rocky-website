// src/components/ui/MusicSection.tsx
export default function MusicSection() {
  return (
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
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition"
            >
              Open in Spotify App 🎵
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}