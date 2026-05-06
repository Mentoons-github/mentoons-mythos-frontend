import { motion } from "framer-motion";
import ProblemFaced from "../home/problemFaced";
import { PROBLEMS_FACED_ASTROLOGY } from "../../constants";
import { PROBLEMS_FACED_PSYCHOLOGY } from "../../constants/problemsFaced";
// import ReactPlayer from "react-player";

const HeroSection = () => {
  return (
    <div className="bg-[url('/assets/background/section/stars_background.png')] bg-center pt-5 lg:pt-16 lg:grid grid-cols-2 gap-28 px-4 md:px-10 lg:px-20  space-y-10 lg:space-y-0">
      <motion.div
        className=" lg:pr-10 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-2xl md:text-4xl font-semibold mb-5 lg:mb-10 "
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
        <div className="space-y-3 md:space-y-5 text-lg md:text-xl">
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

          <motion.div className="lg:flex justify-between hidden">
            {/* Left image → from LEFT */}
            <motion.img
              src="assets/about/handprints2.png"
              className="h-40"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />

            {/* Middle image → from TOP */}
            <motion.img
              src="assets/about/flowers.png"
              className="h-40"
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />

            {/* Right image → from RIGHT */}
            <motion.img
              src="assets/about/handprints.png"
              className="h-40"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </motion.div>
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
