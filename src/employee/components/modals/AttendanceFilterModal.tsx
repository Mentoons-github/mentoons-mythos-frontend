import { useState } from "react";
import ReactDOM from "react-dom";
import { X, Calendar, Clock, Filter } from "lucide-react";

interface AttendanceFilterModalProps {
  onClose: () => void;
  onApply: (filter?: string, start?: string, end?: string) => void;
}

const AttendanceFilterModal = ({
  onClose,
  onApply,
}: AttendanceFilterModalProps) => {
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilter = () => {
    onApply(filter, startDate || undefined, endDate || undefined);
    onClose();
  };

  const filterOptions = [
    { value: "all", label: "Show All", icon: Filter },
    { value: "last7", label: "Last 7 Days", icon: Clock },
    { value: "last30", label: "Last 30 Days", icon: Clock },
    { value: "thisWeek", label: "This Week", icon: Calendar },
    { value: "thisMonth", label: "This Month", icon: Calendar },
    { value: "custom", label: "Custom Range", icon: Calendar },
  ];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-md bg-secondary rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-blue-800 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Filter Attendance</h2>
                <p className="text-sm text-blue-100">
                  Select date range to view records
                </p>
              </div>
            </div>
            <button
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
          <div className="space-y-3">
            <label className="block text-sm font-medium  mb-2">
              Quick Filters
            </label>
            {filterOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 ${
                    filter === option.value
                      ? "bg-blue-50 border-blue-800 text-blue-800 shadow-md"
                      : " border-gray-200  hover:border-blue-300 hover:bg-background/50"
                  }`}
                  onClick={() => setFilter(option.value)}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      filter === option.value
                        ? "bg-blue-800 text-white"
                        : "bg-muted-foreground text-secondary "
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span className="font-medium text-left flex-1">
                    {option.label}
                  </span>
                  {filter === option.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Date Range */}
          {filter === "custom" && (
            <div className="mt-6 space-y-4 p-4  rounded-xl border animate-in slide-in-from-top duration-300">
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                Select Custom Date Range
              </label>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              {startDate && endDate && (
                <div className="mt-2 p-2 rounded-lg border border-blue-700">
                  <p className="text-xs text-muted-foreground text-center">
                    Selected: {new Date(startDate).toLocaleDateString()} -{" "}
                    {new Date(endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4  border-t-2  flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2  text-muted-foreground rounded-lg hover:bg-background/50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={applyFilter}
            disabled={
              !filter || (filter === "custom" && (!startDate || !endDate))
            }
            className="flex-1 px-4 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AttendanceFilterModal;
