import { useState } from "react";
import CreateAssessmentModal from "../components/modals/CreateAssessmentModal";

const AdminAssessment = ({ type }: { type?: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const formattedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "";

  return (
    <div className="text-white p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{formattedType} Assessments</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#E39712] hover:bg-[#c67d0e] rounded-lg font-semibold transition"
        >
          + Create Assessment
        </button>
      </div>

      {modalOpen && (
        <CreateAssessmentModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default AdminAssessment;
