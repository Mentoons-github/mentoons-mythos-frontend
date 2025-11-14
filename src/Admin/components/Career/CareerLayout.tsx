import { useState } from "react";
import CreateJobModal from "../modals/Career/CreateJobModal";

const CareerLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between ">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 flex py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
           + <span className="hidden md:block"> Create New Job</span>
        </button>
      </div>
      {modalOpen && <CreateJobModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default CareerLayout;
