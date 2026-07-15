"use client";
import { useModal } from "../context/ModalContext";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white/70 py-6 sm:py-8 text-xs sm:text-sm border-t border-gray-200 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">TEXT DJ ROCKY (256) 703 787550</p>
            <p>© 2026 DJ Rocky / WME / BMLN. All Rights Reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center">
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
    </footer>
  );
}