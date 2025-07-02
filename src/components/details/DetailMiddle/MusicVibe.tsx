import { motion } from "framer-motion";
import { MUSIC_VIBE } from "../../../constants/details";
import { CgMusicNote } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";

const MusicVibe = () => {
  return (
    <motion.div
      className="p-6 flex flex-col bg-white md:w-[520px] rounded-lg shadow-md"
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1D3B] ">
          Music That Suite Your Vibe!
        </h1>
      </motion.div>

      <div className="space-y-2 w-full mt-5">
        {MUSIC_VIBE.map((data, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                src={data.image}
                alt={data.name}
                className="w-16 h-16 rounded-md"
              />
              <h2 className="text-sm font-bold text-[#333333] tracking-wider font-roboto">
                {data.name}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center border-2 rounded-md py-1 px-2 border-[#FFD7C2]">
                <CgMusicNote />
                <p className="font-medium">{data.listeners}</p>
              </div>
              <div className="border-2 rounded-md p-1 border-[#FFD7C2]">
                <FaHeart className="text-[#4FA82C]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MusicVibe;
