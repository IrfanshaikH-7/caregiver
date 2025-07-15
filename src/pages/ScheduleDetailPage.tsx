// src/pages/ScheduleDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScheduleById } from "../api/queries/scheduleQueries";
import {
  checkInSchedule,
  checkOutSchedule,
  cancelCheckIn,
  updateTask,
} from "../api/mutations/scheduleMutations";
import type { DetailedSchedule } from "../types/schedule";
import Title from "../components/common/Title";
import { calendar, clock, location as locationIcon } from "../assets";
import TaskList from "../components/schedule/TaskList";
import LocationMap from "../components/schedule/LocationMap";
import ActionButtons from "../components/schedule/ActionButtons";
import ServiceNotes from "../components/schedule/ServiceNotes";
import type { LocationData } from "../types/scheduleOperations";

const ScheduleDetailPage: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local state
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Fetch schedule details
  const {
    data: schedule,
    isLoading,
    error,
    refetch,
  } = useQuery<DetailedSchedule, Error>({
    queryKey: ["schedule", scheduleId],
    queryFn: () => getScheduleById(scheduleId || ""),
    enabled: !!scheduleId,
  });

  // Check-in mutation
  const checkInMutation = useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkInSchedule(scheduleId, { location }),
    onSuccess: () => {
      setActionSuccess("Successfully checked in!");
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      setTimeout(() => setActionSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setActionError(`Check-in failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Check-out mutation
  const checkOutMutation = useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkOutSchedule(scheduleId, { location }),
    onSuccess: () => {
      setActionSuccess("Successfully checked out!");
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      setTimeout(() => setActionSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setActionError(`Check-out failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Cancel check-in mutation
  const cancelCheckInMutation = useMutation({
    mutationFn: (scheduleId: string) => cancelCheckIn(scheduleId),
    onSuccess: () => {
      setActionSuccess("Check-in cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      setTimeout(() => setActionSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setActionError(`Cancel check-in failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Legacy task mutation - not used anymore
  // Keeping for reference
  /*
  const legacyUpdateTaskMutation = useMutation({
    mutationFn: ({
      scheduleId,
      taskId,
      status,
    }: {
      scheduleId: string;
      taskId: string;
      status: "pending" | "completed";
    }) => updateTaskStatus(scheduleId, taskId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
    },
    onError: (error: Error) => {
      setActionError(`Failed to update task: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
  });
  */

  // Notes are now read-only, so we don't need a save notes mutation

  // Helper function to get current location
  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          reject(
            new Error(`Unable to retrieve your location: ${error.message}`)
          );
        }
      );
    });
  };

  // Handle check-in action
  const handleCheckIn = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      const location = await getCurrentLocation();
      await checkInMutation.mutateAsync({ scheduleId, location });
    } catch (error) {
      setActionError(`Failed to get location: ${(error as Error).message}`);
      setIsActionLoading(false);
    }
  };

  // Handle check-out action
  const handleCheckOut = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      const location = await getCurrentLocation();
      await checkOutMutation.mutateAsync({ scheduleId, location });
    } catch (error) {
      setActionError(`Failed to get location: ${(error as Error).message}`);
      setIsActionLoading(false);
    }
  };

  // Handle cancel check-in action
  const handleCancelCheckIn = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      await cancelCheckInMutation.mutateAsync(scheduleId);
    } catch (error) {
      // Error handling is done in the mutation
      setIsActionLoading(false);
    }
  };

  // Task update mutation using the new API endpoint
  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
      done,
      feedback,
    }: {
      taskId: string;
      status: "completed" | "not_completed";
      done: boolean;
      feedback?: string;
    }) => updateTask(taskId, { status, done, feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
    },
    onError: (error: Error) => {
      setActionError(`Failed to update task: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
  });

  // Handle task update
  const handleTaskUpdate = async (
    taskId: string,
    status: "completed" | "not_completed",
    feedback?: string
  ) => {
    if (!scheduleId) return;

    try {
      await updateTaskMutation.mutateAsync({
        taskId,
        status,
        done: true, // Always true when posting to the API
        feedback,
      });
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  // Notes are now read-only, so we don't need a handleSaveNotes function

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading schedule details...
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <h3 className="font-bold">Error loading schedule</h3>
        <p>{error?.message || "Schedule not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-red-700 hover:text-red-800 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Format address from client location
  const formatAddress = (location: any) => {
    if (!location) return "";

    const parts = [
      location.house_number,
      location.street,
      location.city,
      location.state,
      location.pincode,
    ].filter(Boolean);

    return parts.join(", ");
  };

  // Convert API status to our internal format
  const visitStatus = schedule.VisitStatus.toLowerCase() as
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed";

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTimeRange = (from: string, to: string) => {
    return `${formatTime(from)} - ${formatTime(to)}`;
  };

  return (
    <>
      <Title>
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <span className="text-lg font-semibold">Schedule Details</span>
        </div>
      </Title>

      <div className="mt-4 bg-white rounded-2xl shadow-sm p-4 md:p-5">
        <h2 className="text-xl md:text-2xl font-bold text-center text-teal-700">
          {schedule.ServiceName}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-3 mb-4">
          <img
            src={
              schedule.ClientInfo.ProfilePicture ||
              "https://via.placeholder.com/60"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2 sm:mb-0 sm:mr-3 object-cover"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-semibold">
              {schedule.ClientInfo.FirstName} {schedule.ClientInfo.LastName}
            </h3>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around bg-secondary rounded-xl text-gray-700 py-3 mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <img
              src={calendar}
              alt="calendar"
              className="w-6 h-6 rounded-full mr-1"
            />
            <span className="text-sm md:text-base">
              {formatDate(schedule.ScheduledSlot.From)}
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={clock}
              alt="clock"
              className="w-5 h-5 rounded-full mr-1"
            />
            <span className="text-sm md:text-base">
              {formatTimeRange(
                schedule.ScheduledSlot.From,
                schedule.ScheduledSlot.To
              )}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Client Contact:</h3>
          <div className="flex items-center mb-2">
            <span className="mr-2">✉</span>
            <span>{schedule.ClientInfo.Email}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Address:</h3>
          <div className="flex items-start">
            <img
              src={locationIcon}
              alt="location"
              className="w-5 h-5 mt-1 mr-2"
            />
            <span>{formatAddress(schedule.ClientInfo.Location)}</span>
          </div>
        </div>

        {/* Task List Component */}
        <TaskList
          tasks={schedule.Tasks.map((task) => ({
            id: task.ID,
            title: task.Title,
            description: task.Description,
            status: task.Status.toLowerCase() as "pending" | "completed",
            feedback: task.Feedback || undefined,
          }))}
          visitStatus={visitStatus}
          onTaskUpdate={handleTaskUpdate}
        />

        {/* Service Notes Component */}
        <ServiceNotes notes={schedule.ServiceNote} />

        {/* Location Map Component for Check-in Location */}
        {(schedule.CheckinTime || visitStatus === "in_progress") && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Clock-In Location</h3>
            <LocationMap
              location={schedule.CheckinLocation}
              address={formatAddress(schedule.ClientInfo.Location)}
            />
          </div>
        )}

        {/* Location Map Component for Checkout Location */}
        {schedule.CheckoutTime && (
          <LocationMap
            location={schedule.CheckoutLocation}
            title="Check-out Location"
          />
        )}

        {/* Success/Error messages */}
        {actionSuccess && (
          <div className="mt-4 bg-green-50 text-green-800 p-3 rounded-lg">
            {actionSuccess}
          </div>
        )}

        {actionError && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg">
            {actionError}
          </div>
        )}

        {/* Action Buttons Component */}
        <ActionButtons
          visitStatus={visitStatus}
          onCheckin={handleCheckIn}
          onCheckout={handleCheckOut}
          onCancelCheckin={handleCancelCheckIn}
          isLoading={isActionLoading}
        />
      </div>
    </>
  );
};

export default ScheduleDetailPage;
