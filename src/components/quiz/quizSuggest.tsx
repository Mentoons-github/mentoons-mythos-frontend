import { useState } from "react";

const QuizSuggestionSection = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = () => {
    console.log("Suggestion submitted:", { comment, name, email, saveInfo });
    alert("Thank you for your suggestion!");
    setComment("");
    setName("");
    setEmail("");
    setSaveInfo(false);
  };

  return (
    <div className="w-full bg-blue-500 py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="w-full lg:w-3/5 mb-6 lg:mb-0 order-2 lg:order-1">
            <h2 className="font-semibold text-black text-2xl sm:text-3xl lg:text-4xl text-center lg:text-start tracking-wide sm:tracking-wider lg:tracking-widest mb-2 sm:mb-3">
              WANT TO SUGGEST A QUIZ IDEA?
            </h2>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm text-center lg:text-left">
              Your email address will not be published. Required fields are
              marked *
            </p>

            <div>
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your Comment *"
                  className="w-full p-3 rounded bg-white text-black"
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  className="flex-1 p-3 rounded bg-white text-black"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email *"
                  className="flex-1 p-3 rounded bg-white text-black"
                />
              </div>

              <div className="flex items-start sm:items-center mb-4">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-2 mt-1 sm:mt-0"
                />
                <label
                  htmlFor="saveInfo"
                  className="text-blue-100 text-xs sm:text-sm"
                >
                  Save my name/email and website in this browser for the next
                  time I comment.
                </label>
              </div>

              <div className="flex justify-center sm:justify-start">
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white py-2 px-6 rounded uppercase text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center items-center order-1 lg:order-2">
            <img
              src="/assets/quiz/form/Girl asks a question to the support service and the operator answers her question.png"
              alt="Support service illustration"
              className="max-w-full h-auto max-h-48 sm:max-h-64 lg:max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSuggestionSection;
