import { NavLink, useNavigate } from "react-router-dom";
import MythosButton from "../home/button";
import { motion } from "framer-motion";
import useInView from "../../hooks/useInView";

const WeAreHiring = () => {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const { ref: titleRef, isInView: isTitleInView } = useInView(0.1);
  const { ref: contentRef, isInView: isContentInView } = useInView(0.1);
  const { ref: astrologerRef, isInView: isAstrologerInView } = useInView(0.1);
  const { ref: psychologistRef, isInView: isPsychologistInView } =
    useInView(0.1);
    const navigate = useNavigate()

  const HiringTexts = [
    "Work with a growing community",
    "Conduct live sessions & consultations",
    "Get featured in premium workshops",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="relative px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 lg:py-15 bg-white flex flex-col justify-center items-start min-h-[500px] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        ref={astrologerRef}
        className="hidden xl:flex absolute top-0 right-100 flex-col justify-center items-center z-10"
        variants={imageVariants}
        initial="hidden"
        animate={isAstrologerInView ? "visible" : "hidden"}
      >
        <img
          src="/assets/assessments/weAreHiring/Astrology, tarot cards and crystal.png"
          alt="astrology"
          className="w-auto"
        />
        <NavLink
          to="/hiring"
          className="inline-block border-b-2 border-black pb-1 text-center text-base"
        >
          APPLY FOR ASTROLOGER
        </NavLink>
      </motion.div>

      <div className="absolute top-1/2 right-30 w-[500px] h-1 bg-black rotate-[120deg] hidden xl:block"></div>

      <motion.div
        ref={psychologistRef}
        className="hidden xl:flex absolute bottom-10 right-40 flex-col justify-center items-center gap-5 z-10"
        variants={imageVariants}
        initial="hidden"
        animate={isPsychologistInView ? "visible" : "hidden"}
      >
        <img
          src="/assets/assessments/weAreHiring/female psychologist sitting.png"
          alt="psychology"
          className="w-40"
        />
        <NavLink
          to="/hiring"
          className="inline-block border-b-2 border-black pb-1 text-center text-base"
        >
          APPLY FOR PSYCHOLOGIST
        </NavLink>
      </motion.div>

      <motion.h1
        ref={titleRef}
        className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#1A1D3B]"
        variants={titleVariants}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
      >
        WE ARE HIRING !!!
      </motion.h1>

      <motion.div
        ref={contentRef}
        variants={contentVariants}
        initial="hidden"
        animate={isContentInView ? "visible" : "hidden"}
        className="z-20"
      >
        <motion.p
          className="font-mulish max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl"
          variants={listItemVariants}
        >
          Are you a passionate{" "}
          <span className="text-[#1A1D3B] font-bold">Psychologist</span> or{" "}
          <span className="text-[#1A1D3B] font-bold">Astrologer</span> ready to
          guide others toward self-discovery? We're looking for talented
          professionals to be a part of Mentoons Mythos!
        </motion.p>

        <motion.ul className="space-y-4 sm:space-y-6 md:space-y-8 mt-4 sm:mt-5 font-mulish text-base sm:text-lg md:text-xl">
          {HiringTexts.map((text, index) => (
            <motion.li
              className="flex items-center gap-2 sm:gap-3 md:gap-4"
              key={index}
              variants={listItemVariants}
            >
              <span className="text-green-600 text-lg sm:text-xl">✅</span>
              {text}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="mt-6 sm:mt-7 md:mt-8" variants={buttonVariants}>
          <MythosButton label="APPLY NOW" bg="#1A1D3B" textClr="white" onClick={()=>navigate('/hiring')}/>
        </motion.div>
      </motion.div>

      <motion.div
        className="xl:hidden flex justify-between w-full mt-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <img
            src="/assets/assessments/weAreHiring/Astrology, tarot cards and crystal.png"
            alt="astrology"
            className="w-20 sm:w-24 md:w-28 lg:w-32"
          />
          <NavLink
            to="/"
            className="inline-block border-b-2 border-black pb-1 text-center text-xs sm:text-sm md:text-base mt-2"
          >
            APPLY FOR ASTROLOGER
          </NavLink>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <img
            src="/assets/assessments/weAreHiring/female psychologist sitting.png"
            alt="psychology"
            className="w-20 sm:w-24 md:w-28 lg:w-32"
          />
          <NavLink
            to="/"
            className="inline-block border-b-2 border-black pb-1 text-center text-xs sm:text-sm md:text-base mt-2"
          >
            APPLY FOR PSYCHOLOGIST
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WeAreHiring;
