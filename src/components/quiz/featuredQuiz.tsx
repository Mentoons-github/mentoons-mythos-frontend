import { FaArrowRight } from "react-icons/fa";

const FeaturedQuiz = () => {
  const Quizzes = [
    {
      img: "/assets/quiz/quizzes/mock7 1.png",
      title: "Do You Know Your Zodiac? Check it out now!",
      description: "Short Description of the item and its use",
    },
    {
      img: "/assets/quiz/quizzes/mockup-1.png",
      title: "Lost Gods & Goddess: Do you know their names?",
      description: "Short Description of the item and its use",
    },
    {
      img: "/assets/quiz/quizzes/mockup5.png",
      title: "Get to Know About the Planets and Their Movements!",
      description: "Short Description of the item and its use",
    },
    {
      img: "/assets/quiz/quizzes/tote-bag-mockup.png",
      title: "Get to Know About the Planets and Their Movements!",
      description: "Short Description of the item and its use",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 sm:h-20 px-2 sm:px-6 lg:px-10 mb-6 sm:mb-0">
        <h1 className="font-semibold text-[#E39712] text-2xl sm:text-3xl lg:text-4xl text-start tracking-wide sm:tracking-wider lg:tracking-widest">
          FEATURED QUIZZES FOR YOU
        </h1>
        <div className="flex justify-start sm:justify-end sm:items-end">
          <button className="flex items-center gap-2 h-auto sm:h-5 p-3 sm:p-4 border rounded-full text-sm sm:text-base hover:bg-gray-100 transition-colors">
            View All <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2 sm:mt-5">
        {Quizzes.map((quiz, index) => (
          <div
            key={index}
            className="w-full bg-transparent rounded-xl shadow-md overflow-hidden flex flex-col h-full"
          >
            <img
              src={quiz.img}
              className="w-full h-40 sm:h-36 lg:h-40 object-cover"
              alt={`Quiz card - ${quiz.title}`}
            />

            <div className="p-4 flex flex-col flex-grow">
              <h1 className="text-lg font-semibold mb-2 font-inter line-clamp-2">
                {quiz.title}
              </h1>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {quiz.description}
              </p>

              <div className="mt-auto flex flex-col sm:flex-row gap-2">
                <button className="w-full sm:flex-1 min-w-fit whitespace-nowrap bg-[#1A1D3B] hover:bg-[#2D3160] transition-colors text-white py-2 sm:py-1 px-3 rounded">
                  Attempt Now
                </button>
                <button className="w-full sm:flex-1 min-w-fit whitespace-nowrap border border-[#1A1D3B] hover:border-[#2D3160] hover:text-[#1A1D3B] hover:bg-[#F0F1F8] transition-colors text-gray-800 py-2 sm:py-1 px-3 rounded">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedQuiz;
