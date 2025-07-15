// src/constants/scheduleData.ts

// Mock schedule data for development and testing






// src/constants/scheduleData.ts

// Visit status constants
export const VISIT_STATUS = {
  UPCOMING: "upcoming",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  MISSED: "missed"
} as const;

// Task status constants
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  NOT_COMPLETED: "not_completed"
} as const;

// You can import these and use like:
// if (visitStatus === VISIT_STATUS.COMPLETED)

export const scheduleData = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    client_user_id: "c1d2e3f4-5g6h-7i8j-9k0l-1m2n3o4p5q6r",
    AssignedUserID: "a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    scheduled_slot: {
      from: "2025-07-15T08:30:00Z",
      to: "2025-07-15T10:30:00Z"
    },
    visit_status: VISIT_STATUS.COMPLETED,
    checkin_time: "2025-07-15T08:35:00Z",
    checkout_time: "2025-07-15T10:25:00Z",
    checkin_location: {
      lat: 28.6135,
      long: 77.2091
    },
    checkout_location: {
      lat: 28.6137,
      long: 77.2089
    },
    tasks: [
      {
        id: "t1a2b3c4-5d6e-7f8g-9h0i-1j2k3l4m5n6o",
        title: "Assist with bathing",
        description: "Help patient with morning bath and grooming",
        status: TASK_STATUS.NOT_COMPLETED,
        done: false,
        feedback: "Patient refused bathing"
      },
      {
        id: "t2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
        title: "Medication administration",
        description: "Give prescribed morning medication",
        status: TASK_STATUS.COMPLETED,
        done: true,
        feedback: "All medications taken as prescribed"
      }
    ],
    service_note: "Client was calm and cooperative."
  },
   {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    client_user_id: "c2d3e4f5-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
    AssignedUserID: "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
    scheduled_slot: {
      from: "2025-07-15T13:00:00Z",
      to: "2025-07-15T15:00:00Z"
    },
    visit_status: "upcoming",
    checkin_time: null,
    checkout_time: null,
    checkin_location: { lat: null, long: null },
    checkout_location: { lat: null, long: null },
    tasks: [
      {
        id: "t3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
        title: "Prepare lunch",
        description: "Cook and serve nutritious lunch",
        status: "pending",
        done: null,
        feedback: null
      },
      {
        id: "t4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
        title: "Light housekeeping",
        description: "Clean kitchen and dining area",
        status: "pending",
        done: null,
        feedback: null
      }
    ],
    service_note: null
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    client_user_id: "c3d4e5f6-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    AssignedUserID: "a3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
    scheduled_slot: {
      from: "2025-07-14T09:00:00Z",
      to: "2025-07-14T11:00:00Z"
    },
    visit_status: "missed",
    checkin_time: null,
    checkout_time: null,
    checkin_location: { lat: null, long: null },
    checkout_location: { lat: null, long: null },
    tasks: [
      {
        id: "t5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
        title: "Physical therapy exercises",
        description: "Guide through prescribed PT routine",
        status: "not_completed",
        done: false,
        feedback: "Visit was missed"
      }
    ],
    service_note: "Caregiver unable to attend due to emergency."
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    client_user_id: "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
    AssignedUserID: "a4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
    scheduled_slot: {
      from: "2025-07-15T17:00:00Z",
      to: "2025-07-15T19:00:00Z"
    },
    visit_status: "in_progress",
    checkin_time: "2025-07-15T17:05:00Z",
    checkout_time: null,
    checkin_location: {
      lat: 28.6140,
      long: 77.2090
    },
    checkout_location: { lat: null, long: null },
    tasks: [
      {
        id: "t6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t",
        title: "Evening medication",
        description: "Administer prescribed evening medication",
        status: "completed",
        done: true,
        feedback: "Medication administered on time"
      },
      {
        id: "t7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u",
        title: "Prepare dinner",
        description: "Cook and serve nutritious dinner",
        status: "in_progress",
        done: null,
        feedback: null
      }
    ],
    service_note: null
  }

];

