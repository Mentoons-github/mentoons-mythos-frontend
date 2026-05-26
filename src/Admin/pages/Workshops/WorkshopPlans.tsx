import { Eye, PenSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteWorkshopPlanThunk,
  editWorkshopPlanThunk,
  getWorkshopPlansThunk,
} from "../../../features/workshop/workshopThunk";
import { WorkshopPlan } from "../../../types/workshop/workshopPlan";
import ViewSingleWorkshopPlanModal from "../../components/modals/Workshop/ViewSingleWorkshopPlanModal";
import AddWorkshopPlan from "../../components/Workshop/AddWorkshopPlan";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../../features/workshop/workshopSlice";
import EditWorkshopPlanModal from "../../components/modals/Workshop/EditWorkshopPlanModal";

const WorkshopPlans = () => {
  const [showTable, setShowTable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkshopPlan | null>(null);
  const dispatch = useAppDispatch();
  const {
    plans,
    loading,
    deleteLoading,
    message,
    deleteSuccess,
    error,
    updateSuccess,
    updateLoading,
  } = useAppSelector((state) => state.workshop);

  useEffect(() => {
    dispatch(getWorkshopPlansThunk());
  }, []);

  useEffect(() => {
    if (deleteSuccess || updateSuccess) {
      toast.success(message);
      dispatch(resetWorkshopSlice());
      setSelectedId("");
      setUpdateModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetWorkshopSlice());
    }
  }, [deleteSuccess, dispatch, error, message, updateSuccess]);

  const handleView = (plan: WorkshopPlan) => {
    setSelectedPlan(plan);
    setViewModal(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (planId: string) => {
    setSelectedId(planId);
    setDeleteModal(true);
  };

  const handleEdit = (plan: WorkshopPlan) => {
    setSelectedId(plan._id as string);
    setUpdateModal(true);
    setSelectedPlan(plan);
  };

  const handleSubmitEdited = (
    updatedPlan: WorkshopPlan,
    validateForm: () => boolean,
  ) => {
    if (!selectedId) return;
    const isValid = validateForm();
    if (!isValid) return;
    dispatch(editWorkshopPlanThunk({ planId: selectedId, data: updatedPlan }));
  };

  return (
    <div className="pt-3 lg:p-4">
      <AddWorkshopPlan />
      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Quiz details...</span>
        </div>
      ) : plans.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Workshops</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no quizes yet.
          </p>
        </div>
      ) : (
        <div className="  h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Plan Title</th>
                  <th className="px-4 py-4 text-left">Duration</th>
                  <th className="px-4 py-4 text-left">Total sessions</th>
                  <th className="px-4 py-4 text-left">Price</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {plans?.map((plan, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{plan?.title}</td>
                    <td className="px-4 py-4 font-semibold">
                      {plan?.duration} Weeks
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {plan?.totalSessions} Sessions
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      ₹{Number(plan.price).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4 flex space-x-3">
                      <button
                        onClick={() => handleView(plan)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(plan)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <PenSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id as string)}
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteModal && (
        <DeleteModal
          item="Workshop Plan"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteWorkshopPlanThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {updateModal && (
        <EditWorkshopPlanModal
          onClose={() => setUpdateModal(false)}
          plan={selectedPlan}
          handleSubmit={handleSubmitEdited}
          loading={updateLoading}
        />
      )}

      {viewModal && selectedPlan && (
        <ViewSingleWorkshopPlanModal
          onClose={() => setViewModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default WorkshopPlans;
