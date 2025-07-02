import { MYTHOS_PODCASTS } from "../../../constants";
import { FaBars, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";

const ExplorePodcast = () => {
  return (
    <motion.div
      className="p-6 flex flex-col bg-[#FEE898] md:w-[490px] rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex justify-between items-center w-full mb-4"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold font-mulish text-[#1A1D3B] w-3/4">
          Explore Podcasts For You
        </h1>
        <img
          src="/assets/background/blogs/Frame 9.png"
          className="w-12 h-12"
          alt="Podcast Icon"
        />
      </motion.div>

      <div className="space-y-2 w-full mt-5">
        {MYTHOS_PODCASTS.map((data, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 flex justify-center items-center rounded-full border border-black bg-transparent text-[#333333] hover:bg-white transition">
                <FaPlay className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-bold text-[#333333] tracking-wider font-roboto">
                {data.title}
              </h2>
            </div>
            <button className="w-8 h-8 flex justify-center items-center">
              <FaBars className="w-6 h-6 text-gray-700" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExplorePodcast;
