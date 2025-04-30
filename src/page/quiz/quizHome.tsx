const QuizHome = () => {
  return (
    <div className="">
      <div className="relative flex flex-col justify-start items-start bg-[#F9F1E6] p-10 px-20">
        <h1 className="text-4xl font-bold tracking-wide max-w-xl text-[#E39712]">
          WELCOME TO <span className="text-black">MENTOONS MYTHOS</span> QUIZZES
        </h1>
        <p className="max-w-xl text-xl font-medium mt-5 leading-8">
          Step into the divine realm of Indian mythology. Our quizzes are
          designed to challenge your knowledge, spark curiosity, and help you
          rediscover iconic characters from the epics like the Ramayana,
          Mahabharata, Puranas, and more.
        </p>
        <img
          className="absolute bottom-0 left-1/2"
          src="/assets/gods/image 26.png"
        />
      </div>
    </div>
  );
};

export default QuizHome;
