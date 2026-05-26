import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import {
  deleteQuizThunk,
  editQuizThunk,
  getAllQuizesThunk,
  getSingleQuizThunk,
} from "../../../features/quiz/quizThunk";
import CreateQuizButton from "../../components/Quiz/CreateQuizButton";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetQuizSlice } from "../../../features/quiz/quizSlice";
import ViewSingleQuizModal from "../../components/modals/Quiz/ViewSingleQuizModal";
import { QuizTypes } from "../../../types/redux/mythosQuizType";
import EditQuizModal from "../../components/modals/Quiz/EditQuizModal";

const AdminQuiz = () => {
  const [showTable, setShowTable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const {
    allQuizes,
    loading,
    deleteSuccess,
    message,
    error,
    singleQuiz,
    deleteLoading,
    editLoading,
    editSuccess,
  } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deleteSuccess || editSuccess) {
      toast.success(message);
      dispatch(resetQuizSlice());
      setSelectedId("");
      setUpdateModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetQuizSlice());
    }
  }, [deleteSuccess, dispatch, editSuccess, error, message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getAllQuizesThunk());
  }, []);

  const handleSubmitEdited = (updatedData: QuizTypes) => {
    dispatch(editQuizThunk({ quizId: selectedId, updatedData }));
  };

  const handleView = (category: string) => {
    setViewModal(true);
    dispatch(getSingleQuizThunk(category));
  };

  const handleDelete = (quizId: string) => {
    setDeleteModal(true);
    setSelectedId(quizId);
  };

  const handleEdit = (quizId: string, category: string) => {
    console.log(quizId, "ddd", category);
    setUpdateModal(true);
    setSelectedId(quizId);
    dispatch(getSingleQuizThunk(category));
  };

  return (
    <div className="pt-3 lg:p-4">
      <CreateQuizButton />
      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Quiz details...</span>
        </div>
      ) : allQuizes.length == 0 ? (
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
                  <th className="px-4 py-4 text-left">Quiz Id</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left">Total No of questions</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {allQuizes?.map((quiz, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{quiz?._id}</td>
                    <td className="px-4 py-4 font-semibold">
                      {quiz?.category.charAt(0).toLocaleUpperCase() +
                        quiz.category.slice(1)}
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {quiz?.questions?.length}
                    </td>

                    <td className="px-4 py-4 flex space-x-3">
                      <button
                        onClick={() => handleView(quiz?.category)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() =>
                          handleEdit(quiz._id as string, quiz.category)
                        }
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <PenSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(quiz._id as string)}
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
          item="Quiz"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteQuizThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {updateModal && (
        <EditQuizModal
          onClose={() => setUpdateModal(false)}
          quiz={singleQuiz}
          handleSubmit={handleSubmitEdited}
          loading={editLoading}
        />
      )}

      {viewModal && (
        <ViewSingleQuizModal
          onClose={() => setViewModal(false)}
          quiz={singleQuiz}
        />
      )}
    </div>
  );
};

export default AdminQuiz;
