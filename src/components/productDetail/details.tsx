import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Details = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const text =
    "This elegantly designed bag showcases a powerful and artistic print of Lord Ram, embodying the spirit of righteousness, strength, and devotion. Crafted from high-quality fabric, it blends traditional reverence with modern utility, making it perfect for daily use, spiritual gatherings, or as a meaningful gift. The image of Lord Ram serves as a constant reminder of dharma and inner peace, allowing you to carry both your essentials and your values wherever you go.";

  return (
    <div className="w-full font-montserrat space-y-4 sm:space-y-6">
      {/* Brand and Title */}
      <div className="space-y-2">
        <h1 className="text-gray-500 text-sm sm:text-base font-montserrat">
          Mythos
        </h1>
        <h1 className="text-start font-bold tracking-wide text-2xl sm:text-3xl text-gray-900">
          Constellation Bag
        </h1>
      </div>

      {/* Price and Rating */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mt-3 sm:mt-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          <span className="text-gray-500 line-through text-base sm:text-lg mr-2 sm:mr-3">
            ₹1199
          </span>
          ₹ 1499
        </h1>
        <div className="text-xl sm:text-2xl flex items-center gap-2 font-bold">
          <FaStar className="text-yellow-500" />
          4.5
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px mt-6 sm:mt-8 bg-[repeating-linear-gradient(to_right,_#9CA3AF_0_10px,_transparent_10px_20px)]"></div>

      {/* Description */}
      <div className="space-y-3 sm:space-y-5 mt-5 sm:mt-7">
        <h1 className="text-lg sm:text-xl text-gray-800 font-semibold">
          Description :
        </h1>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {isExpanded
            ? text
            : `${text.slice(0, window.innerWidth < 640 ? 200 : 390)}...`}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 ml-2 underline text-sm sm:text-base hover:text-blue-800"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
        <button className="w-full sm:w-auto bg-black text-white py-3 px-6 sm:px-8 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black text-sm sm:text-base">
          Add To Cart
        </button>
        <button className="w-full sm:w-auto border border-black text-black py-3 px-6 sm:px-8 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-black hover:text-white text-sm sm:text-base">
          Check Out Now
        </button>
      </div>
    </div>
  );
};

export default Details;
