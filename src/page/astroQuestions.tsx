import { useState } from "react";
import { ASTRO_QUESTIONS } from "../constants/astrologyQuestions";

const AstroQuestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = ASTRO_QUESTIONS[currentIndex];

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < ASTRO_QUESTIONS.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer("");
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:p-5 bg-[url('/assets/quiz/quizzes/quizbackground3.jpg')] bg-no-repeat bg-cover bg-center">
      {!showResult ? (
        <div className="w-full lg:max-w-2xl text-center bg-background/80 p-7 rounded-2xl shadow-md border border-foreground">
          <div className="flex justify-between">
            <h2 className="text-lg text-yellow-400 font-bold">🌟 Mythology Quiz</h2>
            <h2 className=" text-end text-sm mb-6">
            {currentIndex + 1} of {ASTRO_QUESTIONS.length}
          </h2>
          </div>
          <h3 className="text-2xl font-bold mb-8">
            {currentQuestion.question}
          </h3>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={!!selectedAnswer}
                className={`block w-full py-3 rounded-lg text-lg border transition-all duration-300 ${
                  selectedAnswer
                    ? option === currentQuestion.answer
                      ? "bg-green-600 border-green-700"
                      : option === selectedAnswer
                      ? "bg-red-600 border-red-700"
                      : "border-gray-600 hover:bg-muted"
                    : " border-gray-600 hover:bg-muted"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center bg-background/80 p-10 rounded-2xl border border-muted-foreground shadow-2xl max-w-md w-full">
    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-yellow-400">
      🌟 Quiz Completed!
    </h2>
    <p className="text-lg mb-6 ">
      You’ve completed the Mythology Quiz. Let’s see how well the stars aligned
      for you!
    </p>
    <p className="text-2xl font-semibold mb-8">
      You got{" "}
      <span className="text-yellow-400">
        {score} / {ASTRO_QUESTIONS.length}
      </span>{" "}
      correct.
    </p>

    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <button
        onClick={handleRestart}
        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300"
      >
        🔁 Restart Quiz
      </button>
      <button
        onClick={() => window.location.href = '/'} 
        className="px-6 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300"
      >
        🏠 Back to Home
      </button>
    </div>
  </div>
      )}
    </div>
  );
};

export default AstroQuestions;
