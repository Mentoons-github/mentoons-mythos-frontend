import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HiringBanner = () => {
  // Animation controls for each element
  const controlsSaturn = useAnimation();
  const controlsWrench = useAnimation();
  const controlsPeople = useAnimation();

  // Intersection observers for each element
  const [saturnRef, saturnInView] = useInView({ threshold: 0.1 });
  const [wrenchRef, wrenchInView] = useInView({ threshold: 0.1 });
  const [peopleRef, peopleInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (saturnInView) {
      controlsSaturn.start({
        y: [20, -10, 0],
        rotate: [0, 5, 0],
        transition: { duration: 3, repeat: Infinity, repeatType: "reverse" },
      });
    }
    if (wrenchInView) {
      controlsWrench.start({
        rotate: [0, 360],
        transition: { duration: 8, repeat: Infinity, ease: "linear" },
      });
    }
    if (peopleInView) {
      controlsPeople.start({
        y: [0, -15, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      });
    }
  }, [
    saturnInView,
    wrenchInView,
    peopleInView,
    controlsSaturn,
    controlsWrench,
    controlsPeople,
  ]);

  return (
    <div className="relative mx-auto min-h-screen bg-black bg-[url('/assets/background/section/stars_background.png')] bg-cover bg-center space-y-10 p-5 overflow-hidden">
      {/* Saturn with floating animation */}
      <motion.img
        ref={saturnRef}
        animate={controlsSaturn}
        src="/assets/hiring/planet saturn.png"
        alt="saturn"
        className="absolute top-1/4 left-1/5 w-20 md:w-40"
      />

      {/* Wrench with rotating animation */}
      <motion.img
        ref={wrenchRef}
        animate={controlsWrench}
        src="/assets/hiring/Gears and wrench.png"
        alt="wrench"
        className="absolute bottom-15 left-15 w-16 md:w-32"
      />

      {/* People with floating animation */}
      <motion.img
        ref={peopleRef}
        animate={controlsPeople}
        src="/assets/hiring/Two people watching online lesson.png"
        alt="two peoples"
        className="absolute right-1/9 bottom-20 w-24 md:w-48"
      />

      {/* Content - maintaining original alignment */}
      <div className="h-full flex flex-col justify-center items-center pt-20 md:pt-0">
        <h1 className="text-[#E39712] text-center text-2xl md:text-4xl font-semibold">
          WE ARE HIRING AT MENTOONS MYTHOS
        </h1>
        <p className="text-base md:text-xl text-center mt-5 text-white mx-auto max-w-2xl">
          If you're passionate about helping others, have deep empathy, and
          believe in guiding people through self-awareness, we'd love to hear
          from you.
        </p>
        <div className="flex justify-center items-center mt-10">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="/assets/hiring/Frame.png"
            alt="hiring-office"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HiringBanner;
