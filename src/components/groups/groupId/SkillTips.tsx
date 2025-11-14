import { motion } from "framer-motion";
import { SKILL_VIDEOS } from "../../../constants/details";

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

const SkillTips = () => {
  return (
    <motion.section
      className="md:border border-primary md:mt-24 rounded-lg md:px-20 md:mx-auto py-10  md:text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-xl md:text-3xl font-bold ml-5 max-w-sm"
        variants={fadeInUp}
      >
        Improve Your Skills With These Tips
      </motion.h1>

      <div className="grid grid-cols-1  gap-5 mt-5 md:mt-10 ">
        {SKILL_VIDEOS.slice(0, 2).map((data, ind) => (
          <motion.div
            key={ind}
            className=" rounded-lg p-4 md:w-96"
           variants={fadeInUp}
          >
            <div>
              <motion.img
              src={data.video}
              alt={`tip-${ind}`}
              className="w-full h-56 object-cover rounded"
              variants={floatImage}
            />
            </div>
            <motion.p
              className="mt-2 md:mt-4 text-lg font-medium"
              variants={fadeInUp}
            >
              {data.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SkillTips;
