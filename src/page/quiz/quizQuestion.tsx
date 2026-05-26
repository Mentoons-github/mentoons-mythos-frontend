import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizComplete from "../../components/quiz/QuizComplete";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getSingleQuizThunk } from "../../features/quiz/quizThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const OPTION_LABELS = ["A", "B", "C", "D"];

const QuizQuestion = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const dispatch = useAppDispatch();
  const { singleQuiz, loading } = useAppSelector((state) => state.quiz);
  const questions = singleQuiz?.questions || [];

  useEffect(() => {
    if (category) {
      dispatch(getSingleQuizThunk(category));
    }
  }, [category, dispatch]);

  const handleOptionClick = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowAnswer(true);

    if (option === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);
      setCurrentQ((prev) => prev + 1);
    }, 2000);
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
  };

  if (!questions.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        <div className="text-center">
          <div style={{ fontSize: 48 }}>📜</div>
          <p style={{ fontSize: 20, color: "#64748b", marginTop: 12 }}>
            No questions found for this category.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        <div className="text-center">
          <div style={{ fontSize: 48 }}>📜</div>
          <p style={{ fontSize: 20, color: "#64748b", marginTop: 12 }}>
            Loading Questions...
          </p>
        </div>
      </div>
    );
  }

  if (currentQ >= questions.length) {
    return (
      <QuizComplete
        score={score}
        questions={questions}
        handleRetry={handleRetry}
      />
    );
  }

  const question = questions[currentQ];
  const progressFill = ((currentQ + 1) / questions.length) * 100;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "white",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/assets/quiz/quizzes/bg.png')",
          
        }}
      /> */}

      {/* Ambient light top */}
      {/* <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse, #f97316, transparent 70%)" }}
      /> */}
      {/* Ambient light bottom */}
      {/* <div
        className="absolute bottom-0 right-0 w-72 h-72 blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #c2410c, transparent 70%)",
        }}
      /> */}

      {/* Subtle grid */}
      {/* <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      /> */}

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="z-20 absolute top-5 left-5 flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 group"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#f97316";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#f97316";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(255,255,255,0.15)";
        }}
      >
        <IoMdArrowRoundBack className="text-black text-xl transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      {/* Score + Streak pill — top right */}
      <div className="z-20 absolute top-5 right-5 flex items-center gap-2">
        {streak >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: "rgba(251,146,60,0.18)",
              border: "1px solid rgba(251,146,60,0.35)",
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 12,
              color: "#fb923c",
              fontStyle: "italic",
              letterSpacing: "0.05em",
            }}
          >
            🔥 {streak}× streak
          </motion.div>
        )}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 16,
            color: "#323535",
            letterSpacing: "0.04em",
          }}
        >
          {score} <span style={{ color: "#323535" }}>/ {currentQ}</span>
        </div>
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-5 px-1">
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-[#323535]"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Question {currentQ + 1} of {questions.length}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#f97316",
                letterSpacing: "0.06em",
              }}
            >
              {Math.round(progressFill)}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              background: "#9b4123",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${progressFill}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #f97316, #fb923c)",
                borderRadius: 99,
                boxShadow: "0 0 10px rgba(249,115,22,0.6)",
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: "32px 28px",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Category badge */}
            <div className="flex justify-center mb-5">
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#f97316",
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  borderRadius: 20,
                  padding: "4px 14px",
                }}
              >
                {category}
              </span>
            </div>

            {/* Question */}
            <h2
              className="text-center mb-8 leading-relaxed"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#323535",
                fontFamily: "'Georgia', serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                minHeight: 64,
              }}
            >
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 ">
              {question.options.map((option, index) => {
                const isCorrect = option === question.answer;
                const isSelected = option === selected;

                let bg = "rgba(255,255,255,0.05)";
                let border = "#656a6a";
                let textColor = "#323535";
                let labelBg = "rgba(227,227,221,0.88)";
                let labelColor = "#323535";
                let shadow = "none";
                let scale = 1;

                if (showAnswer) {
                  if (isCorrect) {
                    bg = "rgba(76,197,49,0.89)";
                    border = "rgba(34,197,94,0.6)";
                    textColor = "white";
                    labelBg = "rgb(6,89,9)";
                    labelColor = "#4ade80";
                    shadow = "0 0 20px rgba(34,197,94,0.2)";
                    scale = 1.01;
                  } else if (isSelected) {
                    bg = "rgba(240,34,34,0.92)";
                    border = "rgba(239,68,68,0.55)";
                    textColor = "white";
                    labelBg = "rgba(144,6,6,0.93)";
                    labelColor = "#f87171";
                    shadow = "0 0 20px rgba(239,68,68,0.15)";
                    scale = 0.99;
                  }
                } else if (isSelected) {
                  bg = "rgba(249,115,22,0.18)";
                  border = "rgba(249,115,22,0.55)";
                  textColor = "#fdba74";
                  labelBg = "rgba(249,115,22,0.25)";
                  labelColor = "#fb923c";
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    animate={{ scale }}
                    whileHover={!selected ? { scale: 1.01, x: 3 } : {}}
                    whileTap={!selected ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center gap-4 text-left"
                    style={{
                      padding: "14px 16px",
                      borderRadius: 16,
                      background: bg,
                      border: `1.5px solid ${border}`,
                      cursor: selected ? "default" : "pointer",
                      boxShadow: shadow,
                      transition:
                        "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                      outline: "none",
                    }}
                  >
                    {/* Label badge */}
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        borderRadius: 8,
                        background: labelBg,
                        color: labelColor,
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "0.04em",
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      {OPTION_LABELS[index]}
                    </span>

                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: textColor,
                        fontFamily: "'Georgia', serif",
                        lineHeight: 1.4,
                        transition: "color 0.25s",
                        flex: 1,
                      }}
                    >
                      {option}
                    </span>

                    {/* Result icon */}
                    {showAnswer && (isCorrect || isSelected) && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                        style={{
                          fontSize: 18,
                          minWidth: 24,
                          textAlign: "center",
                        }}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Answer feedback */}
            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-5"
                  style={{
                    fontSize: 13,
                    color:
                      selected === question.answer ? "#0c8f06e9" : "#b61212",
                    fontStyle: "italic",
                    letterSpacing: "0.04em",
                  }}
                >
                  {selected === question.answer
                    ? "✦ Correct! Moving on…"
                    : `✗ The answer was: ${question.answer}`}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizQuestion;
