import React from 'react';
import ScheduleCard from '../components/schedule/ScheduleCard';
import { getSchedule, getUserData } from '../api/queries';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Title from '../components/common/Title';

const Dashboard: React.FC = () => {
  const dashboardStats = [
    { value: 7, label: 'Missed Scheduled', colorClass: 'text-red-600' },
    { value: 12, label: 'Upcoming Today\'s Schedule', colorClass: 'text-orange-500' },
    { value: 5, label: 'Today\'s Completed Schedule', colorClass: 'text-green-600' },
  ];

  const { data: schedules, isLoading, error } = useQuery<any, Error>({
    queryKey: ['schedules', "ecd75215-960b-484b-a184-736f8fca4e59"],
    queryFn: () => getSchedule("ecd75215-960b-484b-a184-736f8fca4e59"),
  });

  const userId = "ecd75215-960b-484b-a184-736f8fca4e59"; // Define the user ID

  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery<any, Error>({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId),
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data stored in localStorage:', userData);
    }
  }, [userData]);

  if (isLoading || isUserLoading) return <div>Loading schedules and user data...</div>;
  
  // Combine error handling for both queries
  if (error || userError) {
    const errorMessage = error ? error.message : userError?.message;
    return <div>An error occurred: {errorMessage}</div>;
  }

  return (
    <>
      <Title>
        <span className='text-lg font-semibold '>Dashboard</span>
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="p-4 rounded-2xl shadow-sm bg-white text-center">
            <div className={`text-4xl font-bold ${stat.colorClass}`}>{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-5 flex items-center">
        Schedule
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {schedules?.length || 0}
        </span>
      </h2>

      <div className="flex flex-col gap-4 mt-5">
        {schedules && schedules.map((schedule: any) => (
          <ScheduleCard
            key={schedule.id}
            status={schedule.status || 'Scheduled'}
            patientName={schedule.patientName || 'Melisa Adam'}
            serviceName={schedule.serviceName || 'Service Name A'}
            location={schedule.location || 'Casa Grande Apartment'}
            date={schedule.date || 'Mon, 15 Jan 2025'}
            timeRange={schedule.timeRange || '09:00 - 10:00'}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;