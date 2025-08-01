import { motion } from "framer-motion";
import { INTELLIGENCE } from "../../../constants/intelligence";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

const Tests = ({userId}:{userId?:string}) => {
  const navigate = useNavigate();
  const handleStart = (name:string) => {
    if(!userId) {
      toast.warning("Please Loagin continue Assessment test")
      return
    }
    navigate(`${name}`)
  } 
  return (
    <motion.div
      className=" md:py-16 py-2 px-2  md:px-12 bg-[#FEEBD5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    
    >
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center text-[#2E2E2E] mb-12 leading-tight tracking-wider"
        variants={fadeInUp}
      >
        Got Stuck In Your Career? Find <br className="hidden md:block" /> Out
        The Right Path For You
      </motion.h1>

      <motion.div className="grid grid-cols-2  md:grid-cols-3 gap-2 md:gap-12 ">
        {INTELLIGENCE.map((data, ind) => (
          <motion.div
            key={ind}
            className="bg-white shadow-xl flex flex-col justify-between rounded-xl p-2 md:p-8 space-y-4 transition-transform duration-300 hover:scale-[1.01] md:min-h-[580px]"
            variants={containerVariants}
          >
            <motion.div className="space-y-2 sm:space-y-5">
              <motion.div
                className="flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: data.color }}
              >
                <motion.img
                  variants={floatImage}
                  src={data.imageUrl}
                  alt="career"
                  className="w-36 h-36  sm:w-78 sm:h-78 object-cover rounded-lg"
                />
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="md:text-2xl font-bold tracking-wider flex gap-2"
              >
                {data.name} <span className="hidden sm:block">Intelligence</span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="md:text-lg ">
                🕒 <span className="font-semibold">Time:</span> Approximately 10
                minutes
              </motion.p>

              <motion.p variants={fadeInUp} className="md:text-lg ">
                🎯 <span className="font-semibold">Ages:</span> 20+
              </motion.p>
            </motion.div>

            <div className="sm:flex justify-end">
              <motion.button
                onClick={() => handleStart(data.name) }
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

export default Tests;
