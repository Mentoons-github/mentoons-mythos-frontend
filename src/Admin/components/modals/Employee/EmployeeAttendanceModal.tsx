import ReactDOM from "react-dom";
import {
  AttendanceTypes,
  SummaryTypes,
} from "../../../../types/employee/attendance&leaveTypes";
import { getEmployeeAttendanceThunk } from "../../../../features/attendance_leave/attendance_leaveThunk";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { ChartPie, List } from "lucide-react";
import AttendanceStats from "../../../../employee/components/AttendanceStatus";
import AttendanceTable from "../../../../employee/components/AttendanceTable";
import AttendanceFilterModal from "../../../../employee/components/modals/AttendanceFilterModal";

const EmployeeAttendaceModal = ({
  onClose,
  loading,
  selectedEmployee,
  employeeAttendance,
  hasMore,
  lastFetchedDate,
  summary,
}: {
  onClose: () => void;
  attendance?: AttendanceTypes;
  loading: boolean;
  selectedEmployee: { employeeId: string; employeeName: string };
  hasMore: boolean;
  lastFetchedDate?: string;
  employeeAttendance: AttendanceTypes[];
  summary?: SummaryTypes;
}) => {
  const dispatch = useAppDispatch();

  const [showTable, setShowTable] = useState(false);
  const [activeTabe, setActiveTab] = useState("table");
  const [attendanceFilter, setAttendanceFilter] = useState(false);

  useEffect(() => {
    dispatch(
      getEmployeeAttendanceThunk({
        employeeId: selectedEmployee.employeeId,
        filter: "all",
      })
    );
    const timer = setTimeout(() => setShowTable(true), 1000);
    return () => clearTimeout(timer);
  }, [dispatch, selectedEmployee.employeeId]);

  const loadMore = () => {
    if (!hasMore) return;
    dispatch(
      getEmployeeAttendanceThunk({
        employeeId: selectedEmployee.employeeId,
        lastFetchedDate,
      })
    );
  };

  const applyFilter = (filter?: string, start?: string, end?: string) => {
    dispatch(
      getEmployeeAttendanceThunk({
        employeeId: selectedEmployee.employeeId,
        lastFetchedDate: undefined,
        filter,
        start,
        end,
      })
    );
  };
  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-secondary w-[350px] md:w-[720px] lg:w-[75vw] p-4 md:p-8 h- rounded-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3  hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>
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
          <div>
            <AttendanceStats summary={summary ?? undefined} loading={loading} />
          </div>
        ) : (
          <div className="">
            <AttendanceTable
              showTable={showTable}
              loading={loading}
              employeeAttendance={employeeAttendance}
              hasMore={hasMore}
              loadMore={loadMore}
              from
            />
          </div>
        )}

        {attendanceFilter && (
          <AttendanceFilterModal
            onClose={() => setAttendanceFilter(false)}
            onApply={applyFilter}
          />
        )}
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default EmployeeAttendaceModal;
