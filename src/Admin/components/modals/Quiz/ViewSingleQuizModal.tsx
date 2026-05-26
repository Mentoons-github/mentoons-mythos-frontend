import { QuizTypes } from "../../../../types/redux/mythosQuizType";
import { MdQuiz } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ViewSingleQuizModal = ({
  onClose,
  quiz,
}: {
  onClose: () => void;
  quiz: QuizTypes | null;
}) => {
  if (!quiz) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-3"
      onClick={onClose}
    >
      <div
        className="bg-secondary rounded-2xl shadow-2xl w-full max-w-5xl relative overflow-y-auto max-h-[90vh] hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-secondary border-b p-5 z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-xl hover:scale-110 transition"
          >
            ✕
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-xl">
              <MdQuiz size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {quiz.category.charAt(0).toUpperCase() + quiz.category.slice(1)}{" "}
                Quiz
              </h2>

              <p className="text-sm text-muted-foreground">
                Total Questions: {quiz.questions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          {quiz.questions.map((q, questionIndex) => (
            <div
              key={questionIndex}
              className="border rounded-2xl p-5 bg-background/40"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">
                  Question {questionIndex + 1}
                </h3>
              </div>

              {/* Question */}
              <div className="border rounded-xl p-4 mb-5">
                <p className="text-base md:text-lg font-medium">{q.question}</p>
              </div>

              {/* Options */}
              <div className="grid md:grid-cols-2 gap-4">
                {q.options.map((option, optionIndex) => {
                  return (
                    <div
                      key={optionIndex}
                      className={`border rounded-xl p-4 flex items-center gap-3 transition border-border`}
                    >
                      {/* Option Number */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                         bg-muted
                        `}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </div>

                      <div className="flex-1">
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Correct Answer */}
              <div className="mt-5 border-t pt-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Correct Answer
                </p>

                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-lg font-medium">
                  <FaCheckCircle />
                  {q.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSingleQuizModal;
