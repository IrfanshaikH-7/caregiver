// src/components/schedule/ScheduleCompletionModal.tsx
import React from "react";
import Modal from "../common/Modal";

interface ScheduleCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  scheduleDate: string;
  scheduleTime: string;
  duration: string;
}

const ScheduleCompletionModal: React.FC<ScheduleCompletionModalProps> = ({
  isOpen,
  onClose,
  onGoHome,
  scheduleDate,
  scheduleTime,
  duration,
}) => {
  const CompletionIcon = () => (
    <div className="relative flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute">
        {/* Orange dots and lines */}
        <div className="absolute -top-8 -left-8 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute -top-4 left-12 w-1 h-1 bg-orange-300 rounded-full"></div>
        <div className="absolute top-8 -right-6 w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
        <div className="absolute -bottom-6 -left-4 w-1 h-1 bg-orange-400 rounded-full"></div>

        {/* Curved lines */}
        <svg className="absolute -top-6 left-8 w-8 h-8" viewBox="0 0 32 32">
          <path
            d="M4 16 Q 16 4 28 16"
            stroke="#FB923C"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <svg className="absolute top-6 -right-8 w-6 h-6" viewBox="0 0 24 24">
          <path
            d="M2 12 Q 12 2 22 12"
            stroke="#FDBA74"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Purple/pink elements */}
        <div className="absolute -top-2 right-8 w-1 h-1 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full"></div>

        {/* Blue/teal elements */}
        <div className="absolute top-2 -left-6 w-1 h-1 bg-teal-300 rounded-full"></div>
        <div className="absolute -bottom-2 right-4 w-1 h-1 bg-blue-300 rounded-full"></div>
      </div>

      {/* Main checkmark circle */}
      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center relative z-10">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full sm:w-auto sm:h-auto"
    >
      {/* Mobile Design - Full Screen with Green Background */}
      <div className="sm:hidden w-full h-full bg-teal-600 flex flex-col items-center justify-center px-8 text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-gray-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-8">
          <CompletionIcon />

          <h2 className="text-2xl font-roboto font-medium">
            Schedule Completed
          </h2>

          <div className="space-y-4 text-center">
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-lg">{scheduleDate}</span>
            </div>

            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <div className="text-left">
                <div className="text-lg">{scheduleTime}</div>
                <div className="text-sm opacity-80">({duration})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Go to Home button */}
        <div className="absolute bottom-8 left-8 right-8">
          <button
            onClick={onGoHome}
            className="w-full py-4 border-2 border-white text-white rounded-button font-roboto font-normal text-button-text leading-button-text hover:bg-white hover:text-teal-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>

      {/* Desktop Design - Modal with White Background */}
      <div className="hidden sm:block bg-white rounded-2xl p-8 max-w-md mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-6 pt-4">
          <CompletionIcon />

          <h2 className="text-2xl font-roboto font-medium text-gray-900">
            Schedule Completed
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-lg">{scheduleDate}</span>
            </div>

            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <div className="text-left">
                <div className="text-lg">{scheduleTime}</div>
                <div className="text-sm text-gray-500">({duration})</div>
              </div>
            </div>
          </div>

          {/* Go to Home button */}
          <div className="w-full pt-4">
            <button
              onClick={onGoHome}
              className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-button font-roboto font-normal text-button-text leading-button-text hover:bg-gray-50 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleCompletionModal;
