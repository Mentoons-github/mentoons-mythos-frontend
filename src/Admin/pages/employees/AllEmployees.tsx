import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Edit, Eye } from "lucide-react";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import {
  getEmployeeThunk,
  getSingleEmployeeThunk,
} from "../../../features/admin/adminThunk";
import MultiSelectFilter from "../../components/Employee/EmployeeFilter";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { formatToRealDate } from "../../../utils/DateFormate";
import EmployeeViewModal from "../../components/modals/Employee/EmployeeViewModal";
import EditEmployeeModal from "../../components/modals/Employee/EditEmployeeModal";
import AddEmployeeModal from "../../components/modals/Employee/AddEmployeeModal";
import EmployeeButton from "../../components/Employee/AddEmployee";
import { FilterOptions } from "../../../constants/admin/filterOptions";

const AllEmployees = () => {
  const dispatch = useAppDispatch();
  const {
    allLoading,
    employeePage,
    employeeTotalPage,
    employees,
    // message,
    // success,
    // error,
    singleEmployee,
    singleLoading,
  } = useAppSelector((state) => state.admin);

  const [viewModal, setViewModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  // const [selectedId, setSelectedId] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    designation: [] as string[],
    jobType: [] as string[],
    department: [] as string[],
    status: [] as string[],
  });

  // Filter options - customize these based on your data

  const limit = 10;

  useEffect(() => {
    dispatch(
      getEmployeeThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
        filters,
      })
    );
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, filters, search, sortOrder]);

  const handleView = (employeeId: string) => {
    dispatch(getSingleEmployeeThunk(employeeId));
    setViewModal(true);
  };

  console.log(singleEmployee, "singleee");

  const handleEdit = (employeeId: string) => {
    setEditModal(true);
    dispatch(getSingleEmployeeThunk(employeeId));
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    values: string[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      designation: [],
      jobType: [],
      department: [],
      status: [],
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(filters).some((f) => f.length > 0);

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="lg:flex mb-4 h-11 items-center space-x-1 md:space-x-4 justify-between space-y-3">
        <div className="flex h-full gap-10 lg:gap-3">
          <div
            className={` md:w-40 h-full px-2 md:px-4 flex items-center justify-between 
                                     border  rounded-lg cursor-pointer 
                                     shadow-md hover:bg-muted transition-all duration-200`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center md:space-x-2">
              <IoFilter size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-medium hidden md:block">
                Filter
              </h3>
            </div>
            <div className="ml-2 flex">
              {showFilters ? (
                <IoIosArrowUp size={20} className="" />
              ) : (
                <IoIosArrowDown size={20} className="" />
              )}
              {hasActiveFilters && (
                <span className="bg-primary text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {Object.values(filters).reduce((acc, f) => acc + f.length, 0)}
                </span>
              )}
            </div>
          </div>
          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
        </div>

        <div className="flex gap-3 justify-between">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <EmployeeButton
            text="Add Employee"
            onClick={() => setAddEmployeeModal(true)}
          />
        </div>
      </div>

      {showSort && (
        <div className="mt-17 md:mt-0">
          <ShowSort
            sortOrder={sortOrder}
            onClick={(sort) => {
              setSortOrder(sort as "newest" | "oldest");
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {showFilters && (
        <div className="mb-4 p-4 mt-15 md:mt-0 rounded-lg border ">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold ">Filter Employees</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-800 hover:text-blue-700 underline"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <MultiSelectFilter
              label="Designation"
              options={FilterOptions.designation}
              selectedValues={filters.designation}
              onChange={(values) => handleFilterChange("designation", values)}
            />
            <MultiSelectFilter
              label="Job Type"
              options={FilterOptions.jobType}
              selectedValues={filters.jobType}
              onChange={(values) => handleFilterChange("jobType", values)}
            />
            <MultiSelectFilter
              label="Department"
              options={FilterOptions.department}
              selectedValues={filters.department}
              onChange={(values) => handleFilterChange("department", values)}
            />
            <MultiSelectFilter
              label="Status"
              options={FilterOptions.status}
              selectedValues={filters.status}
              onChange={(values) => handleFilterChange("status", values)}
            />
          </div>
        </div>
      )}

      {!showTable || allLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Employee details...</span>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Employees available</h2>
          <p className="text-muted-foreground mt-2">
            {hasActiveFilters
              ? "No employees match your current filters. Try adjusting your filters."
              : "It looks like there are no employees yet."}
          </p>
        </div>
      ) : (
        <div
          className={`h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu ${
            showFilters || showSort ? "mt-5" : "mt-17 lg:mt-5"
          }`}
        >
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Employee Id</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Designation</th>
                  <th className="px-4 py-4 text-left">Job Type</th>
                  <th className="px-4 py-4 text-left">Joined Date</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((enp, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{enp?.employeeID}</td>
                    <td className="px-4 py-4">{enp?.name}</td>
                    <td className="px-4 py-4">{enp?.email}</td>
                    <td className="px-4 py-4">{enp?.designation}</td>
                    <td className="px-4 py-4">{enp?.jobType}</td>
                    <td className="px-4 py-4">
                      {formatToRealDate(enp?.createdAt)}
                    </td>
                    <td className="px-4 py-4 space-x-3">
                      <button
                        onClick={() => handleView(enp?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(enp._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Edit size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {employeePage} of {employeeTotalPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < employeeTotalPage ? p + 1 : p))
                }
                disabled={currentPage === employeeTotalPage}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {addEmployeeModal && (
        <AddEmployeeModal onClose={() => setAddEmployeeModal(false)} />
      )}

      {viewModal && (
        <EmployeeViewModal
          onClose={() => setViewModal(false)}
          loading={singleLoading}
          employee={singleEmployee ?? undefined}
        />
      )}

      {editModal && (
        <EditEmployeeModal
          loading={singleLoading}
          employee={singleEmployee}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default AllEmployees;
