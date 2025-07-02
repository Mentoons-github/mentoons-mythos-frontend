import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useInView from "../../hooks/useInView";

const FunFacts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref: sectionRef, isInView } = useInView(0.3, false);

  const cosmicFacts = [
    {
      title: "RAHU – ONLY HEAD NO BODY",
      description:
        "Did you know Rahu is the severed head of the asura Swarbhanu who drank Amrit during the Samudra Manthan? Rahu has no body — it represents insatiable desires, illusions, and tech-savvy genius.",
      image: "/assets/gods/image 32.png",
      format: "paragraph",
    },
    {
      title: "KETU – ONLY BODY NO HEAD",
      description: [
        "Ketu is the detached body of Rahu, symbolizing moksha (spiritual liberation).",
        "People influenced by Ketu often experience sudden insights, deja vu, or psychic moments.",
        "In Vedic lore, Ketu can bring mystical gifts — but only after taking away the ego.",
      ],
      image: "/assets/gods/image 33.png",
      format: "list",
    },
    {
      title: "SHANI DEV – THE SLOW-MOTION KARMA MASTER",
      description:
        "Shani (Saturn) takes 30 years to complete one cycle through the zodiac — the slowest of all. Shani Dev was abandoned by Surya (Sun God) due to his dark complexion and later became the ultimate judge of karma.",
      image: "/assets/gods/image 34.png",
      format: "paragraph",
    },
    {
      title: "SURYA – THE SUN GOD RIDES A 7-HORSE CHARIOT",
      description:
        "Surya rides a golden chariot pulled by seven horses, symbolizing the seven colors of the rainbow or seven days of the week. His charioteer is Aruna, the brother of Garuda, and the chariot never stops — even at night!",
      image: "/assets/gods/image 40.png",
      format: "paragraph",
    },
    {
      title: "CHANDRA'S 27 WIVES?",
      description:
        "The Moon god Chandra married the 27 daughters of Daksha, each representing a Nakshatra (lunar mansion). But he loved Rohini the most, which made her the brightest — and angered her sisters!",
      image: "/assets/gods/image 41.png",
      format: "paragraph",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === cosmicFacts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? cosmicFacts.length - 1 : prev - 1));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        when: "afterChildren",
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/background/section/stars_background.png"
        alt="Stars Background"
      />
      <div className="relative px-4 md:px-8 lg:px-16 mt-20">
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-forum text-[#E39712] tracking-widest leading-tight max-w-full lg:max-w-3xl"
          variants={slideTextVariants}
        >
          COSMIC CURIOSITIES: FUN FACTS FROM INDIAN ASTROLOGY & MYTHOLOGY
        </motion.h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="w-full md:w-1/2 lg:w-3/5 mb-8 md:mb-0 pr-0 md:pr-4 lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + "-content"}
                variants={fadeVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                transition={{ duration: 0.5 }}
                className="p-2 md:p-4 space-y-4 md:space-y-6"
              >
                <motion.h3
                  variants={slideTextVariants}
                  className="font-montserrat text-xl md:text-2xl lg:text-3xl tracking-widest font-semibold text-white max-w-xl"
                >
                  {cosmicFacts[currentSlide].title}
                </motion.h3>
                {cosmicFacts[currentSlide].format === "paragraph" ? (
                  <motion.p
                    variants={slideTextVariants}
                    className="text-base md:text-lg lg:text-xl text-[#C3BEB6] mt-4 max-w-lg"
                  >
                    {cosmicFacts[currentSlide].description}
                  </motion.p>
                ) : (
                  <motion.ul
                    variants={slideTextVariants}
                    className="text-base md:text-lg lg:text-xl text-[#C3BEB6] mt-4 pl-4 md:pl-6 space-y-2 md:space-y-3"
                  >
                    {(cosmicFacts[currentSlide].description as string[]).map(
                      (item: string, index: number) => (
                        <motion.li
                          key={index}
                          variants={slideTextVariants}
                          className="list-disc ml-2"
                        >
                          {item}
                        </motion.li>
                      )
                    )}
                  </motion.ul>
                )}
                <div className="flex items-center justify-start mt-6 md:mt-8 space-x-4 md:hidden">
                  <motion.div
                    className="w-10 h-10 rounded-full flex justify-center items-center bg-[#CA9D75] cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "#E39712" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                  >
                    <FaChevronLeft className="text-lg text-[#3D3D3D]" />
                  </motion.div>
                  <motion.div
                    className="w-10 h-10 rounded-full flex justify-center items-center bg-[#CA9D75] cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "#E39712" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                  >
                    <FaChevronRight className="text-lg text-[#3D3D3D]" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-end items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + "-image"}
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                className="flex justify-center items-center"
              >
                <img
                  src={cosmicFacts[currentSlide].image}
                  className="max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-contain"
                  alt={cosmicFacts[currentSlide].title}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden z-20">
          {cosmicFacts.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-[#E39712]" : "bg-[#C3BEB6]"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <div className="hidden md:flex absolute right-8 lg:right-16 top-1/2 transform -translate-y-1/2 gap-4 z-20">
          <motion.div
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex justify-center items-center bg-[#CA9D75] cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: "#E39712" }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
          >
            <FaChevronRight className="text-xl text-[#3D3D3D]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FunFacts;
