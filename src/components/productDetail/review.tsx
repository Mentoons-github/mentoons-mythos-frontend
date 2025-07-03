import { FaStar, FaUser, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Review = () => {
  const ratings = [
    { stars: 5, count: 85, percentage: 69 },
    { stars: 4, count: 23, percentage: 19 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely love this product! The quality exceeded my expectations and delivery was super fast. Highly recommend to anyone looking for reliability and great value.",
      helpful: 12,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good product overall. Works as described and seems well-built. Only minor complaint is the packaging could be better, but the product itself is solid.",
      helpful: 8,
      notHelpful: 0,
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Perfect! This is exactly what I was looking for. Great customer service too when I had a question about compatibility.",
      helpful: 15,
      notHelpful: 2,
      verified: false,
    },
  ];

  const renderStars = (rating: number, size = "text-sm") => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar
            key={index}
            className={`${size} ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Customer Reviews
      </h1>

      {/* Overall Rating Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Overall score */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-32 h-32 mb-4">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
                />
                <path
                  className="text-yellow-400"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="84, 100"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 1 0 0 31.831 a 15.9155 15.9155 0 1 0 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">4.2</span>
                <span className="text-xs text-gray-500">out of 5</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              {renderStars(4, "text-lg")}
              <p className="text-gray-600 mt-2">Based on 123 reviews</p>
            </div>
          </div>

          {/* Right side - Rating breakdown */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rating Breakdown
            </h3>
            <div className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating.stars}</span>
                    <FaStar className="text-yellow-400 text-xs" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            All Reviews
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            5 Stars
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            4 Stars
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            With Photos
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Verified Only
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Most Helpful
          </button>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {review.comment}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Was this helpful?</span>
              <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                <FaThumbsUp className="text-xs" />
                <span>{review.helpful}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <FaThumbsDown className="text-xs" />
                <span>{review.notHelpful}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="flex justify-center items-center gap-4">
        <div className="mt-6 text-center">
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              question: "How do I leave a review?",
              answer:
                "Click the 'Write a Review' button above and you'll be guided through the process. You can rate the product and leave detailed feedback.",
            },
            {
              question: "Can I edit my review after posting?",
              answer:
                "Yes, you can edit your review within 30 days of posting. Just go to your account and find your review in the 'My Reviews' section.",
            },
            {
              question: "Are all reviews verified?",
              answer:
                "We verify purchases when possible, but we also accept reviews from users who received the product as a gift or through other means.",
            },
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                {faq.question}
              </h4>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
