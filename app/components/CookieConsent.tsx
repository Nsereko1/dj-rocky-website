"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const openCookieChoices = () => {
    // You can open your existing privacy modal or a dedicated cookie modal
    // For now, we'll trigger the "dataUsage" modal (you can adapt)
    const event = new CustomEvent("openModal", { detail: "dataUsage" });
    window.dispatchEvent(event);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-800 p-4 sm:p-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          We'd like to use cookies and similar technologies to personalize your experiences on our sites and to advertise on other sites. For more information and additional choices click{" "}
          <button onClick={openCookieChoices} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
            Cookie Choices
          </button>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={acceptCookies}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition text-sm"
          >
            I understand
          </button>
          <button
            onClick={openCookieChoices}
            className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-2 px-6 rounded-full transition text-sm"
          >
            Cookie Choices
          </button>
        </div>
      </div>
    </div>
  );
}