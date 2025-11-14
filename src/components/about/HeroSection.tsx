import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const HeroSection = () => {
  return (
    <div className="bg-[url('/assets/background/section/stars_background.png')] bg-center md:pt-10 p-4 md:p-6 pb-12 md:pb-24 flex flex-col lg:flex-row overflow-hidden">
      <motion.div
        className="w-full  lg:w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold py-6 md:py-10 lg:mt-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ABOUT MENTOONS MYTHOS
        </motion.h1>
        <motion.p
          className="pb-8 text-lg tracking-wide font-semibold md:pb-12 sm:text-lg md:text-xl md:tracking-wide"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Mentoons Mythos isn't just about reports; it's a thriving community of
          individuals seeking purpose, clarity, and cosmic guidance. Whether
          you're exploring astrology, psychology, or career growth, our groups
          help you connect with like-minded people who share your journey.
        </motion.p>
      </motion.div>
      <motion.div
        className="relative w-[95%] sm:w-[500px] md:w-[600px] mx-auto h-[220px] sm:h-[200px]  md:h-[360px] pb-12 md:pb-24"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <ReactPlayer
          url="assets/about.mp4"
          className="absolute inset-0"
          width="100%"
          height="100%"
          controls
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
