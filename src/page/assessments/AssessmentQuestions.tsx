import { useParams } from "react-router-dom";
import { QUESTIONS } from "../../constants/assessment";
import { useEffect, useState } from "react";
import { LuNotebookPen } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { assessmentSubmitTunk } from "../../features/assessment/assessmentThunk";
import { toast } from "sonner";
import { resetAssessmentSlice } from "../../features/assessment/assessmentSlice";

const AssessmentQuestions = () => {
  const dispatch = useAppDispatch();
  const { message, error, success } = useAppSelector((state) => state.assessment);
  const { name, type } = useParams<{ name?: string; type?: string }>();
  const questions = QUESTIONS[name as keyof typeof QUESTIONS];
  const initialIndex = sessionStorage.getItem(`${name}_currentIndex`);
  const storedAnswers = sessionStorage.getItem(`${name}_selectedAnswers`);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialIndex ? parseInt(initialIndex) : 0
  );
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>(storedAnswers ? JSON.parse(storedAnswers) : {});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(()=>{
    if(success){
      toast.success(message)
      dispatch(resetAssessmentSlice())
    }
    if(error){
      toast.error(error)
      dispatch(resetAssessmentSlice())
    }
  },[dispatch, error, message, success])

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const formattedSubmissions = Object.entries(selectedAnswers).map(
      ([key, value]) => ({
        questionNumber: parseInt(key) + 1,
        answer: value,
      })
    );
    if (!name || !type) {
      return <div>Invalid route: missing parameters</div>;
    }
    dispatch(
      assessmentSubmitTunk({
        assessmentName: name,
        assessmentType: type,
        submissions: formattedSubmissions,
      })
    );
    setIsFinished(true);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (isFinished) {
      sessionStorage.removeItem(`${name}_currentIndex`);
      sessionStorage.removeItem(`${name}_selectedAnswers`);
    } else {
      sessionStorage.setItem(
        `${name}_currentIndex`,
        currentQuestionIndex.toString()
      );
      sessionStorage.setItem(
        `${name}_selectedAnswers`,
        JSON.stringify(selectedAnswers)
      );
    }
  }, [currentQuestionIndex, selectedAnswers, name, isFinished]);

  return (
    <div
      className="flex items-center justify-center min-h-screen md:px-4 text-gray-700"
      style={{
        backgroundImage: "url('/assets/assessments/career2.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1500px",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 flex flex-col justify-between shadow-lg rounded-xl p-4 py-8 md:py- md:p-8 w-full h-screen  md:h-[500px] max-w-2xl font-serif">
        {isFinished ? (
          <div className="flex flex-col justify-around items-center h-[60vh] text-center">
            <h1 className="text-2xl font-bold text-yellow-700">
              🎉 Thank you for completing the assessment!
            </h1>

            <div>
              <p className=" mb-4">
                We've recorded your responses and will share personalized
                insights with you shortly based on your answers.
              </p>
              <p className="">
                Our team will analyze your inputs to tailor insights and share
                them with you soon.
              </p>
            </div>

            <button
              onClick={() => window.history.back()}
              className="bg-yellow-600 text-white px-6 py-2 rounded hover:opacity-90"
            >
              Go Back
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between md:mb-10">
              <div className="flex items-center  gap-1">
                <LuNotebookPen />
                <h1 className="font-bold text-sm">
                  Assessment for {name} Intelligence
                </h1>
              </div>
              <h2 className="text-sm md:text-base text-right">
                {currentQuestionIndex + 1} of {questions.length}
              </h2>
            </div>

            <div className="">
              <h3 className="text-lg font-semibold mb-10 md:mb-4">
                {currentQuestion.question}
              </h3>

              <div className="flex flex-col space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`p-3 border rounded-lg cursor-pointer transition ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? "bg-yellow-100 border-yellow-600"
                        : "hover:bg-yellow-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={() => handleOptionSelect(option)}
                      className="mr-2 hidden"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="bg-yellow-600 hover:opacity-90 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    handleNext();
                  } else {
                    handleFinish();
                  }
                }}
                disabled={!selectedAnswers[currentQuestionIndex]}
                className="bg-yellow-600 hover:opacity-90 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssessmentQuestions;
