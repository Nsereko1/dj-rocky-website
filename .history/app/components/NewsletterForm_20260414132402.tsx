"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-[#929292] placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2a2a2a] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-gray-900 dark:bg-[#2a2a2a] text-white dark:text-[#929292] font-bold rounded-lg hover:bg-gray-700 dark:hover:bg-[#1a1a1a] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm text-center ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {message}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-[#666] mt-3 text-center">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );
}