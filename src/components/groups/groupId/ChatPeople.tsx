import { motion } from "framer-motion";
import { CHAT_PEOPLE } from "../../../constants/sunshine";
import MythosButton from "../../home/button";

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

const ChatPeople = () => {
  return (
    <motion.div
      className="px-6 py-10 md:px-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div
        className="text-center mb-10"
        variants={fadeInUp}
      >
        <motion.h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-[#1A1D3B] max-w-xl mx-auto" variants={fadeInUp}>
          CHAT WITH PEOPLE HAVING THE SAME RASHI AS YOU!
        </motion.h1>
      </motion.div>

      <motion.div className="md:space-y-6 grid grid-cols-1 md:grid-cols-3" variants={fadeInUp}>
        {CHAT_PEOPLE.map((data, ind) => (
          <motion.div
            key={ind}
            className="flex items-start gap-4 p-4 "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: ind * 0.2 }}
          >
            <motion.img
              src={data.profile}
              alt={data.name}
              className="w-12 h-12 rounded-full object-cover"
              variants={floatImage}
            />
            <div className="max-w-[220px] md:max-w-full">
              <motion.h3
                className="text-lg font-semibold text-[#1A1D3B]"
                variants={fadeInUp}
              >
                {data.name}
              </motion.h3>
              <motion.p
                className="text-sm text-gray-600 truncate"
                variants={fadeInUp}
              >
                {data.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <div className="mt-10 flex justify-center">
        <MythosButton label="START CHATTING" bg="black" textClr="white" />
      </div>
    </motion.div>
  );
};

export default ChatPeople;
