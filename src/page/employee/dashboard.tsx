import React, { useState } from "react";
import {
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Coffee,
  Award,
  MessageCircle,
  Plus,
  Filter,
  Calendar,
  FileText,
  Users,
  Paperclip,
  Send,
  Upload,
  Bell,
} from "lucide-react";

interface TaskFiles {
  [key: number]: File;
}

const EmployeeDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState(new Set<number>());
  const [taskFiles, setTaskFiles] = useState<TaskFiles>({});

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tasks = [
    {
      id: 1,
      title: "Complete Q4 Report",
      priority: "High",
      due: "2 hours",
      status: "in-progress",
      hasFile: false,
    },
    {
      id: 2,
      title: "Review Psychology Campaign",
      priority: "Medium",
      due: "1 day",
      status: "pending",
      hasFile: true,
    },
    {
      id: 3,
      title: "Team Meeting Prep",
      priority: "High",
      due: "30 min",
      status: "urgent",
      hasFile: false,
    },
    {
      id: 4,
      title: "Update Astrology Database",
      priority: "Low",
      due: "3 days",
      status: "pending",
      hasFile: false,
    },
  ];

  const handleTaskSelect = (taskId: number) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const handleFileUpload = (
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setTaskFiles((prev) => ({
        ...prev,
        [taskId]: file,
      }));
    }
  };

  const handleSubmitAllTasks = () => {
    if (selectedTasks.size === 0) {
      alert("Please select at least one task to submit");
      return;
    }

    const selectedTasksList = Array.from(selectedTasks);
    console.log("Submitting tasks:", selectedTasksList);
    console.log("With files:", taskFiles);
    alert(`Submitted ${selectedTasks.size} task(s) successfully!`);

    setSelectedTasks(new Set());
    setTaskFiles({});
  };

  const meetings = [
    { time: "11:30 AM", title: "Daily Standup", attendees: 8 },
    { time: "2:00 PM", title: "Report Review", attendees: 4 },
    { time: "4:30 PM", title: "Team Meeting", attendees: 12 },
  ];

  const notifications = [
    {
      type: "message",
      content: "Dhanashekar commented on your report",
      time: "5 min ago",
    },
    {
      type: "task",
      content: "New task assigned: UI Review",
      time: "15 min ago",
    },
    {
      type: "meeting",
      content: "Meeting reminder in 30 minutes",
      time: "30 min ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Good evening, Devan! ☀️
                </h2>
                <p className="text-gray-600">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  •{" "}
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Plus size={16} />
                New Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={20} />
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">18</h3>
              <p className="text-gray-600 text-sm">Tasks Completed</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <span className="text-sm text-blue-600 font-medium">38.5h</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">6</h3>
              <p className="text-gray-600 text-sm">Hours Today</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={20} />
                </div>
                <span className="text-sm text-purple-600 font-medium">95%</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">4.8</h3>
              <p className="text-gray-600 text-sm">Performance Score</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={20} />
                </div>
                <span className="text-sm text-orange-600 font-medium">12</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">3</h3>
              <p className="text-gray-600 text-sm">Active Projects</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-black">
                    Today's Tasks
                  </h3>
                  <div className="flex items-center gap-3">
                    {selectedTasks.size > 0 && (
                      <button
                        onClick={handleSubmitAllTasks}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        <Send size={16} />
                        Submit {selectedTasks.size} Task
                        {selectedTasks.size > 1 ? "s" : ""}
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-black">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            task.status === "urgent"
                              ? "bg-red-500"
                              : task.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>

                        <div className="flex-1">
                          <h4 className="font-medium text-black">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-sm text-gray-500">
                              Due in {task.due}
                            </span>
                            {task.hasFile && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                                <Paperclip size={12} />
                                File attached
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.has(task.id)}
                            onChange={() => handleTaskSelect(task.id)}
                            className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      <div className="border-t bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor={`file-${task.id}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                            >
                              <Upload size={16} />
                              {taskFiles[task.id]
                                ? "Change file"
                                : "Attach file"}
                            </label>
                            <input
                              id={`file-${task.id}`}
                              type="file"
                              onChange={(e) => handleFileUpload(task.id, e)}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                            />
                            {taskFiles[task.id] && (
                              <span className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle size={14} />
                                {taskFiles[task.id].name}
                              </span>
                            )}
                          </div>

                          <button
                            className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
                              selectedTasks.has(task.id) && taskFiles[task.id]
                                ? "bg-black text-white border-black"
                                : "border-gray-300 text-gray-500 hover:border-black hover:text-black"
                            }`}
                          >
                            Mark Complete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                    <Clock size={24} className="text-gray-600" />
                    <span className="text-sm font-medium">Log Time</span>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                    <FileText size={24} className="text-gray-600" />
                    <span className="text-sm font-medium">New Report</span>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                    <MessageCircle size={24} className="text-gray-600" />
                    <span className="text-sm font-medium">Team Chat</span>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                    <Coffee size={24} className="text-gray-600" />
                    <span className="text-sm font-medium">Break Time</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Today's Schedule
                </h3>
                <div className="space-y-3">
                  {meetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-sm font-medium text-black w-16">
                        {meeting.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-black text-sm">
                          {meeting.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {meeting.attendees} attendees
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Bell size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "message"
                            ? "bg-blue-500"
                            : notification.type === "task"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black text-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} />
                  This Week
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tasks Completed</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Goals Achieved</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
