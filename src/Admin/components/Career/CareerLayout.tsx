import { useState } from "react";
import CreateJobModal from "../modals/Career/CreateJobModal";

const CareerLayout = () => {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
        <button
      onClick={() => setModalOpen(true)}
      className="px-4 py-2 bg-[#E39712] hover:bg-[#c67d0e] rounded-lg font-semibold transition"
    >
      + Create New Job
    </button>
    {modalOpen && (
        <CreateJobModal onClose={()=>setModalOpen(false)}/>
    )}
    </div>
  );
};

export default CareerLayout;
