import { useState } from "react";
import CreateWorkshopModal from "../modals/Workshop/CreateWorkshopModal";

const AddWorkshop = () => {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
        <button
      onClick={() => setModalOpen(true)}
      className="px-4 py-2 bg-[#E39712] hover:bg-[#c67d0e] rounded-lg font-semibold transition"
    >
      + Create New Workshop
    </button>
    {modalOpen && (
        <CreateWorkshopModal onClose={()=>setModalOpen(false)}/>
    )}
    </div>
  );
};

export default AddWorkshop;
