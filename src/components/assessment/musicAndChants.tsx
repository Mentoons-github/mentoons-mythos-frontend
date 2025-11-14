import { FaPlay } from "react-icons/fa";
import MythosButton from "../home/button";
import useInView from "../../hooks/useInView";
import { motion } from "framer-motion";

const MusicAndChants = () => {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const { ref: titleRef, isInView: isTitleInView } = useInView(0.1);
  const { ref: musicPlayerRef, isInView: isMusicPlayerInView } = useInView(0.1);
  const { ref: cardsRef, isInView: isCardsInView } = useInView(0.1);
  const { ref: buttonRef, isInView: isButtonInView } = useInView(0.1);

  const relaxingItems = [
    {
      image: "/assets/assessments/musicChants/pexels-nandhukumar-795622.jpg",
      tag: "NEW FOR YOU",
      tagColor: "text-green-400",
      title: "Forest Whisper",
      description: "Gentle rustling leaves and birdsong from deep woods.",
    },
    {
      image:
        "/assets/assessments/musicChants/photorealistic-view-tree-nature-with-branches-trunk_23-2151478106.jpg",
      tag: "JUST ADDED",
      tagColor: "text-blue-400",
      title: "Monsoon Calm",
      description: "A relaxing rain soundscape to ease your thoughts.",
    },
    {
      image: "/assets/assessments/musicChants/peakpx.jpg",
      tag: "FEEL THE PEACE",
      tagColor: "text-purple-400",
      title: "Zen Vibes",
      description: "Soft ambient tones for deep meditation or sleep.",
    },
    {
      image:
        "/assets/assessments/musicChants/jordan-cormack-5z950ThZlsM-unsplash.jpg",
      tag: "SOOTHING PICK",
      tagColor: "text-cyan-400",
      title: "Sea Breeze",
      description: "Gentle waves and sea wind for mental clarity.",
    },
    {
      image:
        "/assets/assessments/musicChants/jared-rice-NTyBbu66_SI-unsplash.jpg",
      tag: "SPIRITUAL TONE",
      tagColor: "text-yellow-400",
      title: "Temple Bells",
      description: "Echoes from the hills — calm, sacred, timeless.",
    },
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
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const musicPlayerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  const notesVariants = {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="relative p-4 sm:p-6 md:p-8 lg:p-10 lg:px-20 bg-[#332F5A] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10"
        variants={notesVariants}
      >
        <img
          src="/assets/assessments/musicChants/Musical notes.png"
          alt="music"
          className="w-20 sm:w-28 md:w-32 lg:w-40"
        />
      </motion.div>

      <motion.h1
        ref={titleRef}
        className="text-start text-[#FEE898] text-2xl sm:text-3xl md:text-4xl font-montserrat tracking-widest font-bold"
        variants={titleVariants}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
      >
        Music & Chants <br />
        <span className="text-xl sm:text-2xl md:text-3xl">
          Soothe Your Soul with Sacred Sounds
        </span>
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-5 mt-8 md:mt-12 lg:mt-15">
        <motion.div
          ref={musicPlayerRef}
          className="hidden md:block md:w-1/4 lg:w-1/3 mb-4 md:mb-0"
          variants={musicPlayerVariants}
          initial="hidden"
          animate={isMusicPlayerInView ? "visible" : "hidden"}
        >
          <img
            src="/assets/assessments/musicChants/Frame 12.png"
            alt="music-player"
            className="w-full"
          />
        </motion.div>

        <div className="p-2 md:p-3 w-full md:w-3/4 lg:w-4/5">
          <motion.h5
            className="font-inter font-semibold text-md text-white mb-2 md:mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardsInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Meditation Music
          </motion.h5>

          <motion.div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-7"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isCardsInView ? "visible" : "hidden"}
          >
            {relaxingItems.slice(0, 4).map((data, index) => (
              <motion.div
                className="relative w-full bg-black/70 overflow-hidden rounded-sm"
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.button
                  className="absolute top-1/2 translate-y-8 right-0 -translate-x-4 cursor-pointer w-8 h-8 sm:w-10 sm:h-10 bg-white flex justify-center items-center rounded-full"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#FEE898",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="text-sm sm:text-base" />
                </motion.button>

                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-36 sm:h-40 md:h-45 object-cover"
                />
                <div className="p-2 sm:p-3">
                  <h3 className={`text-[10px] mt-2 sm:mt-4 ${data.tagColor}`}>
                    {data.tag}
                  </h3>
                  <h1 className="text-base sm:text-lg text-white">
                    {data.title}
                  </h1>
                  <p className="text-gray-300 text-[10px] sm:text-[11px] truncate">
                    {data.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={buttonRef}
        className="flex justify-center md:justify-end items-end mt-6 md:mt-4"
        variants={buttonVariants}
        initial="hidden"
        animate={isButtonInView ? "visible" : "hidden"}
      >
        <MythosButton label="EXPLORE NOW"  />
      </motion.div>
    </motion.div>
  );
};

export default MusicAndChants;
