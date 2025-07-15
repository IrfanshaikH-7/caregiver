# Design Document: Schedule Check-in/Checkout Feature

## Overview

The Schedule Check-in/Checkout feature provides caregivers with a dedicated page to manage their scheduled visits. This page will allow users to view detailed information about a specific schedule, check in when they arrive at the client's location, mark tasks as completed during their visit, and check out when they finish their service. The design follows the existing application's UI patterns and component structure to maintain consistency.

## Architecture

The feature will follow the existing React application architecture with the following components:

1. **Page Component**: `ScheduleDetailPage` - The main container component that will fetch and display schedule details
2. **API Integration**: Extend existing API queries and mutations to support schedule detail fetching and check-in/checkout operations
3. **State Management**: Use React Query for server state management and React's useState/useEffect for local UI state
4. **Routing**: Integrate with the existing router to support navigation to/from the schedule detail page

## Components and Interfaces

### 1. ScheduleDetailPage Component

The main page component that will:

- Fetch schedule details using the schedule ID from URL parameters
- Display schedule information, client details, and tasks
- Render the appropriate action buttons based on visit status
- Handle check-in/checkout operations

```typescript
interface ScheduleDetailPageProps {
  // Any props needed for the page component
}

const ScheduleDetailPage: React.FC<ScheduleDetailPageProps> = () => {
  // Component implementation
};
```

### 2. TaskList Component

A reusable component to display and manage tasks associated with a schedule:

```typescript
interface TaskListProps {
  tasks: Task[];
  visitStatus: string;
  onTaskUpdate: (taskId: string, status: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  visitStatus,
  onTaskUpdate,
}) => {
  // Component implementation
};
```

### 3. LocationMap Component

A component to display the check-in/checkout location on a map:

```typescript
interface LocationMapProps {
  location: {
    lat: number | null;
    long: number | null;
  };
  address?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, address }) => {
  // Component implementation
};
```

### 4. ActionButtons Component

A component to render the appropriate action buttons based on visit status:

```typescript
interface ActionButtonsProps {
  visitStatus: string;
  onCheckin: () => void;
  onCheckout: () => void;
  onCancelCheckin: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  visitStatus,
  onCheckin,
  onCheckout,
  onCancelCheckin,
}) => {
  // Component implementation
};
```

### 5. ServiceNotes Component

A component to display and edit service notes:

```typescript
interface ServiceNotesProps {
  notes: string | null;
  visitStatus: string;
  onSaveNotes: (notes: string) => void;
}

const ServiceNotes: React.FC<ServiceNotesProps> = ({
  notes,
  visitStatus,
  onSaveNotes,
}) => {
  // Component implementation
};
```

## Data Models

We'll extend the existing Schedule type to ensure it includes all necessary fields:

```typescript
// Extended Schedule interface
interface DetailedSchedule extends Schedule {
  clientInfo: {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    location: {
      house_number: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      lat: number;
      long: number;
    };
  };
  serviceName: string;
  tasks: Task[];
}

// Task interface (already exists but may need extension)
interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  done: boolean | null;
  feedback: string | null;
}
```

## API Integration

### 1. Queries

Extend the existing API queries to fetch detailed schedule information:

```typescript
// Get detailed schedule by ID
const getScheduleById = (scheduleId: string): Promise<DetailedSchedule> => {
  return api
    .get(`/v1/schedules/${scheduleId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching schedule details:", error);
      throw error;
    });
};
```

### 2. Mutations

Add mutations for check-in, checkout, and task updates:

```typescript
// Check-in to a schedule
const checkInSchedule = (
  scheduleId: string,
  location: { lat: number; long: number }
): Promise<any> => {
  return api
    .post(`/v1/schedules/${scheduleId}/checkin`, { location })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error checking in:", error);
      throw error;
    });
};

// Check-out from a schedule
const checkOutSchedule = (
  scheduleId: string,
  location: { lat: number; long: number }
): Promise<any> => {
  return api
    .post(`/v1/schedules/${scheduleId}/checkout`, { location })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error checking out:", error);
      throw error;
    });
};

