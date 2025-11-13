import { motion } from "framer-motion";
import FAQ from "../components/about/FAQ";
import AstrologyAssessment from "../components/assessment/astrologyAssessment";
import FunFacts from "../components/assessment/funFacts";
import MusicAndChants from "../components/assessment/musicAndChants";
import WeAreHiring from "../components/assessment/weAreHiring";

const Assessment = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const floatImage = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const sectionVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="bg-[#1A1D3B]">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={staggerContainer}
        className="relative p-4 md:p-8 lg:p-15 lg:px-20 space-y-4 md:space-y-5 bg-black bg-[url('/assets/background/section/stars_background.png')]"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-start text-white text-xl md:text-2xl lg:text-3xl tracking-wider font-semibold font-montserrat max-w-2xl"
        >
          GRAHA-BASED ASTROLOGICAL ASSESSMENTS
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="max-w-2xl lg:max-w-md xl:max-w-2xl text-[#FBF9F9] text-base md:text-md lg:text-lg font-mulish leading-6 md:leading-7"
        >
          An immersive journey into your astrological DNA through the nine
          grahas (Navagrahas) of Indian astrology — decoded using both jyotish
          shastra and mythological insights. These assessments are designed to
          help you discover your karmic purpose, strengths, weaknesses, and
          ideal path.
        </motion.p>

        <motion.span
          variants={fadeInUp}
          className="text-[#E39712] text-base md:text-lg font-bold font-mulish"
        >
          The celestial deities speak. Are you ready to listen?
        </motion.span>

        <motion.img
          variants={floatImage}
          src="/assets/planets/AY.png"
          alt="moon"
          className="hidden md:block absolute md:top-3/7 lg:top-5 right-5 lg:right-20 w-34 lg:w-64 xl:w-80"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariant}
      >
        <AstrologyAssessment />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariant}
      >
        <FunFacts />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariant}
      >
        <MusicAndChants />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariant}
      >
        <WeAreHiring />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariant}
      >
        <FAQ />
      </motion.div>
    </div>
  );
};

export default Assessment;
