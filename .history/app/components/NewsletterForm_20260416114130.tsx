"use client";
import { useState } from "react";

export default function NewsletterForm() {
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "success" && <p className="text-green-600 dark:text-green-400 text-sm mt-2">Subscribed! 🎉</p>}
      {status === "error" && <p className="text-red-600 dark:text-red-400 text-sm mt-2">Error. Please try again.</p>}
    </form>
  );
}