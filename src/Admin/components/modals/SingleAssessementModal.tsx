import { FetchAssessment } from "../../../types/redux/assessmentInterface";

interface ModalProps {
  questions: FetchAssessment | null;
  loading: boolean;
  onClose: () => void;
}

const SingleAssessementModal: React.FC<ModalProps> = ({
  questions,
  loading,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic">
      <div className="bg-gradient-to-t from-[#141414] to-[#2b2b2b] rounded-lg shadow-xl p-6 w-full max-w-3xl relative  ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-white border-b pb-2">
          Assessment Questions
        </h2>

        {loading ? (
          <p className="text-white italic">Loading questions...</p>
        ) : !questions ? (
          <p className="text-center text-white italic">
            No assessment questions in this group.
          </p>
        ) : (
          !loading &&
          questions && (
            <div className="space-y-6 overflow-y-auto hide-scrollbar max-h-[80vh]">
              {questions.questions.map((val, idx) => (
                <div
                  key={val._id}
                  className="p-4 border rounded-lg shadow-sm bg-gradient-to-t from-[#141414] to-[#2b2b2b]"
                >
                  <h3 className="font-semibold text-white mb-3">
                    {idx + 1}. {val.question}
                  </h3>

                  <ul className="space-y-2 text-white">
                    {val.options.map((opt, i) => (
                      <li
                        key={i}
                        className="p-2 rounded-md border hover:bg-[#9c9797] transition"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SingleAssessementModal;
