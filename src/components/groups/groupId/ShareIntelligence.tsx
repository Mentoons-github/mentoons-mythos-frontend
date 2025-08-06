import { motion } from "framer-motion";
import MythosButton from "../../home/button";
import ShareOption from "../../modal/BlogModal/ShareOption";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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
};

const ShareIntelligence = ({
  name,
  isIntelligence,
  groupId,
}: {
  name: string | undefined;
  isIntelligence: boolean;
  groupId: string | undefined;
}) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  console.log(showShareOptions, "optionsss");
  return (
    <motion.div
      className="flex flex-col relative md:flex-row items-center justify-between gap-10 px-6 md:px-32 py-14 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col gap-5 max-w-xl "
        variants={containerVariants}
      >
        <motion.h1
          className="text-xl md:text-4xl font-bold leading-snug"
          variants={fadeInUp}
        >
          Share The {name?.toUpperCase()} {isIntelligence && "Intelligence"}{" "}
          Group With Your Friends & Families!
        </motion.h1>
        <motion.p className="text-lg leading-relaxed" variants={fadeInUp}>
          Mentoons Mythos isn’t just about reports; it’s a thriving community of
          individuals seeking purpose, clarity, and cosmic guidance.
        </motion.p>
        <div className="relative">
          <MythosButton
            label="SHARE"
            bg="black"
            textClr="white"
            onClick={() => setShowShareOptions(!showShareOptions)}
          />
          {showShareOptions && (
        <ShareOption
          blogUrl={`${window.location.origin}/groups/${groupId}`}
          onClose={() => setShowShareOptions(false)}
        />
      )}
        </div>
      </motion.div>

      {/* Image */}
      <motion.img
        src="/assets/groups/share.png"
        alt="Share Group"
        className="w-52 sm:w-64 md:w-72 object-contain"
        variants={floatImage}
      />
      
    </motion.div>
  );
};

export default ShareIntelligence;
