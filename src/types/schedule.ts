import type { Task } from "./task";

// src/types/schedule.ts
export interface ClientInfo {
  ID: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Location: {
    house_number: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    long: number;
  };
}

export interface ScheduledSlot {
  From: string;
  To: string;
}

export interface Location {
  lat: number | null;
  long: number | null;
}

export interface Schedule {
  ID: string;
  ClientUserID: string;
  ClientInfo: ClientInfo;
  AssignedUserID: string;
  ServiceName: string;
  ScheduledSlot: ScheduledSlot;
  VisitStatus: 'upcoming' | 'in_progress' | 'completed' | 'missed';
  CheckinTime: string | null;
  CheckoutTime: string | null;
  CheckinLocation: Location;
  CheckoutLocation: Location;
  Tasks: Task[];
  ServiceNote: string | null;
}
