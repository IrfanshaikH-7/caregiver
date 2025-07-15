// src/components/schedule/ActionButtons.tsx
import React from "react";

interface ActionButtonsProps {
  visitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  onCheckin?: () => void;
  onCheckout?: () => void;
  onCancelCheckin?: () => void;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  visitStatus,
  onCheckin,
  onCheckout,
  onCancelCheckin,
  isLoading = false,
}) => {
  if (visitStatus === "completed" || visitStatus === "missed") {
    return null; // No actions for completed or missed visits
  }

  return (
    <div className="mt-6">
      {visitStatus === "upcoming" && (
        <button
          onClick={onCheckin}
          disabled={isLoading}
          className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Clock-In Now"}
        </button>
      )}

      {visitStatus === "in_progress" && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onCancelCheckin}
            disabled={isLoading}
            className="sm:flex-1 border border-teal-700 text-teal-700 py-3 rounded-lg hover:bg-teal-50 transition-colors disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Cancel Check-In"}
          </button>
          <button
            onClick={onCheckout}
            disabled={isLoading}
            className="sm:flex-1 bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Clock-Out"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
