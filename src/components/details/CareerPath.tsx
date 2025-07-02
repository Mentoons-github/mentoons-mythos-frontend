import { motion } from "framer-motion";
import { CAREE_PATHS } from "../../constants/details";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CareerPath = () => {
  return (
    <section className="py-5 md:py-14 px-2 bg-white">
      <div className=" flex items-center justify-center">
        <motion.h1
        className="text-2xl md:text-3xl w-60 md:w-full font-semibold text-center text-[#343C4B] mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        IDEAL CAREER PATHS FOR YOU
      </motion.h1>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 md:px-20"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {CAREE_PATHS.map((val, ind) => (
          <motion.div
            key={ind}
            className="md:p-5 flex flex-col items-center justify-center md:text-center"
            initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, amount: 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ind * 0.1 }}
                
          >
            <img
              src={val.image}
              alt={`career-${ind}`}
              className="w-52 h-52 md:h-72 md:w-72 mx-auto md:mb-4 object-contain"
            />
            <p className="text-[#343C4B] font-medium md:text-xl w-32 md:w-52 ">
              {val.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CareerPath;
