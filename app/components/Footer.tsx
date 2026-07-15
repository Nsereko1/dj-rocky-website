"use client";
import { useModal } from "../context/ModalContext";
import { useState } from "react";

export default function Footer() {
  const { openModal } = useModal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white/70 py-5 text-xs sm:text-sm border-t border-gray-200 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4">

          {/* Newsletter – added items-center for mobile centering */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center items-center gap-y-2 gap-x-4 text-center sm:text-left">
            <span className="font-bold text-gray-800 dark:text-white">
              🎵 Join the Future Afro Movement
            </span>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-48 sm:w-56 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full text-sm transition disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>

            <span className="text-gray-600 dark:text-gray-400 text-xs">
              Get exclusive updates on new music, tours, and merch drops.
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>

          {/* Contact & Copyright */}
          <div className="text-center">
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
              TEXT DJ ROCKY (256) 703 787550
            </p>
            <p className="text-xs">© 2026 DJ Rocky / WME / BMLN. All Rights Reserved.</p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center text-xs">
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

      {/* Status toasts */}
      {status === "success" && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
          ✅ Subscribed!
        </div>
      )}
      {status === "error" && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
          ❌ Error, try again.
        </div>
      )}
    </footer>
  );
}