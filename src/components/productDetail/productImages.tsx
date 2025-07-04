import { useState } from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiHeart,
  BiUpload,
} from "react-icons/bi";

const ProductImages = () => {
  const Images = [
    "/assets/mythosProducts/tote-bag-mockup.png",
    "/assets/mythosProducts/bag/ChatGPT Image Jul 2, 2025, 11_53_25 AM.png",
    "/assets/mythosProducts/bag/ChatGPT Image Jul 2, 2025, 11_39_22 AM.png",
    "/assets/mythosProducts/bag/ChatGPT Image Jul 2, 2025, 11_42_59 AM.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === 3) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(Images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const selectedImage = Images[currentIndex];

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
      {/* Main Image and Thumbnails */}
      <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4">
        {/* Main Image */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-[26rem] aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <img
            src={selectedImage}
            alt="bag"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full justify-center">
          {Images.map((img, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
                selectedImage === img
                  ? "border-2 border-black rounded-lg scale-105 shadow-md"
                  : "border border-transparent rounded-md"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col justify-center sm:justify-between items-center gap-3 sm:gap-0 p-3 order-first sm:order-last">
        {/* Top Actions */}
        <div className="flex sm:flex-col gap-3">
          <button className="bg-gray-200 rounded p-2 sm:p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer">
            <BiUpload className="text-xl sm:text-2xl lg:text-3xl" />
          </button>
          <button className="bg-gray-200 rounded p-2 sm:p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer">
            <BiHeart className="text-xl sm:text-2xl lg:text-3xl" />
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex sm:flex-col gap-3">
          <button
            onClick={handleNext}
            className="bg-gray-200 rounded p-2 sm:p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer"
          >
            <BiChevronRight className="text-xl sm:text-2xl lg:text-3xl" />
          </button>
          <button
            onClick={handlePrev}
            className="bg-gray-200 rounded p-2 sm:p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer"
          >
            <BiChevronLeft className="text-xl sm:text-2xl lg:text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
