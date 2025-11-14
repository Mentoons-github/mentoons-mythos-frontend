import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getEmployeeAttendanceThunk } from "../../features/attendance_leave/attendance_leaveThunk";
import AttendanceStats from "../components/AttendanceStatus";
import { ChartPie, List } from "lucide-react";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceFilterModal from "../components/modals/AttendanceFilterModal";

const EmployeeAttendance = () => {
  const dispatch = useAppDispatch();
  const { employeeAttendance, loading, hasMore, lastFetchedDate, summary } =
    useAppSelector((state) => state.attendance_leave);

  const [showTable, setShowTable] = useState(false);
  const [activeTabe, setActiveTab] = useState("table");
  const [attendanceFilter, setAttendanceFilter] = useState(false);

  useEffect(() => {
    dispatch(
      getEmployeeAttendanceThunk({
        filter: "all",
      })
    );
    const timer = setTimeout(() => setShowTable(true), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const loadMore = () => {
    if (!hasMore) return;
    dispatch(
      getEmployeeAttendanceThunk({
        lastFetchedDate,
      })
    );
  };

  const applyFilter = (filter?: string, start?: string, end?: string) => {
    dispatch(
      getEmployeeAttendanceThunk({
        lastFetchedDate: undefined,
        filter,
        start,
        end,
      })
    );
  };

  return (
    <div className="p-">
      <div className="md:flex space-y-3 justify-between ">
        <div className="flex-1">
          <h1 className="flex text-xl md:text-2xl font-semibold">
            Attendance Report
          </h1>
          <p className="text-xs md:text-base text-muted-foreground ">
            Selected Date Attentance Report
          </p>
        </div>
        <div className="flex flex-1 justify-between">
          <div className="flex">
            <div
              className={`border rounded-l-md p-3 hover:bg-background ${
                activeTabe === "table" && "bg-background"
              }`}
              onClick={() => setActiveTab("table")}
            >
              <List size={25} />
            </div>
            <div
              className={`border rounded-r-md p-3 hover:bg-background ${
                activeTabe === "graph" && "bg-background"
              }`}
              onClick={() => setActiveTab("graph")}
            >
              <ChartPie size={25} />
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-blue-800  p-3 text-white rounded-md"
              onClick={() => setAttendanceFilter(true)}
            >
              Select Date
            </button>
          </div>
        </div>
      </div>

      {activeTabe === "graph" ? (
        <AttendanceStats summary={summary ?? undefined} loading={loading} />
      ) : (
        <AttendanceTable
          showTable={showTable}
          loading={loading}
          employeeAttendance={employeeAttendance}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      )}

      {attendanceFilter && (
        <AttendanceFilterModal
          onClose={() => setAttendanceFilter(false)}
          onApply={applyFilter}
        />
      )}
    </div>
  );
};

export default EmployeeAttendance;
