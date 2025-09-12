import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getWorkshopsThunk } from "../../features/workshop/workshopThunk";

const WorkshopCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch()
  const {workshops} = useAppSelector((state) => state.workshop)

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    dispatch(getWorkshopsThunk({page:1, limit:0, sort:"newest", search:''}))
  },[dispatch])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === workshops.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full lg:mt-10 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {workshops.map((workshop, idx) => (
          <div
            key={idx}
            className="min-w-full flex flex-col lg:flex-row items-center justify-between rounded-2xl lg:px-20"
          >
            <div className="md:p-8 p-4 flex-1">
              <h1 className="text-3xl md:text-5xl font-bold">
                Workshop Held for{" "}
                <span className="text-gray-800 font-extrabold block lg:inline"> Age {workshop.age}</span>
              </h1>
              <p className="text-gray-700 mb-6 text-lg md:text-xl mt-5">
                <span className="font-semibold">Focus:</span> {workshop.focus}
              </p>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Activities:
                </h2>
                <ul className="space-y-1 list-disc list-inside text-gray-800 ml-5">
                  {workshop.activities.map((act, ind) => (
                    <li key={ind} className="text-[17px] font-medium">
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <div className="inline-block bg-black text-white font-semibold text-lg px-5 py-2 rounded-full shadow-md">
                  ₹{workshop.amount} / 6 Weeks
                </div>
              </div>
            </div>

            <div>
              <img
                src={workshop.img}
                alt="workshop"
                className="object-cover w-96 "
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black p-1 md:p-3 rounded-full shadow-lg transition hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black p-1 md:p-3 rounded-full shadow-lg transition hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {workshops.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkshopCard;
