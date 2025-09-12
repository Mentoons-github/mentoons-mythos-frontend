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
import { Eye, Search, Trash2 } from "lucide-react";
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
import { BiSort } from "react-icons/bi";

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
  }, [currentPage, dispatch, search, selectedGenders, selectedJobTitles, selectedLocations, selectedStatus, sortOrder]);

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
    <div className="p-4 text-white hide-scrollbar h-full will-change-scroll transform-gpu">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Applications</h1>
        <CareerLayout />
      </div>

      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <div className="flex h-full gap-3">
          <div
            className="w-40 h-full px-4 flex items-center justify-between 
             border text-white rounded-lg cursor-pointer 
             shadow-md hover:bg-black/80 transition-all duration-200"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <IoFilter size={22} className="text-[#E39712]" />
              <h3 className="text-[16px] font-medium">Filter</h3>
            </div>

            <div className="ml-2">
              {showFilters ? (
                <IoIosArrowUp size={20} className="text-gray-300" />
              ) : (
                <IoIosArrowDown size={20} className="text-gray-300" />
              )}
            </div>
          </div>

          <div
            className="w-40 h-full px-4 flex items-center justify-center 
             border text-white rounded-lg cursor-pointer 
             shadow-md hover:bg-black/80 transition-all duration-200 space-x-2"
            onClick={() => {
              if (selectClick) {
                setSelectedRows([]);
              }
              setSelectClick((prev) => !prev);
            }}
          >
            <GrCheckboxSelected size={22} className="text-[#E39712]" />
            <h3 className="text-[16px] font-medium">
              {selectClick ? "Stop Select" : "Select"}
            </h3>
          </div>

          <div
            className="w-40 h-full px-4 flex items-center justify-between 
                                     border text-white rounded-lg cursor-pointer 
                                     shadow-md hover:bg-black/80 transition-all duration-200"
            onClick={() => setShowSort((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <BiSort size={22} className="text-[#E39712]" />
              <h3 className="text-[16px] font-medium">Sort By</h3>
            </div>
            <div className="ml-2">
              {showSort ? (
                <IoIosArrowUp size={20} className="text-gray-300" />
              ) : (
                <IoIosArrowDown size={20} className="text-gray-300" />
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="absolute top-3.5 left-2 text-gray-400 "
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search application..."
            className="w-64 px-4 py-2 rounded-lg border border-gray-600 pl-7 
                           bg-black/40 text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-[#E39712]"
          />
        </div>
      </div>

      {selectClick && (
        <div className="flex space-x-7 items-center">
          {/* 🔹 Select All Checkbox */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={
                selectedRows.length === applications.length &&
                applications.length > 0
              }
              onChange={toggleSelectAll}
              className="w-5 h-5 text-[#E39712] cursor-pointer"
            />
            <span className="text-sm">Select All</span>
          </label>

          {/* 🔹 Action Buttons */}
          <div className="flex gap-4">
            {selectActions.map((ele, ind) => (
              <div
                key={ind}
                onClick={() => handleActionClick(ele)}
                className={`py-2 px-4 flex items-center justify-center 
            border rounded-lg shadow-md transition-all duration-200 
            ${
              selectedRows.length === 0
                ? "border-gray-500 text-gray-500 cursor-not-allowed opacity-50"
                : "border-[#E39712] text-[#E39712] cursor-pointer hover:bg-black/80"
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
            className="mb-2 text-blue-600 text-sm cursor-pointer hover:text-blue-500"
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
        <div className="flex gap-3 mb-2">
          {["newest", "oldest"].map((sort) => (
            <button
              key={sort}
              onClick={() => {
                setSortOrder(sort as "newest" | "oldest");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                sortOrder === sort
                  ? "bg-[#E39712] text-white border-[#E39712]"
                  : "bg-black/40 text-gray-300 border-gray-600 hover:bg-black/70"
              }`}
            >
              {sort === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
            </button>
          ))}
        </div>
      )}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading Job details...</span>
        </div>
      ) : applications.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold text-white">No Application</h2>
          <p className="text-gray-400 mt-2">
            It looks like there are no applications yet.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                {selectClick && <th className="px-4 py-4 text-left">Select</th>}
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Mobile No</th>
                <th className="px-4 py-4 text-left">Gender</th>
                <th className="px-4 py-4 text-left">Location</th>
                <th className="px-4 py-4 text-left">Job Title</th>
                <th className="px-4 py-4 text-left">Resume</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((app, index) => (
                <tr
                  key={app._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-black/60" : ""
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
                  <td className="px-4 py-4 font-semibold">{app?.position}</td>
                  <td className="px-4 py-4 font-semibold">
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
                  </td>
                  <td className="px-4 py-4 space-x-3">
                    <button
                      className="text-white rounded-md hover:text-[#c68310]"
                      onClick={() => handleView(app?._id as string)}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="text-white rounded-md hover:text-[#d32a08]"
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
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
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
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
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
