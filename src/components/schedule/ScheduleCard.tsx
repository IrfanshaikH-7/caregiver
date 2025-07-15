// src/components/schedule/ScheduleCard.tsx
import React from 'react';
import { more_horizontal, location as locationIcon, calendar, clock } from '../../assets';
import Button from '../common/Button';
import { Link } from 'react-router-dom';


interface ScheduleCardProps {
  id: string;
  status: 'Scheduled' | 'In progress' | 'Completed' | 'Cancelled';
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  status,
  patientName,
  serviceName,
  location,
  date,
  timeRange,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-caregray text-white';
      case 'In progress':
        return 'bg-[#ED6C02] text-white';
      case 'Completed':
        return 'bg-[#2E7D32] text-white';
      case 'Cancelled':
        return 'bg-[#D32F2F] text-white';
      default:
        return 'bg-[#D32F2F] text-white';
    }
  };

  return (
    <Link to={`/schedule/${id}`} className="p-5 rounded-2xl shadow-sm bg-white">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-3 py-1 rounded-full text-[13px] font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
        <div role='button' className="text-gray-500 hover:text-gray-700 cursor-pointer  sm:-mt-2">
          <img src={more_horizontal} alt="more" className='h-5 sm:h-8 w-5 sm:w-8 ' />
        </div>
      </div>
      <div className="flex items-center mb-2">
        <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full mr-3" />
        <div>
          <h3 className="text-base sm:text-2xl font-semibold">{patientName}</h3>
          <p className="text-gray-600 text-xs sm:text-base">{serviceName}</p>
        </div>
      </div>
      <div className="flex items-center text-xs sm:text-base text-gray-500  mb-4">
        <img src={locationIcon} alt="location" className="w-5 sm:w-6 h-5 sm:h-6 rounded-full mr-1" />
        <span>{location}</span>
      </div>

      <div className="flex items-center text-xs sm:text-base justify-around bg-secondary rounded-xl text-gray-700 py-2 sm:py-3 mb-4">
        <div className="flex items-center">
          <img src={calendar} alt="calendar" className="w-6 h-6  rounded-full mr-1" />
          <span>{date}</span>
        </div>
        <div className="flex items-center ">
          <img src={clock} alt="clock" className="w-5 h-5 rounded-full mr-1" />
          <span>{timeRange}</span>
        </div>
      </div>




      {status === 'Scheduled' && (
        <Button>
          Clock-In Now
        </Button>
      )}
      {status === 'In progress' && (
        <div className="flex space-x-2">
          <Button variant="ghost" className="flex-1">
            View Progress
          </Button>
          <Button className="flex-1">
            Clock-Out Now
          </Button>
        </div>
      )}
      {status === 'Completed' && (
        <Button variant="ghost">
          View Report
        </Button>
      )}
      {status === 'Cancelled' && (
        <Button variant="ghost" disabled className="border-red-600 text-red-600 disabled:border-red-400 disabled:text-red-400">
          Schedule Cancelled
        </Button>
      )}
    </Link>
  );
};

export default ScheduleCard;