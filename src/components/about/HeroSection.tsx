import { motion } from "framer-motion";
import ProblemFaced from "../home/problemFaced";
import { PROBLEMS_FACED_ASTROLOGY } from "../../constants";
import { PROBLEMS_FACED_PSYCHOLOGY } from "../../constants/problemsFaced";
// import ReactPlayer from "react-player";

const HeroSection = () => {
  return (
    <div className="bg-[url('/assets/background/section/stars_background.png')] bg-center md:pt-16  min-h-screen grid grid-cols-2 gap-28 px-20">
      <motion.div
        className=" pr-10 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 "
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ABOUT MENTOONS MYTHOS
        </motion.h1>
        {/* <motion.p
          className="pb-8 text-lg tracking-wide font-semibold md:pb-12 sm:text-lg md:text-xl md:tracking-wide"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Mentoons Mythos isn't just about reports; it's a thriving community of
          individuals seeking purpose, clarity, and cosmic guidance. Whether
          you're exploring astrology, psychology, or career growth, our groups
          help you connect with like-minded people who share your journey.
        </motion.p> */}
        <div className="space-y-5 text-lg md:text-xl">
          <motion.p
            className="  tracking-wide  md:tracking-wide leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            MentoonS Mythos is an initiative that explores the connection
            between mythology, human psychology, and storytelling.
          </motion.p>
          <motion.p
            className=" tracking-wide  md:tracking-wide leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our mission is to help people rediscover the wisdom hidden inside
            ancient myths and apply it to modern life.
          </motion.p>
          <motion.p
            className=" tracking-wide md:tracking-wide leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Through workshops, storytelling, and creative experiences, we aim to
            make mythology accessible, meaningful, and transformative.
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className=""
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col gap-5">
          <div>
            <ProblemFaced text="DAILY LIFE" data={PROBLEMS_FACED_ASTROLOGY} />
          </div>
          <div>
            <ProblemFaced text="CAREER" data={PROBLEMS_FACED_PSYCHOLOGY} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
