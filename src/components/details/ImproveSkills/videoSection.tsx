import { motion } from "framer-motion";
import { SKILL_VIDEOS } from "../../../constants/details";

const VideoSection = () => {
  return (
    <section className="py-10 md:py-14 bg-white">
      <motion.h1
        className="text-xl md:text-3xl font-bold ml-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Improve Your Skills With These Tips
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 md:mt-10">
        {SKILL_VIDEOS.map((data, ind) => (
          <motion.div
            key={ind}
            className=" rounded-lg p-4   "
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: ind * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={data.video}
              alt={`tip-${ind}`}
              className="w-full h-56 object-cover rounded"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            <p className="mt-2 md:mt-4 text-lg font-medium">{data.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
