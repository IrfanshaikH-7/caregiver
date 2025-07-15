// src/components/schedule/ScheduleCard.tsx
import React from "react";
import {
  more_horizontal,
  location as locationIcon,
  calendar,
  clock,
} from "../../assets";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import type { DetailedSchedule } from "../../types/schedule";

interface ScheduleCardProps {
  id: string;
  status: "Scheduled" | "In progress" | "Completed" | "Cancelled";
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
  profilePicture?: string;
  clientInfo?: DetailedSchedule["ClientInfo"];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  status,
  patientName,
  serviceName,
  location,
  date,
  timeRange,
  profilePicture,
  clientInfo,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-caregray text-white";
      case "In progress":
        return "bg-[#ED6C02] text-white";
      case "Completed":
        return "bg-[#2E7D32] text-white";
      case "Cancelled":
        return "bg-[#D32F2F] text-white";
      default:
        return "bg-[#D32F2F] text-white";
    }
  };
  console.log("profilePicture", profilePicture);
  // Format the full name from client info if available
  const fullName = clientInfo
    ? `${clientInfo.FirstName} ${clientInfo.LastName}`
    : patientName;

  // We'll use a ref to track if the component is mounted
  const isMounted = React.useRef(true);

  // Set initial image source to placeholder
  const [imgSrc, setImgSrc] = React.useState<string>(
    "https://via.placeholder.com/40"
  );

  // Cleanup function to prevent state updates after unmount
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Function to safely set image source with error handling
  const safelySetImage = (url: string | undefined) => {
    if (!url) return;

    // Create a new image to test loading
    const img = new Image();
    img.onload = () => {
      if (isMounted.current) {
        setImgSrc(url);
      }
    };
    img.onerror = () => {
      // If image fails to load, we keep the placeholder
      console.log("Failed to load image:", url);
    };
    img.src = url;
  };

  // Try to load the profile picture when component mounts or props change
  React.useEffect(() => {
    if (profilePicture) {
      safelySetImage(profilePicture);
    } else if (clientInfo?.ProfilePicture) {
      safelySetImage(clientInfo.ProfilePicture);
    }
  }, [profilePicture, clientInfo]);

  return (
    <Link to={`/schedule/${id}`} className="p-5 rounded-2xl shadow-sm bg-white">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-3 py-1 rounded-full text-[13px] font-semibold ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
        <div
          role="button"
          className="text-gray-500 hover:text-gray-700 cursor-pointer sm:-mt-2"
        >
          <img
            src={more_horizontal}
            alt="more"
            className="h-5 sm:h-8 w-5 sm:w-8"
          />
        </div>
      </div>
      <div className="flex items-center mb-2">
        <img
          src={profilePicture || "invalid.jpg"}
          alt="Profile"
          className="w-10 sm:w-16 h-10 sm:h-16 rounded-full mr-3 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://picsum.photos/200/300";
          }}
        />
        <div>
          <h3 className="text-base sm:text-2xl font-semibold font-roboto">
            {fullName}
          </h3>
          <p className="text-gray-600 text-xs sm:text-base font-roboto">
            {serviceName}
          </p>
        </div>
      </div>
      <div className="flex items-center text-xs sm:text-base text-gray-500 mb-4">
        <img
          src={locationIcon}
          alt="location"
          className="w-5 sm:w-6 h-5 sm:h-6 rounded-full mr-1"
        />
        <span className="font-roboto">{location}</span>
      </div>

      <div className="flex items-center text-xs sm:text-base justify-around bg-secondary rounded-xl text-gray-700 py-2 sm:py-3 mb-4">
        <div className="flex items-center">
          <img
            src={calendar}
            alt="calendar"
            className="w-6 h-6 rounded-full mr-1"
          />
          <span className="font-roboto">{date}</span>
        </div>
        <div className="flex items-center">
          <img src={clock} alt="clock" className="w-5 h-5 rounded-full mr-1" />
          <span className="font-roboto">{timeRange}</span>
        </div>
      </div>

      {status === "Scheduled" && <Button>Clock-In Now</Button>}
      {status === "In progress" && (
        <div className="flex space-x-2">
          <Button variant="ghost" className="flex-1">
            View Progress
          </Button>
          <Button className="flex-1">Clock-Out Now</Button>
        </div>
      )}
      {status === "Completed" && <Button variant="ghost">View Report</Button>}
      {status === "Cancelled" && (
        <Button
          variant="ghost"
          disabled
          className="border-red-600 text-red-600 disabled:border-red-400 disabled:text-red-400"
        >
          Schedule Cancelled
        </Button>
      )}
    </Link>
  );
};

export default ScheduleCard;
