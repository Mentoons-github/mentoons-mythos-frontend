import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Details = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const colors = ["#EF4444", "#D1D5DB", "#EAB308", "#22C55E"];

  const selectedColor = colors[currentIndex];

  const text =
    "This elegantly designed bag showcases a powerful and artistic print of Lord Ram, embodying the spirit of righteousness, strength, and devotion. Crafted from high-quality fabric, it blends traditional reverence with modern utility, making it perfect for daily use, spiritual gatherings, or as a meaningful gift. The image of Lord Ram serves as a constant reminder of dharma and inner peace, allowing you to carry both your essentials and your values wherever you go.";

  return (
    <div className="w-full font-montserrat">
      <h1 className="text-gray-500 text font-montserrat">Mythos</h1>
      <h1 className="text-start font-bold tacking-wide text-3xl text-gray-900">
        Constellation Bag
      </h1>
      <div className="flex justify-between mt-5">
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="text-gray-500 line-through text-lg mr-3">₹1199</span>
          ₹ 1499
        </h1>
        <div className="text-2xl flex items-center gap-2 font-bold">
          <FaStar className="text-yellow-500" />
          4.5
        </div>
      </div>

      <div className="w-full h-px mt-8 bg-[repeating-linear-gradient(to_right,_#9CA3AF_0_10px,_transparent_10px_20px)]"></div>

      <div className="space-y-5 mt-7">
        <h1 className="text-xl text-gray-800 font-semibold">Description :</h1>
        <p className="text-gray-700">
          {isExpanded ? text : `${text.slice(0, 390)}...`}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 ml-2 underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </p>
      </div>
      <div className="mt-6 space-y-2">
        <h1>Color: White</h1>
        <div className="flex items-center gap-4">
          {colors.map((clr, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              className={`w-15 h-7 transition-all duration-100 ease-in ${
                selectedColor === clr
                  ? "border border-2 border-black rounded scale-105"
                  : ""
              }`}
              style={{ background: clr }}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5 mt-6">
        <button className="w-xs bg-black text-white p-3 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black">
          Add To Cart
        </button>
        <button className="w-xs border border-black text-black p-3 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
          Check Out Now
        </button>
      </div>
    </div>
  );
};

export default Details;
