import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { QuizTypes } from "../../../../types/redux/mythosQuizType";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createNewQuizThunk } from "../../../../features/quiz/quizThunk";
import { toast } from "sonner";
import { resetQuizSlice } from "../../../../features/quiz/quizSlice";

const CreateQuizModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { loading, createSuccess, error, message } = useAppSelector(
    (state) => state.quiz,
  );
  const [quizData, setQuizData] = useState<QuizTypes>({
    category: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  useEffect(() => {
    if (createSuccess) {
      toast.success(message);
      dispatch(resetQuizSlice());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetQuizSlice());
    }
  }, [dispatch, error, message, onClose, createSuccess]);

  // Add Question
  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    }));
  };

  // Remove Question
  const removeQuestion = (index: number) => {
    const updated = [...quizData.questions];
    updated.splice(index, 1);

    setQuizData({
      ...quizData,
      questions: updated,
    });
  };

  // Update Question
  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...quizData.questions];

    if (field === "question") {
      updated[index].question = value;
    }

    setQuizData({
      ...quizData,
      questions: updated,
    });
  };

  // Update Option
  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updated = [...quizData.questions];

    updated[questionIndex].options[optionIndex] = value;

    setQuizData({
      ...quizData,
      questions: updated,
    });
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewQuizThunk(quizData));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3">
      <div className="bg-secondary rounded-xl shadow-xl p-6 w-full max-w-4xl relative overflow-y-auto max-h-[90vh] hide-scrollbar">
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 text-lg">
          ✕
        </button>

        <h2 className="text-2xl font-semibold border-b pb-3 mb-5">
          Create New Quiz
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Quiz Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              required
              placeholder="Category"
              value={quizData.category}
              onChange={(e) =>
                setQuizData({ ...quizData, category: e.target.value })
              }
              className="border p-3 rounded-lg bg-transparent"
            />
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {quizData.questions.map((q, questionIndex) => (
              <div
                key={questionIndex}
                className="border rounded-xl p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    Question {questionIndex + 1}
                  </h3>

                  {quizData.questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-500"
                    >
                      <MdDelete size={22} />
                    </button>
                  )}
                </div>

                {/* Question */}
                <input
                  type="text"
                  placeholder="Enter question"
                  required
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      "question",
                      e.target.value,
                    )
                  }
                  className="w-full border p-3 rounded-lg bg-transparent"
                />

                {/* Options */}
                <div className="grid md:grid-cols-2 gap-3">
                  {q.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      required
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          questionIndex,
                          optionIndex,
                          e.target.value,
                        )
                      }
                      className="border p-3 rounded-lg bg-transparent"
                    />
                  ))}
                </div>

                {/* Correct Answer */}
                <select
                  value={q.answer}
                  required
                  onChange={(e) => {
                    const updated = [...quizData.questions];
                    updated[questionIndex].answer = e.target.value;

                    setQuizData({
                      ...quizData,
                      questions: updated,
                    });
                  }}
                  className="w-full border p-3 rounded-lg bg-transparent"
                >
                  <option value="">Select Correct Answer</option>

                  {q.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option || `Option ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={addQuestion}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
            >
              + Add Question
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Creating Quiz" : "Create Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizModal;
