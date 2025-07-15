// src/components/schedule/TaskList.tsx
import React, { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  feedback?: string;
}

interface TaskListProps {
  tasks: Task[];
  visitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  onTaskUpdate?: (
    taskId: string,
    status: "completed" | "not_completed",
    feedback?: string
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  visitStatus,
  onTaskUpdate,
}) => {
  const isInteractive = visitStatus === "in_progress";
  const [showReasonInput, setShowReasonInput] = useState<string | null>(null);
  const [taskReasons, setTaskReasons] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, "yes" | "no">
  >({});

  // Initialize task reasons and selected options from tasks
  useEffect(() => {
    const initialReasons: Record<string, string> = {};
    const initialOptions: Record<string, "yes" | "no"> = {};

    tasks.forEach((task) => {
      if (task.feedback) {
        initialReasons[task.id] = task.feedback;
        // If there's feedback, also show the input field
        setShowReasonInput(task.id);
      }

      initialOptions[task.id] = task.status === "completed" ? "yes" : "no";
    });

    setTaskReasons(initialReasons);
    setSelectedOptions(initialOptions);
  }, [tasks]);

  const handleTaskToggle = (taskId: string, status: "yes" | "no") => {
    if (!isInteractive || !onTaskUpdate) return;

    // Update the selected option
    setSelectedOptions((prev) => ({
      ...prev,
      [taskId]: status,
    }));

    if (status === "no") {
      setShowReasonInput(taskId);
    } else {
      // Send update for "yes" option
      onTaskUpdate(taskId, "completed");
    }
  };

  const handleReasonChange = (taskId: string, reason: string) => {
    setTaskReasons((prev) => ({
      ...prev,
      [taskId]: reason,
    }));
  };

  const handleReasonBlur = (taskId: string) => {
    if (!isInteractive || !onTaskUpdate || !taskReasons[taskId]) return;

    // Send update with reason when input loses focus
    onTaskUpdate(taskId, "not_completed", taskReasons[taskId]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tasks:</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned for this schedule.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="mb-6 bg-white p-4 rounded-lg border border-gray-100"
              style={{
                boxShadow: "0px 0px 7px 0px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="mb-2">
                <h4 className="text-teal-700 font-medium">{task.title}</h4>
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>

              {isInteractive ? (
                <div>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleTaskToggle(task.id, "yes")}
                      className={`flex items-center mr-4 ${
                        selectedOptions[task.id] === "yes"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-5 w-5 mr-1 ${
                          selectedOptions[task.id] === "yes"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Yes</span>
                    </button>

                    <span className="text-gray-300 mx-1">|</span>

                    <button
                      onClick={() => handleTaskToggle(task.id, "no")}
                      className={`flex items-center ${
                        selectedOptions[task.id] === "no"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className="h-5 w-5 mr-1 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>No</span>
                    </button>
                  </div>

                  {showReasonInput === task.id && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Add reason..."
                        className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                        value={taskReasons[task.id] || ""}
                        onChange={(e) =>
                          handleReasonChange(task.id, e.target.value)
                        }
                        onBlur={() => handleReasonBlur(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleReasonBlur(task.id);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center mt-2">
                    {task.status === "completed" ? (
                      <div className="flex items-center text-green-600">
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>No</span>
                      </div>
                    )}
                  </div>

                  {/* Display feedback for non-interactive tasks */}
                  {task.feedback && (
                    <div className="mt-2">
                      <div className="w-full p-3 border border-gray-200 rounded-full bg-gray-50 text-sm text-gray-600">
                        {task.feedback}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isInteractive && tasks.every((task) => task.status === "completed") && (
        <div className="bg-green-50 text-green-800 p-2 rounded-md text-sm">
          All tasks completed!
        </div>
      )}
    </div>
  );
};

export default TaskList;
