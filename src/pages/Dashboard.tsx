import React from "react";
import ScheduleCard from "../components/schedule/ScheduleCard";
import { getSchedule, getUserData } from "../api/queries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Title from "../components/common/Title";
import type { Schedule } from "../types/schedule";
import {
  mapVisitStatusToCardStatus,
  formatDateTime,
  formatTimeRange,
  formatLocation,
} from "../utils/scheduleUtils";
import MobileHeader from "../components/common/MobileHeader";

const Dashboard: React.FC = () => {
  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<Schedule[], Error>({
    queryKey: ["schedules", "ecd75215-960b-484b-a184-736f8fca4e59"],
    queryFn: () => getSchedule("ecd75215-960b-484b-a184-736f8fca4e59"),
  });

  const userId = "ecd75215-960b-484b-a184-736f8fca4e59"; // Define the user ID

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<any, Error>({
    queryKey: ["user", userId],
    queryFn: () => getUserData(userId),
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data stored in localStorage:", userData);
    }
  }, [userData]);

  // Calculate dashboard stats from actual schedule data
  const dashboardStats = React.useMemo(() => {
    if (!schedules)
      return [
        { value: 0, label: "Missed Scheduled", colorClass: "text-red-600" },
        {
          value: 0,
          label: "Upcoming Today's Schedule",
          colorClass: "text-orange-500",
        },
        {
          value: 0,
          label: "Today's Completed Schedule",
          colorClass: "text-green-600",
        },
      ];

    const missed = schedules.filter((s) => s.VisitStatus === "missed").length;
    const upcoming = schedules.filter(
      (s) => s.VisitStatus === "upcoming"
    ).length;
    const completed = schedules.filter(
      (s) => s.VisitStatus === "completed"
    ).length;

    return [
      { value: missed, label: "Missed Scheduled", colorClass: "text-red-600" },
      {
        value: upcoming,
        label: "Upcoming Today's Schedule",
        colorClass: "text-orange-500",
      },
      {
        value: completed,
        label: "Today's Completed Schedule",
        colorClass: "text-green-600",
      },
    ];
  }, [schedules]);

  if (isLoading || isUserLoading)
    return <div>Loading schedules and user data...</div>;

  // Combine error handling for both queries
  if (error || userError) {
    const errorMessage = error ? error.message : userError?.message;
    return <div>An error occurred: {errorMessage}</div>;
  }

  return (
    <>
      <Title>
        <span className="text-lg font-semibold">Dashboard</span>
      </Title>
      <MobileHeader>
        <span className="text-lg font-semibold capitalize">
          Welcome {userData?.UserName + "!"}
        </span>
      </MobileHeader>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7 sm:mt-2">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-sm bg-white text-center ${
              index === 0 ? "col-span-2 md:col-span-1" : "col-span-1"
            }`}
          >
            <div className={`text-[34px] font-bold ${stat.colorClass}`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between items-center mt-5">
        <h2 className="text-[18px] font-semibold  flex items-center">
          Schedule
          <span className="ml-2 px-2 py-1 bg-[#02CAD1] text-white text-sm font-semibold rounded-lg">
            {schedules?.length || 0}
          </span>
        </h2>

        <span className="text-[#0D5D59] text-[13px] font-medium block sm:hidden">
          See All
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 mt-5 pb-28">
        {schedules &&
          schedules.map((schedule: Schedule) => (
            <ScheduleCard
              profilePicture={schedule.ClientInfo.ProfilePicture}
              key={schedule.ID}
              id={schedule.ID}
              status={mapVisitStatusToCardStatus(schedule.VisitStatus)}
              patientName={`${schedule.ClientInfo.FirstName} ${schedule.ClientInfo.LastName}`}
              serviceName={schedule.ServiceName}
              location={formatLocation(schedule.ClientInfo)}
              date={formatDateTime(schedule.ScheduledSlot.From)}
              timeRange={formatTimeRange(
                schedule.ScheduledSlot.From,
                schedule.ScheduledSlot.To
              )}
            />
          ))}
      </div>
    </>
  );
};

export default Dashboard;