// Cancel check-in
const cancelCheckIn = (scheduleId: string): Promise<any> => {
  return api
    .post(`/v1/schedules/${scheduleId}/cancel-checkin`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error canceling check-in:", error);
      throw error;
    });
};

// Update task status
const updateTaskStatus = (
  scheduleId: string,
  taskId: string,
  status: string
): Promise<any> => {
  return api
    .patch(`/v1/schedules/${scheduleId}/tasks/${taskId}`, { status })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating task:", error);
      throw error;
    });
};

// Save service notes
const saveServiceNotes = (scheduleId: string, notes: string): Promise<any> => {
  return api
    .patch(`/v1/schedules/${scheduleId}/notes`, { notes })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error saving notes:", error);
      throw error;
    });
};
```

## Error Handling

The feature will implement the following error handling strategies:

1. **API Error Handling**:

   - Display user-friendly error messages for failed API calls
   - Implement retry mechanisms for transient network errors
   - Log detailed error information for debugging

2. **Form Validation**:

   - Validate user inputs before submission
   - Provide clear feedback for validation errors

3. **Geolocation Errors**:

   - Handle cases where geolocation is not available or permission is denied
   - Provide fallback options for manual location entry

4. **Offline Support**:
   - Detect when the user is offline and queue actions for later submission
   - Provide visual indicators of offline status

## Testing Strategy

The testing strategy will include:

1. **Unit Tests**:

   - Test individual components in isolation
   - Mock API calls and state management
   - Verify component behavior for different visit statuses

2. **Integration Tests**:

   - Test the interaction between components
   - Verify data flow through the application
   - Test API integration with mock servers

3. **End-to-End Tests**:

   - Simulate user journeys through the feature
   - Test the complete check-in/checkout flow
   - Verify task completion and note-taking functionality

4. **Accessibility Testing**:
   - Ensure the feature is accessible to all users
   - Test keyboard navigation and screen reader compatibility

## UI Design

The UI will follow the existing application's design system and will include:

### Schedule Detail Page Layout

```
+-----------------------------------------------+
| ← Schedule Details                            |
+-----------------------------------------------+
|                                               |
| Service Name A                                |
| [Profile Image] Melisa Adam                   |
|                                               |
| +-------------------------------------------+ |
| | Mon, 15 Jan 2025     |     09:00 - 10:00 | |
| +-------------------------------------------+ |
|                                               |
| Client Contact:                               |
| ✉ client@example.com                          |
| ☎ +44 1232 212 3233                           |
|                                               |
| Address:                                      |
| 4333 Willison Street,                         |
| Minneapolis, MN, 55415                        |
|                                               |
| Tasks:                                        |
| ○ Activity Name A                             |
|   Description text...                         |
|                                               |
| ○ Activity Name A                             |
|   Description text...                         |
|                                               |
| Service Notes:                                |
| [Text area for notes]                         |
|                                               |
| [Map showing location]                        |
|                                               |
| +-------------------------------------------+ |
| |           Clock-In Now (or)               | |
| |    Cancel Check-In | Clock-Out            | |
| +-------------------------------------------+ |
|                                               |
+-----------------------------------------------+
```

### UI States

1. **Upcoming Visit**:

   - Display "Clock-In Now" button
   - Tasks are displayed but not interactive

2. **In-Progress Visit**:

   - Display "Cancel Check-In" and "Clock-Out" buttons
   - Tasks are interactive and can be marked as completed
   - Service notes can be added/edited

3. **Completed Visit**:
   - All buttons are disabled
   - Display check-in and checkout times
   - Tasks and notes are displayed in read-only mode

## Navigation Flow

1. User navigates to the Schedule Detail page from:

   - Dashboard
   - Schedule list
   - Notifications

2. After check-in/checkout actions:
   - User remains on the page with updated status
   - Option to navigate back to the dashboard or schedule list

## Responsive Design

The feature will be responsive and work well on:

- Desktop browsers
- Tablets
- Mobile devices

Mobile-specific considerations:

- Simplified layout for smaller screens
- Touch-friendly UI elements
- Optimized map display
