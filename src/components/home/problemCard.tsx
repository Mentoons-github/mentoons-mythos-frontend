import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCards } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { ProblemFacedI } from "../../types/problemFaced";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const ProblemCard = ({ data }: { data: ProblemFacedI[] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full px-2 relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectCards]}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center py-3 md:py-5"
          >
            <div className="w-32 md:w-40 mx-auto aspect-square p-6 rounded-full flex justify-center items-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] bg-card overflow-hidden">
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="mt-6 w-full max-w-xs mx-auto">
              <h1 className="font-sans font-bold md:text-md text-center px-2 leading-tight">
                {item.text}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#ede8e8d3] hover:bg-white text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 font-bold text-xl md:text-2xl"
        aria-label="Previous slide"
      >
        <GrPrevious className="text-base md:text-xl" />
      </button>

      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#ede8e8d3] hover:bg-white text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 font-bold text-xl md:text-2xl"
        aria-label="Next slide"
      >
        <GrNext className="text-base md:text-xl" />
      </button>
    </div>
  );
};

export default ProblemCard;
