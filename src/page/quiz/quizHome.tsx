import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    title: "Ramayan",
    description: "Explore the epic journey of Lord Rama",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Mahabharat",
    description: "Dive into the greatest war story ever told",
    color: "from-indigo-400 to-purple-500",
  },
];

const QuizHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Quiz</h1>
        <p className="text-gray-500 mt-2">
          Learn with fun and test your knowledge
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`${quiz.title.toLocaleLowerCase()}`)}
            className={`w-80 h-48 rounded-3xl shadow-lg bg-gradient-to-r ${quiz.color} text-white p-6 flex flex-col justify-between cursor-pointer`}
          >
            <div>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <p className="text-sm mt-2 opacity-90">{quiz.description}</p>
            </div>

            <button className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition">
              Start Quiz →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizHome;
