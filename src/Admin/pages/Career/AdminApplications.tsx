import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteJobApplicationThunk,
  deleteSelectedJobApplicationsThunk,
  getAllApplicationsThunk,
  getSingleJobApplicationThunk,
  updateApplicationStatusThunk,
} from "../../../features/career/careerThunk";
import CareerLayout from "../../components/Career/CareerLayout";
import { exportToExcel } from "../../../utils/exportToExcel";
import { Eye, Trash2, XSquare } from "lucide-react";
import FilterApplication from "../../components/Career/FilterApplication";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { City } from "country-state-city";
import { GrCheckboxSelected } from "react-icons/gr";
import { Career } from "../../../types/redux/careerInterface";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetCareerSlice } from "../../../features/career/careerSlice";
import ViewApplicationModal from "../../components/modals/Career/ViewApplicationModal";
import SendAssignementModal from "../../components/modals/Career/SendAssignementModal";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";

// Example static options
const genders = ["Male", "Female", "Other", "Prefer not to say"];
const jobTitles = [
  "Filmmaker",
  "Actor",
  "Storyteller",
  "MERN Developer",
  "Video Editor",
  "Astrologers",
  "Psychologist",
  "AI Content Creator",
  "Graphic Designer",
  "Digital Marketing Executive",
  "Business Development Executive",
  "Sales Consultant",
  "Product Development Specialist",
  "Anchor",
  "Social Media Manager",
  "Film Production Executive",
  "Social Media Executive",
];
const status = ["Shortlisted", "Rejected", "Pending"];
const locations = (City.getCitiesOfCountry("IN") || []).map(
  (city) => city.name
);

const selectActions = [
  "Send assignement",
  "Export to Excel",
  "Shortlist",
  "Send message",
  "Not interested",
  "Delete",
];

