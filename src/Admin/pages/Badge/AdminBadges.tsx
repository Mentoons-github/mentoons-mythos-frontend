import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteBadgeThunk,
  getAllBadgesThunk,
} from "../../../features/badge/badgeThunk";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { Badge } from "../../../types/redux/blogInterface";
import ViewBadgeModal from "../../components/modals/Badge/ViewBadgeModal";
import CreateBadgeButton from "../../components/Badge/CreateBadgeButton";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import {
  resetAnimation,
  resetBadgeSlice,
} from "../../../features/badge/badgeSlice";
import EditBadgeModal from "../../components/modals/Badge/EditBadgeModal";

const AdminBadges = () => {
  const dispatch = useAppDispatch();
  const { allBadges, loading, deleteSuccess, deleteLoading, message, error } =
    useAppSelector((state) => state.badge);
  const [showTable, setShowTable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetBadgeSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBadgeSlice());
    }
  }, [deleteSuccess, dispatch, error, message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getAllBadgesThunk());
  }, []);

  const handleDelete = (badgeId: string) => {
    setDeleteModal(true);
    setSelectedId(badgeId);
  };

  const clickEdit = (badge: Badge) => {
    setEditModal(true);
    setSelectedBadge(badge);
  };

  const handleView = (badge: Badge) => {
    setViewModal(true);
    setSelectedBadge(badge);
  };
  return (
    <div className="pt-3 lg:p-4">
      <CreateBadgeButton />
      {/* <CreateQuizButton /> */}
      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Badge details...</span>
        </div>
      ) : allBadges.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Workshops</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no badges yet.
          </p>
        </div>
      ) : (
        <div className="  h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Image</th>
                  <th className="px-4 py-4 text-left">Description</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {allBadges?.map((badge, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4 font-semibold">{badge?.name}</td>
                    <td className="px-4 py-4 ">
                      <img className="h-24 w-24" src={badge?.image} alt="" />
                    </td>
                    <td className="px-4 py-4">{badge?.description}</td>

                    <td className="px-4 py-4 align-middle">
                      <div className="flex  gap-3 h-full">
                        <button
                          className="font-semibold text-blue-800 hover:text-blue-600"
                          onClick={() => handleView(badge)}
                        >
                          <Eye size={20} />
                        </button>

                        <button
                          className="font-semibold text-blue-800 hover:text-blue-600"
                          onClick={() => clickEdit(badge)}
                        >
                          <PenSquare size={20} />
                        </button>

                        <button
                          className="font-semibold text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(badge._id as string)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
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
          item="Quiz"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteBadgeThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {editModal && (
        <EditBadgeModal
          onClose={() => setEditModal(false)}
          badge={selectedBadge}
        />
      )}

      {selectedBadge && viewModal && (
        <ViewBadgeModal
          badge={selectedBadge}
          onClose={() => {
            setSelectedBadge(null);
            setViewModal(false);
            dispatch(resetAnimation());
          }}
          open={selectedBadge !== null}
        />
      )}
    </div>
  );
};

export default AdminBadges;
