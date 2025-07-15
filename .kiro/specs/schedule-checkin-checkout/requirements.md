# Requirements Document

## Introduction

The Schedule Check-in/Checkout feature allows caregivers to manage their schedule visits by checking in when they arrive at a client's location and checking out when they complete their service. This feature will provide a dedicated page where users can view schedule details, mark tasks as completed, and perform check-in/checkout actions based on the current status of the visit.

## Requirements

### Requirement 1

**User Story:** As a caregiver, I want to view detailed information about a scheduled visit, so that I can understand what tasks need to be completed.

#### Acceptance Criteria

1. WHEN a user navigates to the schedule details page THEN the system SHALL display comprehensive information about the schedule including client details, service name, scheduled time, and tasks.
2. WHEN a schedule is loaded THEN the system SHALL display the client's location on a map.
3. WHEN a schedule is loaded THEN the system SHALL display all tasks associated with the schedule.
4. WHEN a schedule is loaded THEN the system SHALL display any service notes if available.

### Requirement 2

**User Story:** As a caregiver, I want to check in to a scheduled visit, so that I can mark the beginning of my service.

#### Acceptance Criteria

1. WHEN a user views a schedule with "upcoming" status THEN the system SHALL display a "Clock-In Now" button.
2. WHEN a user clicks the "Clock-In Now" button THEN the system SHALL record the current time and location as check-in data.
3. WHEN a user successfully checks in THEN the system SHALL update the visit status from "upcoming" to "in_progress".
4. WHEN a check-in is completed THEN the system SHALL display the check-in time and location on the page.

### Requirement 3

**User Story:** As a caregiver, I want to check out from a visit, so that I can mark the completion of my service.

#### Acceptance Criteria

1. WHEN a user views a schedule with "in_progress" status THEN the system SHALL display a "Clock-Out" button.
2. WHEN a user clicks the "Clock-Out" button THEN the system SHALL record the current time and location as checkout data.
3. WHEN a user successfully checks out THEN the system SHALL update the visit status from "in_progress" to "completed".
4. WHEN a checkout is completed THEN the system SHALL display the checkout time and location on the page.

### Requirement 4

**User Story:** As a caregiver, I want to cancel a check-in if I made a mistake, so that I can correct erroneous check-ins.

#### Acceptance Criteria

1. WHEN a user views a schedule with "in_progress" status THEN the system SHALL display a "Cancel Check-In" button.
2. WHEN a user clicks the "Cancel Check-In" button THEN the system SHALL revert the visit status from "in_progress" to "upcoming".
3. WHEN a check-in is cancelled THEN the system SHALL clear the previously recorded check-in time and location.

### Requirement 5

**User Story:** As a caregiver, I want to mark tasks as completed during my visit, so that I can track my progress.

#### Acceptance Criteria

1. WHEN a user views tasks for an "in_progress" visit THEN the system SHALL allow marking tasks as completed.
2. WHEN a user marks a task as completed THEN the system SHALL update the task status in real-time.
3. WHEN all tasks are completed THEN the system SHALL visually indicate this to the user.
4. IF a user attempts to check out without completing all tasks THEN the system SHALL prompt for confirmation.

### Requirement 6

**User Story:** As a caregiver, I want to add service notes to a visit, so that I can document important information about the service provided.

#### Acceptance Criteria

1. WHEN a user views a schedule with "in_progress" status THEN the system SHALL provide a text area for service notes.
2. WHEN a user submits service notes THEN the system SHALL save the notes with the schedule record.
3. WHEN service notes are saved THEN the system SHALL display the notes on the schedule details page.
