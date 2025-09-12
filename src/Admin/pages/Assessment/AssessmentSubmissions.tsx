import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import AdminAssessment from "../AdminAssessment";
import { fetchAllSubmissionThunk, fetchSingleSubmissionThunk } from "../../../features/assessment/assessmentThunk";
import SingleSubmissionModal from "../../components/modals/SingleSubmissionModal";

const AssessmentSubmissions = () => {
  const dispatch = useAppDispatch();
  const { allSubmissions, loading, singleSubmission, singleSubmissionLoading } = useAppSelector(
    (state) => state.assessment
  );
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = (submissionsId:string) => {
    setModalOpen(true)
    dispatch(fetchSingleSubmissionThunk(submissionsId))
  }

  useEffect(() => {
    dispatch(fetchAllSubmissionThunk());
  }, []);

  return (
    <div className="text-white">
      <AdminAssessment type="" />
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading user details...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Submission ID</th>
                <th className="px-4 py-4 text-left">Submitted Type</th>
                <th className="px-4 py-4 text-left">Submitted Name</th>
                <th className="px-4 py-4 text-left">User Name</th>
                <th className="px-4 py-4 text-left">User Id</th>
                <th className="px-4 py-4 text-left">View</th>
              </tr>
            </thead>
            <tbody className="">
              {allSubmissions.map((data, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{data._id}</td>
                  <td className="px-4 py-4">{data.assessmentType}</td>
                  <td className="px-4 py-4">{data.assessmentName}</td>
                  <td className="px-4 py-4 font-semibold">
                    {data.userId.firstName} {data.userId.lastName}
                  </td>
                  <td className="px-4 py-4">{data.userId._id}</td>
                  <td className="px-4 py-4">
                    <button
                        onClick={() => handleClick(data._id as string)}
                      className="px-3 py-1 bg-[#E39712] text-white rounded-md hover:bg-[#c68310]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {modalOpen && (
          <UserDetailModal
            singleUser={singleUser}
            onClose={handleModal}
            singleUserLoading={singleUserLoading}
          />
        )}
        {blogModal && (
          <UserBlogModal
            onClose={handleModal}
            userBlogs={singleUser?.blogs ?? []}
            singleUserLoading={singleUserLoading}
          />
        )} */}
        </div>
      )}

      {modalOpen&& <SingleSubmissionModal onClose = {()=>setModalOpen(false)} details = {singleSubmission} singleSubmissionLoading ={singleSubmissionLoading}/>}
    </div>
  );
};

export default AssessmentSubmissions;
