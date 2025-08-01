import { motion } from "framer-motion";
import { CAREER_STUCK } from "../../../constants/assessment";

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

const StuckCareer = () => {
  return (
    <motion.div
      className="px-6 md:py-16 md:px-48 bg-[#FEEBD5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center text-[#2E2E2E] mb-12 leading-tight tracking-wider"
        variants={fadeInUp}
      >
        Got Stuck In Your Career? Find <br className="hidden md:block"/> Out The Right Path For You
      </motion.h1>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-36">
        {CAREER_STUCK.map((data, ind) => (
          <motion.div
            key={ind}
            className="bg-white shadow-xl flex flex-col justify-between rounded-xl p-8 space-y-6 transition-transform duration-300 hover:scale-[1.01] min-h-[580px]"
            variants={containerVariants}
          >
            <motion.div className="space-y-5">
              <motion.div
                className="flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: data.bg }}
              >
                <motion.img
                  variants={floatImage}
                  src={data.image}
                  alt="career"
                  className="w-78 h-78 object-cover rounded-lg"
                />
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-2xl font-bold tracking-wider"
              >
                {data.title}
              </motion.h2>

              <motion.ul className="list-disc pl-4 text-lg space-y-1 tracking-wide gap-2">
                {data.description.map((val, num) => (
                  <motion.li variants={fadeInUp} key={num}>
                    {val}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p variants={fadeInUp} className="text-lg ">
                🕒 <span className="font-semibold">Time:</span> Approximately{" "}
                {data.time} minutes
              </motion.p>

              <motion.p variants={fadeInUp} className="text-lg ">
                🎯 <span className="font-semibold">Ages:</span> {data.age}+
              </motion.p>
            </motion.div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EC9600] px-6 py-2 rounded-2xl text-white font-semibold text-lg"
              >
                START TEST
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StuckCareer;
