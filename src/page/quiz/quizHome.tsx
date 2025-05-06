import FAQ from "../../components/about/FAQ";
import FeaturedQuiz from "../../components/quiz/featuredQuiz";
import GoodiesAndMerch from "../../components/quiz/goodiesAndMerch";
import QuizSuggestionSection from "../../components/quiz/quizSuggest";
import WhyQuiz from "../../components/quiz/whyQuiz";

const QuizHome = () => {
  return (
    <div className="bg-[#F9F1E6]">
      <div className="relative flex flex-col justify-center items-start bg-[#F9F1E6] h-[50vh] px-20">
        <h1 className="text-4xl font-bold tracking-wide max-w-xl text-[#E39712] font-montserrat">
          WELCOME TO <span className="text-black">MENTOONS MYTHOS</span> QUIZZES
        </h1>
        <p className="max-w-xl text-xl font-medium mt-5 leading-8 font-montserrat tracking-wider">
          Step into the divine realm of Indian mythology. Our quizzes are
          designed to challenge your knowledge, spark curiosity, and help you
          rediscover iconic characters from the epics like the Ramayana,
          Mahabharata, Puranas, and more.
        </p>
        <img
          alt="hanuman-img"
          className="absolute bottom-0 right-0 z-5"
          src="/assets/gods/image 26.png"
        />
        <img
          alt="hanuman-img"
          className="absolute bottom-0 right-1/5 z-5"
          src="/assets/gods/image 27.png"
        />
        <img
          alt="hanuman-img"
          className="absolute bottom-0 right-17"
          src="/assets/gods/potrait-of-ram--the-hindu-god_2-removebg-preview.png"
        />
      </div>
      <WhyQuiz />
      <FeaturedQuiz />
      <GoodiesAndMerch />
      <QuizSuggestionSection />
      <FAQ />
    </div>
  );
};

export default QuizHome;
