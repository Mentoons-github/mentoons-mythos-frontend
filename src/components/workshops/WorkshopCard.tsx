import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getWorkshopsThunk } from "../../features/workshop/workshopThunk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const WorkshopCard = () => {
  const dispatch = useAppDispatch();
  const { workshops } = useAppSelector((state) => state.workshop);

  useEffect(() => {
    dispatch(
      getWorkshopsThunk({ page: 1, limit: 0, sort: "oldest", search: "" })
    );
  }, [dispatch]);

  return (
    <>
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #111111 !important;
          background: #ffffff !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 22px !important;
          font-weight: bold;
        }

        .swiper-button-next.swiper-button-disabled,
        .swiper-button-prev.swiper-button-disabled {
          opacity: 0.35 !important;
          cursor: not-allowed;
        }

        .swiper-pagination-bullet {
          background: #ffffff !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          width: 12px;
          height: 12px;
        }
      `}</style>

      <div className="w-full mx-auto  py-12">
        {workshops.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={40}
            navigation
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            slidesPerView={1}
            className="w-full"
          >
            {workshops.map((workshop, idx) => (
              <SwiperSlide key={idx}>
                <div className="min-w-full flex flex-col lg:flex-row items-center justify-between rounded-2xl px-4 lg:px-24">
                  <div className="md:p-8 p-4 flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      Workshop Held for{" "}
                      <span className="font-extrabold block lg:inline">
                        Age {workshop.age}
                      </span>
                    </h1>
                    <p className="text-muted-foreground mb-6 text-lg md:text-xl mt-5">
                      <span className="font-semibold">Focus:</span>{" "}
                      {workshop.focus}
                    </p>
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Activities:
                      </h2>
                      <ul className="space-y-1 list-disc list-inside ml-5">
                        {workshop.activities.map((act, ind) => (
                          <li key={ind} className="text-[17px] font-medium">
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <div className="inline-block bg-foreground text-background font-semibold text-lg px-5 py-2 rounded-full shadow-md">
                        ₹{workshop.amount} / 6 Weeks
                      </div>
                    </div>
                  </div>

                  <div>
                    <img
                      src={workshop.img}
                      alt="workshop"
                      className="object-cover w-96"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default WorkshopCard;
