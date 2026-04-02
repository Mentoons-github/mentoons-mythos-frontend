import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    title: "Ramayan",
    icon: "🏹",
    description:
      "Explore the epic journey of Lord Rama across 14 years of exile.",
    bg: "from-orange-500 via-red-500 to-red-900",
  },
  {
    title: "Mahabharat",
    icon: "⚔️",
    description:
      "Dive into the greatest war story ever told, from Kurukshetra.",
    bg: "from-indigo-400 via-indigo-600 to-indigo-950",
  },
];

const quizzesNew = [
  {
    title: "Holy Quran",
    navigate: "quran",
    icon: "🌙",
    description: "Test your knowledge from the Quran's teachings.",
    iconBg: "from-emerald-400 to-emerald-800",
  },
  {
    title: "Holy Bible",
    navigate: "bible",
    icon: "✝️",
    description: "Explore timeless stories from the scriptures.",
    iconBg: "from-blue-400 to-blue-900",
  },
];

const QuizHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen px-4 sm:px-8 lg:px-16 py-14"

    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-orange-600 mb-2">
            Sacred Knowledge
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Choose Your <span className="text-orange-600">Quiz</span>
          </h1>
          <p className="text-gray-500 mt-3 text-sm font-light max-w-sm leading-relaxed">
            Learn through stories, test your wisdom, and explore ancient
            scriptures.
          </p>
        </div>
        <span className="self-start sm:self-auto bg-gray-900 text-amber-50 text-xs font-medium tracking-wide px-5 py-2 rounded-full">
          4 Quizzes Available
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-10" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Popular Quizzes */}
        <div className="lg:col-span-2">
          <p className="text-[10.5px] font-medium tracking-widest uppercase text-gray-400 mb-5 flex items-center gap-3">
            Popular Quizzes
            <span className="flex-1 h-px bg-gray-200" />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                onClick={() => navigate(quiz.title.toLowerCase())}
                className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[220px] flex flex-col justify-end bg-gradient-to-br ${quiz.bg}`}
              >
                {/* Decorative blob */}
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white opacity-10" />

                <div className="relative z-10 p-6">
                  <span className="text-3xl mb-3 block">{quiz.icon}</span>
                  <h2
                    className="text-2xl font-bold text-white leading-tight mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {quiz.title}
                  </h2>
                  <p className="text-white/75 text-sm font-light leading-relaxed mb-5">
                    {quiz.description}
                  </p>
                  <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-medium px-4 py-2 rounded-full">
                    Start Quiz →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <p className="text-[10.5px] font-medium tracking-widest uppercase text-gray-400 mb-5 flex items-center gap-3">
            Recommended
            <span className="flex-1 h-px bg-gray-200" />
          </p>

          <div className="flex flex-col gap-4">
            {quizzesNew.map((quiz, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate(quiz.navigate)}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:border-orange-200 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quiz.iconBg} flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {quiz.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-gray-900 leading-tight"
                    style={{ fontFamily: "Georgia, serif", fontSize: "17px" }}
                  >
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mt-1 leading-snug">
                    {quiz.description}
                  </p>
                </div>
                <span className="text-gray-400 text-base transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHome;
