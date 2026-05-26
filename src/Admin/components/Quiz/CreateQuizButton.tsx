import { useState } from "react";
import CreateQuizModal from "../modals/Quiz/CreateQuizModal";

const CreateQuizButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 flex py-2 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
      >
        + <span className="hidden md:block"> Create New Quiz</span>
      </button>
      {modalOpen && <CreateQuizModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default CreateQuizButton;
