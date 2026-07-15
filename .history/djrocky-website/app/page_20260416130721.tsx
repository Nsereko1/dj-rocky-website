// src/app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/artwork.jpg"
        alt="DJ Rocky"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}