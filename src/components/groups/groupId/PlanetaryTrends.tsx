import { motion } from "framer-motion";
import { BLOGS_FOR_PLANET } from "../../../constants/sunshine";

const PlaneteryTrends = () => {
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
  return (
      <motion.div
        className="space-y-5 md:space-y-10 px-3"
        initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
      >
        <motion.h1
          className="mt-4 text-xl text-center md:text-5xl font-bold text-[#FEE898]"
          variants={fadeInUp}
        >
          Planetary Trends in Aries
        </motion.h1>
        <div className="space-y-">
          {BLOGS_FOR_PLANET.map((post, ind) => (
            <motion.div
              key={ind}
              className="flex items-start gap-3 md:gap-5 py-3 "
              variants={fadeInUp}
            >
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-36 md:w-72 object-cover rounded-md"
                variants={floatImage}
              />
              <motion.div
                className="flex flex-col justify-between h-full md:gap-1"
                variants={fadeInUp}
              >
                <motion.p
                  className="text-sm text-gray-500 md:font-medium"
                  variants={fadeInUp}
                >
                  <span className="text-purple-700">{post.writere}</span> •{" "}
                  {post.date}
                </motion.p>

                <motion.h2
                  className="text-white md:text-lg font-semibold mt-1"
                  variants={fadeInUp}
                >
                  {post.title}
                </motion.h2>
                <motion.p
                  className="text-xs md:text-base text-white mt-1 line-clamp-3"
                  variants={fadeInUp}
                >
                  {post.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
  );
};

export default PlaneteryTrends;
