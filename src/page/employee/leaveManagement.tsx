import React, { useState, useEffect, JSX } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  User,
  Plane,
  Heart,
  Briefcase,
  Home,
  Users,
  Download,
  Search,
  MoreVertical,
  Zap,
  TrendingUp,
  Award,
  LucideIcon,
} from "lucide-react";

interface LeaveType {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

interface LeaveHistory {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "approved" | "pending" | "rejected";
  reason: string;
  appliedOn: string;
  approvedBy?: string;
  rejectionReason?: string;
  rejectedBy?: string;
}

interface UpcomingLeave {
  employee: string;
  type: string;
  dates: string;
  days: number;
  avatar: string;
}

interface FormData {
  selectedLeaveType: string;
  leaveStartDate: string;
  leaveEndDate: string;
  leaveReason: string;
}

const LeaveManagement: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showNewLeaveForm, setShowNewLeaveForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    selectedLeaveType: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leaveReason: "",
  });
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const leaveTypes: LeaveType[] = [
    {
      id: "annual",
      name: "Annual Leave",
      icon: Plane,
      color: "blue",
      gradient: "from-gray-100 to-gray-200",
    },
    {
      id: "sick",
      name: "Sick Leave",
      icon: Heart,
      color: "red",
      gradient: "from-gray-50 to-gray-100",
    },
    {
      id: "personal",
      name: "Personal Leave",
      icon: User,
      color: "purple",
      gradient: "from-gray-100 to-gray-150",
    },
    {
      id: "emergency",
      name: "Emergency Leave",
      icon: AlertCircle,
      color: "orange",
      gradient: "from-gray-75 to-gray-125",
    },
    {
      id: "maternity",
      name: "Maternity/Paternity",
      icon: Home,
      color: "green",
      gradient: "from-gray-50 to-gray-150",
    },
    {
      id: "compensatory",
      name: "Comp Off",
      icon: Briefcase,
      color: "gray",
      gradient: "from-gray-100 to-gray-200",
    },
  ];

  const leaveHistory: LeaveHistory[] = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-08-01",
      endDate: "2024-08-05",
      days: 5,
      status: "approved",
      reason: "Family vacation to the mountains",
      appliedOn: "2024-07-15",
      approvedBy: "Ram",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-07-20",
      endDate: "2024-07-21",
      days: 2,
      status: "approved",
      reason: "Fever and cold symptoms",
      appliedOn: "2024-07-20",
      approvedBy: "Ram",
    },
    {
      id: 3,
      type: "Personal Leave",
      startDate: "2024-08-25",
      endDate: "2024-08-25",
      days: 1,
      status: "pending",
      reason: "Personal errands and appointments",
      appliedOn: "2024-08-18",
    },
    {
      id: 4,
      type: "Annual Leave",
      startDate: "2024-09-10",
      endDate: "2024-09-12",
      days: 3,
      status: "rejected",
      reason: "Wedding celebration of close friend",
      appliedOn: "2024-08-10",
      rejectionReason: "Peak project delivery period - please reschedule",
      rejectedBy: "Sam",
    },
  ];

  const upcomingLeaves: UpcomingLeave[] = [
    {
      employee: "Dhanashekar",
      type: "Annual Leave",
      dates: "Aug 22-26",
      days: 5,
      avatar: "SJ",
    },
    {
      employee: "Devan",
      type: "Sick Leave",
      dates: "Aug 19",
      days: 1,
      avatar: "MC",
    },
    {
      employee: "Jasim",
      type: "Personal Leave",
      dates: "Aug 23",
      days: 1,
      avatar: "ED",
    },
    {
      employee: "Alex Kumar",
      type: "Maternity",
      dates: "Aug 20-Sep 20",
      days: 32,
      avatar: "AK",
    },
  ];

  const handleSubmitLeave = () => {
    const { selectedLeaveType, leaveStartDate, leaveEndDate, leaveReason } =
      formData;
    if (
      !selectedLeaveType ||
      !leaveStartDate ||
      !leaveEndDate ||
      !leaveReason
    ) {
      alert("Please fill in all required fields");
      return;
    }

    alert("Leave application submitted successfully!");
    setShowNewLeaveForm(false);
    setFormData({
      selectedLeaveType: "",
      leaveStartDate: "",
      leaveEndDate: "",
      leaveReason: "",
    });
  };

  const getStatusIcon = (status: string): JSX.Element => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="text-green-600" />;
      case "rejected":
        return <XCircle size={16} className="text-red-600" />;
      case "pending":
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredHistory = leaveHistory.filter((leave) => {
    if (activeTab === "all") return true;
    return leave.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-black">Leave Hub</h1>
                  <p className="text-xs text-gray-500">Workforce Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <button
                onClick={() => setShowNewLeaveForm(true)}
                className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Apply Leave</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-lg">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="hidden lg:flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-gray-400">Days Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-400">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm text-gray-400">Approval Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Zap,
                  label: "Quick Apply",
                  desc: "Fast leave request",
                  action: () => setShowNewLeaveForm(true),
                },
                {
                  icon: TrendingUp,
                  label: "Analytics",
                  desc: "Leave insights",
                },
                { icon: Award, label: "Entitlements", desc: "Your balances" },
                { icon: Users, label: "Team Calendar", desc: "Who's out" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-black transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <item.icon className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors mb-2" />
                  <div className="text-left">
                    <div className="font-semibold text-black text-sm">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Leave Applications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">
                    Leave Applications
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Search leaves..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                      />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: "all", label: "All" },
                    { id: "pending", label: "Pending" },
                    { id: "approved", label: "Approved" },
                    { id: "rejected", label: "Rejected" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setActiveTab(
                          tab.id as "all" | "pending" | "approved" | "rejected"
                        )
                      }
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {filteredHistory.map((leave) => {
                  const leaveType = leaveTypes.find(
                    (t) => t.name === leave.type
                  );
                  return (
                    <div
                      key={leave.id}
                      className="group bg-gradient-to-r from-white to-gray-50/50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-gray-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {leaveType && leaveType.icon && (
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                              <leaveType.icon
                                size={20}
                                className="text-gray-700"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-black text-lg">
                              {leave.type}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Applied{" "}
                              {new Date(leave.appliedOn).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                              leave.status
                            )}`}
                          >
                            {getStatusIcon(leave.status)}
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                            <MoreVertical size={16} className="text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white/70 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">
                            Start Date
                          </p>
                          <p className="font-semibold text-black">
                            {new Date(leave.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">End Date</p>
                          <p className="font-semibold text-black">
                            {new Date(leave.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Duration</p>
                          <p className="font-semibold text-black">
                            {leave.days} day{leave.days > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <p className="font-semibold text-black capitalize">
                            {leave.status}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-2">Reason</p>
                        <p className="text-black text-sm leading-relaxed">
                          {leave.reason}
                        </p>

                        {leave.approvedBy && leave.status === "approved" && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-green-700">
                              ✓ Approved by {leave.approvedBy}
                            </p>
                          </div>
                        )}

                        {leave.rejectionReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm">
                              <strong>Rejection Reason:</strong>{" "}
                              {leave.rejectionReason}
                            </p>
                            {leave.rejectedBy && (
                              <p className="text-xs text-red-600 mt-1">
                                Rejected by {leave.rejectedBy}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Leave Balance Card */}
            <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Award size={20} />
                  Leave Balance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Leave</span>
                    <span className="text-xl font-bold">12 days</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div>
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-gray-400">Used</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-gray-400">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <Calendar size={20} />
                August 2024
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="p-2 font-semibold text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
                        [1, 2, 3, 4, 5].includes(i + 1)
                          ? "bg-black text-white shadow-sm"
                          : [25].includes(i + 1)
                          ? "bg-orange-100 text-orange-800 border border-orange-200"
                          : i + 1 === 18
                          ? "bg-gray-200 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <span className="text-gray-600">Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-200 rounded-full border border-orange-300"></div>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    <span className="text-gray-600">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <Users size={20} />
                Team Schedule
              </h3>
              <div className="space-y-3">
                {upcomingLeaves.map((leave, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {leave.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black text-sm">
                        {leave.employee}
                      </p>
                      <p className="text-xs text-gray-500">
                        {leave.type} • {leave.dates}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-500">
                          {leave.days} days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Insights
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Leave Utilization
                    </span>
                    <span className="text-lg font-bold text-black">48%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-black to-gray-700 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: "48%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    8 of 20 days used this year
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-xl font-bold text-black">95%</div>
                    <div className="text-xs text-gray-600">
                      On-time Applications
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-xl font-bold text-black">2.1</div>
                    <div className="text-xs text-gray-600">
                      Avg Days/Request
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Modal */}
      {showNewLeaveForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    Apply for Leave
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Submit your leave request
                  </p>
                </div>
                <button
                  onClick={() => setShowNewLeaveForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-4">
                  Choose Leave Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedLeaveType: type.id,
                        }))
                      }
                      className={`p-4 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 hover:shadow-md ${
                        formData.selectedLeaveType === type.id
                          ? "border-black bg-gray-50 shadow-md transform scale-105"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <type.icon size={20} className="text-gray-700" />
                      </div>
                      <span className="text-sm font-medium text-center leading-tight">
                        {type.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.leaveStartDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        leaveStartDate: e.target.value,
                      }))
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.leaveEndDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        leaveEndDate: e.target.value,
                      }))
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Reason for Leave
                </label>
                <textarea
                  value={formData.leaveReason}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      leaveReason: e.target.value,
                    }))
                  }
                  placeholder="Please provide a detailed reason for your leave request..."
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black resize-none transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowNewLeaveForm(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-black hover:text-black transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitLeave}
                  className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
