import MythosButton from "../home/button";

const GoodiesAndMerch = () => {
  const products = [
    { src: "/assets/quiz/shop/image 18.png", alt: "product-1" },
    { src: "/assets/quiz/shop/image 19.png", alt: "product-2" },
    { src: "/assets/quiz/shop/image 20.png", alt: "product-3" },
    { src: "/assets/quiz/shop/image 21.png", alt: "product-4" },
    { src: "/assets/quiz/shop/image 22.png", alt: "product-5" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-[#1A1D3B]">
      <h1 className="font-semibold text-[#E39712] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center tracking-wide md:tracking-wider lg:tracking-widest px-2">
        GET A CHANCE TO WIN FREE GOODIES AND MERCH!
      </h1>

      <p className="text-base sm:text-lg text-white font-mulish text-center max-w-xs sm:max-w-md lg:max-w-lg mx-auto mt-2 md:mt-3 px-2">
        Get you favorite mythological character represented in the apparels and
        accessories you wear!!!
      </p>

      <div className="mt-4 md:mt-7 relative">
        <div className="flex overflow-x-auto pb-4 md:hidden space-x-4 px-2 scrollbar-hide">
          {products.map((product, index) => (
            <img
              key={index}
              src={product.src}
              className="w-48 flex-shrink-0 object-contain"
              alt={product.alt}
            />
          ))}
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 place-items-center">
          {products.map((product, index) => (
            <img
              key={index}
              src={product.src}
              className="w-40 lg:w-48 xl:w-64 object-contain"
              alt={product.alt}
            />
          ))}
        </div>
      </div>

      <h3 className="font-semibold text-[#E39712] text-base sm:text-lg text-center max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl tracking-wide md:tracking-wider lg:tracking-widest mx-auto mt-4 lg:mt-5 px-2">
        WIN IN OUR CURATED QUIZZES TO GET EXCLUSIVE TSHIRTS, SWEATS, ACCESSORIES
        AND MANY MORE!!!
      </h3>

      <div className="flex justify-center mt-4 lg:mt-5">
        <MythosButton label="START QUIZZES" />
      </div>
    </div>
  );
};

export default GoodiesAndMerch;
