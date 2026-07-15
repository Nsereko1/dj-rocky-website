"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-full pt-16 sm:pt-0">
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