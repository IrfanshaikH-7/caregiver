import type { Task } from "./task";

// src/types/schedule.ts
export interface Schedule {
  id: string;
  client_user_id: string;
  AssignedUserID: string;
  scheduled_slot: {
    from: string;
    to: string;
  };
  visit_status: "upcoming" | "in_progress" | "completed" | "missed";
  checkin_time: string | null;
  checkout_time: string | null;
  checkin_location: {
    lat: number | null;
    long: number | null;
  };
  checkout_location: {
    lat: number | null;
    long: number | null;
  };
  tasks: Task[];
  service_note: string | null;
}

// Extended interface for detailed schedule information
export interface DetailedSchedule {
  ID: string;
  ClientUserID: string;
  ClientInfo: {
    ID: string;
    UserName: string;
    Email: string;
    FirstName: string;
    LastName: string;
    ProfilePicture?: string;
    Location: {
      house_number: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      lat: number;
      long: number;
    };
  };
  AssignedUserID: string;
  ServiceName: string;
  ScheduledSlot: {
    From: string;
    To: string;
  };
  VisitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  CheckinTime: string | null;
  CheckoutTime: string | null;
  CheckinLocation: {
    lat: number | null;
    long: number | null;
  };
  CheckoutLocation: {
    lat: number | null;
    long: number | null;
  };
  Tasks: {
    ID: string;
    Title: string;
    Description: string;
    Status: "pending" | "completed";
    Done: boolean | null;
    Feedback: string | null;
  }[];
  ServiceNote: string | null;
}

// Helper function to convert API response format to our internal format
export const mapDetailedScheduleToSchedule = (
  detailedSchedule: DetailedSchedule
): Schedule => {
  return {
    id: detailedSchedule.ID,
    client_user_id: detailedSchedule.ClientUserID,
    AssignedUserID: detailedSchedule.AssignedUserID,
    scheduled_slot: {
      from: detailedSchedule.ScheduledSlot.From,
      to: detailedSchedule.ScheduledSlot.To,
    },
    visit_status: detailedSchedule.VisitStatus.toLowerCase() as
      | "upcoming"
      | "in_progress"
      | "completed"
      | "missed",
    checkin_time: detailedSchedule.CheckinTime,
    checkout_time: detailedSchedule.CheckoutTime,
    checkin_location: detailedSchedule.CheckinLocation,
    checkout_location: detailedSchedule.CheckoutLocation,
    tasks: detailedSchedule.Tasks.map((task) => ({
      id: task.ID,
      title: task.Title,
      description: task.Description,
      status: task.Status,
    })),
    service_note: detailedSchedule.ServiceNote,
  };
};
