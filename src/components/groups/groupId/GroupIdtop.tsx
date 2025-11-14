import { motion } from "framer-motion";
import { Intelligence, Sunshine } from "../../../types/interface";

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

const GroupIdtop = ({
  details,
  isIntelligence,
}: {
  details: Sunshine | Intelligence ;
  isIntelligence: boolean;
}) => {
  if (!details) {
    return (
      <div className="px-10 py-20 text-center text-red-500 font-semibold">
        Group details not found.
      </div>
    );
  }

  return (
    <motion.div
      className="px-6 md:px-20 py-10 flex flex-col lg:flex-row items-center justify-around gap-10 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div className="space-y-4 max-w-xl" variants={containerVariants}>
        <motion.div className="space-y-2">
          {!isIntelligence ? (
            <motion.h1
              className="text-4xl md:text-7xl font-bold "
              variants={fadeInUp}
            >
              {(details as Sunshine).rashi}
            </motion.h1>
          ) : (
            <motion.h1
              className="text-4xl md:text-5xl font-bold "
              variants={fadeInUp}
            >
              Welcome, 
            </motion.h1>
          )}
          <motion.h3
            className="text-xl md:text-3xl font-semibold text-red-600"
            variants={fadeInUp}
          >
            The {details.name} {isIntelligence && "Intelligence"} Group
          </motion.h3>
        </motion.div>
        <motion.p
          className="md:text-lg font-semibold leading-relaxed"
          variants={fadeInUp}
        >
          {details.description}
        </motion.p>
      </motion.div>

      <motion.div>
        <motion.img
          src={details.imageUrl}
          alt={details.name}
          className="w-[350px] h-auto object-contain"
          variants={floatImage}
        />
      </motion.div>
    </motion.div>
  );
};

export default GroupIdtop;
