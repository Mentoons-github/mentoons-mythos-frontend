import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SUNSHINE } from "../../constants";
import { Intelligence, Sunshine } from "../../types/interface";

const GroupsSunshineCardSection = ({props}:{props:Sunshine[] | Intelligence[]}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? props : props?.slice(0, 6);

  return (
    <div className={`bg-black px-4 py-16 ${props.length < 10 && 'pt-0'} md:px-6`}>
      <div>
        <motion.h2
          className="text-2xl md:text-5xl font-semibold text-start text-[#e39712] mb-8 md:mb-16  md:px-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
         Groups For {props.length > 10 ? "Rashis" : "Intelligence"}
        </motion.h2>

        <motion.div
          className="grid gap-2 md:gap-8 grid-cols-2 md:grid-cols-3 md:w-[85%] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          whileInView={{ opacity: 1 }}
        >
          {visibleItems?.map((item, index) => (
            <Link to={`/groups/${item.id}`} key={item.id}>
              <motion.div
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[320px] md:min-h-[450px] h-auto w-full py-2`}
                style={{ backgroundColor: item.color }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, amount: 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-full transform -skew-x-12 bg-gradient-to-bl from-yellow-200/30 to-transparent"
                  initial={{ opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
                <motion.div
                  className="flex items-center justify-center md:mt-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-contain w-48 h-48 md:w-64 md:h-64 transition-transform duration-300 transform group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  className="flex items-start justify-start gap-1 md:gap-2 md:p-8 mt-3 md:mt-0"
                  initial={{ y: 20, opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className="flex-shrink-0 mt-1 md:mt-2"
                    initial={{ rotate: -10, opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <img
                      src={item.zodiacSign}
                      alt={`${item.name} symbol`}
                      className="object-contain w-full h-full opacity-90"
                    />
                  </motion.div>

                  <div className="flex flex-col gap-1">
                    <motion.h3
                      className="text-xl md:text-3xl font-bold text-white"
                      initial={{ x: -20, opacity: 0 }}
                      viewport={{ once: true }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      {item.name}
                    </motion.h3>
                    <motion.p
                      className="md:text-lg text-white/90 line-clamp-2"
                      initial={{ opacity: 0 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full opacity-75"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* See More Button */}
        {SUNSHINE.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#e39712] hover:bg-[#d1870f] text-black font-semibold py-2 px-6 rounded-full transition-colors duration-300"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsSunshineCardSection;
