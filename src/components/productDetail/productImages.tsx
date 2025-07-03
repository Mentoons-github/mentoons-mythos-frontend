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
    <div className="flex gap-5">
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="w-full max-w-lg h-[26rem] aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <img
            src={selectedImage}
            alt="bag"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-3">
          {Images.map((img, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              className={`w-20 h-20 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
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
      <div className="flex flex-col justify-between items-center p-3">
        <div className="flex flex-col gap-3">
          <button className="bg-gray-200 rounded p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer">
            <BiUpload className="text-3xl font-lighter" />
          </button>
          <button className="bg-gray-200 rounded p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer">
            <BiHeart className="text-3xl" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="bg-gray-200 rounded p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer"
          >
            <BiChevronRight className="text-3xl font-lighter" />
          </button>
          <button
            onClick={handlePrev}
            className="bg-gray-200 rounded p-3 hover:bg-black hover:text-white transition ease-in cursor-pointer"
          >
            <BiChevronLeft className="text-3xl font-lighter" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