const AdminApplications = () => {
  const dispatch = useAppDispatch();
  const {
    applications,
    deleteLoading,
    deleteSuccess,
    message,
    error,
    totalPages,
    page,
    loading,
    singleApplication,
    statusSuccess,
  } = useAppSelector((state) => state.career);

  useEffect(() => {
    if (deleteSuccess || statusSuccess) {
      toast.success(message);
      dispatch(resetCareerSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetCareerSlice());
    }
  }, [deleteSuccess, dispatch, error, message, statusSuccess]);

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [assignementModal, setAssignementModal] = useState(false);
  const [selectClick, setSelectClick] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Career[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");

  const limit = 10;

  // Filters
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  useEffect(() => {
    dispatch(
      getAllApplicationsThunk({
        page: currentPage,
        limit,
        genders: selectedGenders,
        jobTitles: selectedJobTitles,
        locations: selectedLocations,
        status: selectedStatus,
        sort: sortOrder,
        search,
      })
    );

    const timer = setTimeout(() => setShowTable(true), 1000);
    return () => clearTimeout(timer);
  }, [
    currentPage,
    dispatch,
    search,
    selectedGenders,
    selectedJobTitles,
    selectedLocations,
    selectedStatus,
    sortOrder,
  ]);

  const toggleRow = (app: Career) => {
    setSelectedRows((prev) => {
      const exists = prev.find((row) => row._id === app._id);
      if (exists) {
        return prev.filter((row) => row._id !== app._id);
      } else {
        return [...prev, app];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === applications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(applications);
    }
  };

  const handleActionClick = (action: string) => {
    if (selectedRows.length === 0) return;

    switch (action) {
      case "Send assignement":
        setAssignementModal(true);
        break;
      case "Export to Excel":
        exportToExcel(selectedRows);
        break;
      case "Shortlist":
        dispatch(
          updateApplicationStatusThunk({
            status: "Shortlisted",
            applicationIds: selectedRows.map((e) => e?._id as string),
          })
        );
        setSelectClick(false);
        setSelectedRows([]);
        break;
      case "Send message":
        console.log("Sending message to:", selectedRows);
        break;
      case "Not interested":
        dispatch(
          updateApplicationStatusThunk({
            status: "Rejected",
            applicationIds: selectedRows.map((e) => e?._id as string),
          })
        );
        setSelectClick(false);
        setSelectedRows([]);
        break;
      case "Delete":
        setDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = (applicationId: string) => {
    setSelectedId(applicationId);
    setDeleteModal(true);
  };

  const handleView = (applicationId: string) => {
    setViewModal(true);
    dispatch(getSingleJobApplicationThunk(applicationId));
  };

  return (
    <div className="pt-3 lg:p-4">
      <div className="lg:flex space-y-3 mb-4 h-11 items-center space-x-4 justify-between ">
        <div className="flex h-full gap-3 justify-between">
          <div
            className="md:w-40 h-full px-4 flex items-center justify-between 
             border  rounded-lg cursor-pointer 
             shadow-md hover:bg-muted transition-all duration-200"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <IoFilter size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-medium hidden md:block">
                Filter
              </h3>
            </div>

            <div className="ml-2">
              {showFilters ? (
                <IoIosArrowUp size={20} className="" />
              ) : (
                <IoIosArrowDown size={20} className="" />
              )}
            </div>
          </div>

          <div
            className="md:w-40 h-full px-4 flex items-center justify-center 
             border rounded-lg cursor-pointer 
             shadow-md hover:bg-muted transition-all duration-200 space-x-2"
            onClick={() => {
              if (selectClick) {
                setSelectedRows([]);
              }
              setSelectClick((prev) => !prev);
            }}
          >
            <h3 className="text-[16px] font-medium ">
              {selectClick ? (
                <div className="flex space-x-2">
                  <XSquare size={22} className="text-blue-800" />
                  <span className="hidden md:block">Stop Select</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <GrCheckboxSelected size={22} className="text-blue-800" />{" "}
                  <span className="hidden md:block">Select</span>
                </div>
              )}
            </h3>
          </div>

          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
        </div>

        <div className="flex gap-2 justify-between">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <CareerLayout />
        </div>
      </div>

      {selectClick && (
        <div className="flex space-x-7 items-center mt-15 md:mt-0">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={
                selectedRows.length === applications.length &&
                applications.length > 0
              }
              onChange={toggleSelectAll}
              className="w-5 h-5 text-blue-800 cursor-pointer"
            />
            <span className="text-sm">Select All</span>
          </label>

          <div className="flex flex-wrap gap-4">
            {selectActions.map((ele, ind) => (
              <div
                key={ind}
                onClick={() => handleActionClick(ele)}
                className={`py-2 px-4 flex items-center justify-center 
            border rounded-lg shadow-md transition-all duration-200 
            ${
              selectedRows.length === 0
                ? "border-2 text-muted-foreground cursor-not-allowed opacity-50"
                : "border-blue-800  text-blue-800 cursor-pointer hover:bg-blue-800 hover:text-white"
            }`}
              >
                <h4>{ele}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFilters && (
        <div>
          <p
            className="mb-2 text-blue-600 text-sm cursor-pointer hover:text-blue-500 mt-17 lg:mt-0"
            onClick={() => (
              setSelectedLocations([]),
              setSelectedJobTitles([]),
              setSelectedGenders([]),
              setSelectedStatus([])
            )}
          >
            Clear filter
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 ">
            <FilterApplication
              title="Gender"
              options={genders}
              selected={selectedGenders}
              onChange={setSelectedGenders}
            />
            <FilterApplication
              title="Job Titles"
              options={jobTitles}
              selected={selectedJobTitles}
              onChange={setSelectedJobTitles}
            />
            <FilterApplication
              title="Location"
              options={locations}
              selected={selectedLocations}
              onChange={setSelectedLocations}
            />
            <FilterApplication
              title="Status"
              options={status}
              selected={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>
      )}

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

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Job details...</span>
        </div>
      ) : applications.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Application</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no applications yet.
          </p>
        </div>
      ) : (
        <div
          className={`h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu ${
            selectClick || showFilters || showSort ? "mt-5" : "mt-17 lg:mt-5"
          }`}
        >
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  {selectClick && (
                    <th className="px-4 py-4 text-left">Select</th>
                  )}
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Mobile No</th>
                  <th className="px-4 py-4 text-left">Gender</th>
                  <th className="px-4 py-4 text-left">Location</th>
                  <th className="px-4 py-4 text-left">Job Title</th>
                  {/* <th className="px-4 py-4 text-left">Resume</th> */}
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((app, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    {selectClick && (
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={
                            !!selectedRows.find((row) => row._id === app._id)
                          }
                          onChange={() => toggleRow(app)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                    )}
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{app?.name}</td>
                    <td className="px-4 py-4">{app?.email}</td>
                    <td className="px-4 py-4">{app?.mobileNumber}</td>
                    <td className="px-4 py-4">{app?.gender}</td>
                    <td className="px-4 py-4">{app?.cLocation}</td>
                    <td className="px-4 py-4 ">{app?.position}</td>
                    {/* <td className="px-4 py-4 font-semibold">
                    {app?.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td> */}
                    <td className="px-4 py-4 space-x-3">
                      <button
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                        onClick={() => handleView(app?._id as string)}
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                        onClick={() => handleDelete(app?._id as string)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < totalPages ? p + 1 : p))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <DeleteModal
          item="Job Application"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            if (selectedRows.length > 0) {
              dispatch(
                deleteSelectedJobApplicationsThunk({
                  applicationIds: selectedRows.map((r) => r._id as string),
                })
              );

              setSelectedRows([]);
            } else if (selectedId) {
              dispatch(deleteJobApplicationThunk(selectedId));
            }
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {viewModal && (
        <ViewApplicationModal
          loading={loading}
          onClose={() => setViewModal(false)}
          application={singleApplication}
        />
      )}

      {assignementModal && (
        <SendAssignementModal
          appDetails={selectedRows.map((e) => e)}
          jobTitle={selectedRows[0]?.position || ""}
          onClose={() => setAssignementModal(false)}
          onSelectClose={() => setSelectClick(false)}
          onFilterClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default AdminApplications;
