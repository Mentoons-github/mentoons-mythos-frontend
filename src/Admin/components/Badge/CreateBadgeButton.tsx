import { useState } from "react";
import CreateBadgeModal from "../modals/Badge/CreateBadgeModal";

const CreateBadgeButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 flex py-2 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
      >
        + <span className="hidden md:block"> Create New Badge</span>
      </button>
      {modalOpen && <CreateBadgeModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default CreateBadgeButton;
