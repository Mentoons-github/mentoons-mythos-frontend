import { useState } from "react";
import CreateAssessmentModal from "../components/modals/CreateAssessmentModal";

const AdminAssessment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const formattedType = type
  //   ? type.charAt(0).toUpperCase() + type.slice(1)
  //   : "";

  return (
    <div className="">
      <div className="flex items-center justify-between ">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 flex bg-blue-800 text-white hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          + <span className="hidden md:block"> Create Assessment</span>
        </button>
      </div>

      {modalOpen && (
        <CreateAssessmentModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default AdminAssessment;
