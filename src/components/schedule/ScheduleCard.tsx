// src/components/schedule/ScheduleCard.tsx
import React from 'react';
import { more_horizontal,location as locationIcon,calendar,clock } from '../../assets';


interface ScheduleCardProps {
  status: 'Scheduled' | 'In progress' | 'Completed';
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
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
      default:
        return 'bg-[#D32F2F] text-white';
    }
  };

  return (
    <div className="p-5 rounded-2xl shadow-sm bg-white">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
        <div role='button' className="text-gray-500 hover:text-gray-700 cursor-pointer -mt-2">
          <img src={more_horizontal} alt="more" className='h-8 w-8 ' />
        </div>
      </div>
      <div className="flex items-center mb-2">
        <img src="https://via.placeholder.com/40" alt="Profile" className="w-16 h-16 rounded-full mr-3" />
        <div>
          <h3 className="text-2xl font-semibold">{patientName}</h3>
          <p className="text-gray-600">{serviceName}</p>
        </div>
      </div>
      <div className="flex items-center text-gray-500  mb-4">
        <img src={locationIcon} alt="location" className="w-6 h-6 rounded-full mr-1" />
        <span>{location}</span>

      </div>
      <div className="flex items-center justify-around bg-secondary rounded-xl text-gray-700 py-3 mb-4">
        <div className="flex items-center">
          <img src={calendar} alt="calendar" className="w-6 h-6  rounded-full mr-1" />
          <span>{date}</span>

        </div>
        <div className="flex items-center">
          
          <img src={clock} alt="clock" className="w-5 h-5 rounded-full mr-1" />
          <span>{timeRange}</span>
        </div>
      </div>



      
      {status === 'Scheduled' && (
        <button className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition-colors">
          Clock-In Now
        </button>
      )}
      {status === 'In progress' && (
        <div className="flex space-x-2">
          <button className="flex-1 border border-teal-700 text-teal-700 py-2 rounded-lg hover:bg-teal-50 transition-colors">
            View Progress
          </button>
          <button className="flex-1 bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition-colors">
            Clock-Out Now
          </button>
        </div>
      )}
      {status === 'Completed' && (
        <button className="w-full border border-teal-700 text-teal-700 py-2 rounded-lg hover:bg-teal-50 transition-colors">
          View Report
        </button>
      )}
    </div>
  );
};

export default ScheduleCard;