import { useState } from "react";
import CreateWorkshopPlanModal from "../modals/Workshop/CreateWorkshopPlanModal";

const AddWorkshopPlan = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 flex py-2 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
      >
        + <span className="hidden md:block"> New Workshop plan</span>
      </button>
      {modalOpen && (
        <CreateWorkshopPlanModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default AddWorkshopPlan;
