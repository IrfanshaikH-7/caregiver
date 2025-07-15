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
  visit_status: 'upcoming' | 'in_progress' | 'completed' | 'missed';
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
