import { MdDelete } from "react-icons/md";
import { QuizTypes } from "../../../../types/redux/mythosQuizType";
import { useEffect, useState } from "react";

const EditQuizModal = ({
  onClose,
  quiz,
  handleSubmit,
  loading,
}: {
  onClose: () => void;
  quiz: QuizTypes | null;
  handleSubmit: (quizData: QuizTypes) => void;
  loading: boolean;
}) => {
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
    if (quiz) {
      setQuizData({
        category: quiz.category,
        questions: quiz.questions.map((q) => ({
          ...q,
          options: [...q.options],
        })),
      });
    }
  }, [quiz]);

  const isChanged =
    JSON.stringify({
      category: quiz?.category,
      questions: quiz?.questions,
    }) !==
    JSON.stringify({
      category: quizData.category,
      questions: quizData.questions,
    });

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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3"
      onClick={onClose}
    >
      <div
        className="bg-secondary rounded-xl shadow-xl p-6 pt-0 w-full max-w-4xl relative overflow-y-auto max-h-[90vh] hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-secondary border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create New Quiz</h2>

          <button onClick={onClose} className="text-lg">
            ✕
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(quizData);
          }}
        >
          {/* Quiz Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-6 mt-4">
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

          <div className="sticky bottom-0 bg-secondary pt-4 mt-6 flex items-center justify-between border-t">
            <button
              onClick={addQuestion}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
            >
              + Add Question
            </button>

            <button
              type="submit"
              disabled={!isChanged || loading}
              className={`px-5 py-2 rounded-lg text-white ${
                !isChanged || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500"
              }`}
            >
              {loading ? "Updating..." : "Update Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizModal;
