"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "privacy" | "dataUsage" | "doNotSell" | "globalRights" | "terms" | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  modalContent: Record<string, { title: string; content: string }>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const modalContentData = {
  privacy: { 
    title: "Privacy Policy", 
    content: "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit our website. We only collect necessary data to improve your experience and never sell your personal information to third parties." 
  },
  dataUsage: { 
    title: "How We Use Your Data", 
    content: "We use your data to personalize your experience, improve our website, process bookings, and send you relevant updates about DJ Rocky's music, tours, and events. Your information helps us serve you better and provide the content you love." 
  },
  doNotSell: { 
    title: "Do Not Sell My Personal Information", 
    content: "Under California privacy laws and other global regulations, you have the right to opt-out of the sale of your personal information. DJ Rocky/WME/BMLN does NOT sell your personal data to third parties. We only use your information to enhance your experience and communicate about our music and events." 
  },
  globalRights: { 
    title: "Your Global Privacy Rights", 
    content: "Depending on your location, you may have rights including: accessing your data, correcting inaccurate information, requesting deletion, and objecting to certain data processing. Contact us at djrockyug@gmail.com to exercise your rights." 
  },
  terms: { 
    title: "Terms and Conditions", 
    content: "By using this website, you agree to these terms. All content is property of DJ Rocky/WME/BMLN. You may not reproduce, distribute, or modify any content without permission. We reserve the right to update these terms at any time." 
  }
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ 
      activeModal, 
      openModal, 
      closeModal, 
      modalContent: modalContentData 
    }}>
      {children}
      {activeModal && <Modal />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

function Modal() {
  const { activeModal, closeModal, modalContent } = useModal();

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeModal}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 18" />
          </svg>
        </button>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-6">
            {modalContent[activeModal]?.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {modalContent[activeModal]?.content}
          </p>
        </div>
      </div>
    </div>
  );
}