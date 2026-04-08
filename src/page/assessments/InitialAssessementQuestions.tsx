import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { useNavigate } from "react-router-dom";
import {
  fetchInitialQuestionsThunk,
  initialAssessmentSubmitThunk,
} from "../../features/assessment/assessmentThunk";
import { LuNotebookPen } from "react-icons/lu";
import { InitialAssessmentSubmission } from "../../types/redux/assessmentInterface";
import { toast } from "sonner";
import { resetAssessmentSlice } from "../../features/assessment/assessmentSlice";
import { useLocation, useNavigate } from "react-router-dom";
import RewardModal from "../../components/modal/RewardModal";
import { fetchUserData } from "../../features/user/userThunk";

const InitialAssessmentQuestions = () => {
  const dispatch = useAppDispatch();

  const { initialQuestions, loading, success, message, error, rewardPoints } =
    useAppSelector((state) => state.assessment);
  const { user } = useAppSelector((state) => state.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [modalPoints, setModalPoints] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  useEffect(() => {
    if (success) {
      toast.success(message);
      setModalPoints(rewardPoints);
      setRewardModalOpen(true);
      navigate("/assessment/psychology");
      setIsFinished(true);
      dispatch(resetAssessmentSlice());
      dispatch(fetchUserData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAssessmentSlice());
    }
  }, [dispatch, error, message, navigate, rewardPoints, success]);

  useEffect(() => {
    dispatch(fetchInitialQuestionsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (initialQuestions?.length) {
      setSelectedAnswers(new Array(initialQuestions.length).fill(""));
    }
  }, [initialQuestions]);

  const handleOptionSelect = (option: string) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = option;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < initialQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const submissions = initialQuestions.map((q, index) => {
      const selectedOption = selectedAnswers[index];
      const optionNo = q.options.findIndex((opt) => opt === selectedOption) + 1;

      return {
        assessmentName: q.name,
        question: q.question,
        answer: selectedOption,
        options: q.options,
        optionNo,
      };
    });

    const payload: InitialAssessmentSubmission = {
      assessmentType: initialQuestions[0]?.type,
      submissions,
    };

    console.log("Submitting answers:", submissions);

    dispatch(
      initialAssessmentSubmitThunk({
        details: payload,
        userId: user?._id as string,
      }),
    );
  };

  useEffect(() => {
    if (user?.takeInitialAssessment && !isFinished && from !== "workshops") {
      navigate("/");
    }
  }, [user, from, navigate, isFinished]);

  if (loading || !initialQuestions?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = initialQuestions[currentIndex];

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 ">
      <div className="border border-foreground shadow-lg rounded-xl p-6 w-full max-w-2xl font-serif">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <LuNotebookPen />
            <h1 className="font-bold text-sm">Initial Assessment</h1>
          </div>
          <h2 className="text-sm">
            {currentIndex + 1} of {initialQuestions.length}
          </h2>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            {currentQuestion?.question}
          </h3>

          <div className="flex flex-col space-y-3">
            {currentQuestion?.options?.map((option: string, idx: number) => (
              <label
                key={idx}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedAnswers[currentIndex] === option
                    ? "bg-yellow-100 border-yellow-600 text-black"
                    : "hover:bg-yellow-50 hover:text-black"
                }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswers[currentIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-yellow-600 hover:opacity-90 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() =>
              currentIndex < initialQuestions.length - 1
                ? handleNext()
                : handleFinish()
            }
            disabled={!selectedAnswers[currentIndex]}
            className="bg-yellow-600 hover:opacity-90 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {currentIndex === initialQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {rewardModalOpen && (
        <RewardModal
          points={modalPoints}
          onClose={() => {
            setRewardModalOpen(false);
            dispatch(resetAssessmentSlice());
          }}
        />
      )}
    </div>
  );
};

export default InitialAssessmentQuestions;
