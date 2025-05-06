import { BiCube } from "react-icons/bi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaFilm } from "react-icons/fa";

const WhyQuiz = () => {
  const Data = [
    {
      title: "Explore ancient Indian lore",
      description:
        "3 dimensional coverage of all questions related to a perticular topic",
      Icon: BiCube,
      bg: "bg-red-200",
      text: "text-red-600",
    },
    {
      title: "Fun, Illustrated and Immersive",
      description:
        "Plenty of subjects to choose from for e.g. ancient languages, Vedas, mythological subjects etc.",
      Icon: HiOutlineBookOpen,
      bg: "bg-blue-200",
      text: "text-blue-600",
    },
    {
      title: "Learn through gamification",
      description:
        "Detailed explaination of a solution is provided to get depper understanding of a topic",
      Icon: FaFilm,
      bg: "bg-green-200",
      text: "text-green-600",
    },
  ];

  return (
    <div className="relative p-4 md:p-8 lg:p-10 bg-[#FEFEF6] overflow-hidden">
      <img
        src="/assets/quiz/Vector 5 (1).png"
        className="absolute top-0 -right-5 w-40 md:w-60 lg:w-96 rotate-[10deg] opacity-60 md:opacity-100"
        alt="Decorative background"
      />
      <img
        src="/assets/quiz/Vector 5 (1).png"
        className="absolute bottom-0 -left-20 md:-left-30 lg:-left-47 w-40 md:w-60 lg:w-96 rotate-[360deg] opacity-60 md:opacity-100"
        alt="Decorative background"
      />

      <h1 className="font-semibold text-[#E39712] text-2xl md:text-3xl lg:text-4xl text-center tracking-wider md:tracking-widest relative z-10">
        WHY TAKE OUR MYTHOS QUIZZES?
      </h1>

      <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-8 md:gap-4 mt-6 md:mt-8 lg:mt-10 relative z-10">
        {Data.map((details, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 md:gap-3 p-4 md:p-0 max-w-xs font-montserrat md:h-80 lg:h-96 bg-white/50 md:bg-transparent rounded-lg md:rounded-none shadow-sm md:shadow-none"
          >
            <div
              className={`h-12 w-12 md:h-14 md:w-14 lg:h-15 lg:w-15 rounded-full ${details.bg} flex justify-center items-center`}
            >
              <details.Icon className={`text-xl md:text-2xl ${details.text}`} />
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold w-full md:w-56 lg:w-64">
              {details.title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-inter text-[#828282] w-full md:w-56 lg:w-64">
              {details.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyQuiz;
