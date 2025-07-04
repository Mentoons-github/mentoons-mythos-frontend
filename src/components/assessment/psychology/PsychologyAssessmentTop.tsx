import { motion } from "framer-motion";

const PsychologyAssessmentTop = () => {
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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={staggerContainer}
      className="relative p-4 md:p-8 lg:p-15 lg:px-20 space-y-4 md:space-y-10 bg-black bg-[url('/assets/background/section/stars_background.png')]"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-start text-[#E39712] text-xl md:text-2xl lg:text-3xl tracking-wider font-semibold font-montserrat max-w-2xl"
      >
        PSYCHOLOGICAL ASSESSMENTS
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="max-w-2xl lg:max-w-md xl:max-w-2xl text-[#FBF9F9] text-base md:text-md lg:text-lg font-mulish leading-6 md:leading-7"
      >
        Gain deeper insight into your thought patterns, behavioral traits,
        strengths, emotional intelligence, and decision-making abilities. Our
        expert-designed psychological assessments are rooted in scientific
        frameworks and personalized for clarity, self-awareness, and career/life
        alignment.
      </motion.p>

      <motion.span
        variants={fadeInUp}
        className="text-[#E39712] text-base md:text-lg font-bold font-mulish mt-10"
      >
        The celestial deities speak. Are you ready to listen?
      </motion.span>

      <motion.img
        variants={floatImage}
        src="/assets/assessments/psychology.png"
        alt="moon"
        className="hidden md:block absolute md:top-3/7 lg:top-4 right-5 lg:right-24 w-34 lg:w-64 xl:w-80"
      />
    </motion.div>
  );
};

export default PsychologyAssessmentTop;
