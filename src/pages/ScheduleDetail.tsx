// src/pages/ScheduleDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { getSchedule } from '../api/queries';
import { useQuery } from '@tanstack/react-query';
import type { Schedule } from '../types/schedule'; // Import the Schedule type

const ScheduleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: schedule, isLoading, error } = useQuery<Schedule | undefined>({ // Use Schedule type
    queryKey: ['schedule', id],
    queryFn: () => getSchedule().then(schedules => schedules.find((s: Schedule) => s.id === id)), // Use Schedule type
    enabled: !!id,
  });

  if (isLoading) return <div>Loading schedule details...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!schedule) return <div>Schedule not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule Detail</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{schedule.title}</h2>
        <p className="text-gray-700 mb-4">{schedule.description}</p>
        <p className="text-gray-500">Time: {schedule.time}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ScheduleDetail;