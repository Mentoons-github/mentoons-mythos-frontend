import { motion } from "framer-motion";

const LogicalMathmatical = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
    <div className="bg-[#FEEBD5] flex justify-between items-center md:px-28 py-10 gap-10 flex-wrap">
      <motion.div
        className="bg-[#FEE898] mx-4 px-10 max-w-md py-7 space-y-7 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <motion.h1 className="text-3xl font-semibold" variants={fadeInUp}>
          Logical-Mathematical Intelligence
        </motion.h1>
        <motion.p variants={fadeInUp}>
          You’re good with numbers and confident taking on tasks that involve
          quantifying things, such as math and arithmetic questions
        </motion.p>
        <motion.p variants={fadeInUp}>
          Great careers for people with logical-mathematical intelligence
          include mathematician, economist, auditor, accountant, scientist,
          tactician, computer analyst and technician
        </motion.p>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-[#EC9600] rounded-xl text-xl text-white font-semibold"
        >
          Take Test
        </motion.button>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={floatImage}
      >
        <motion.img
          src="/assets/assessments/psychology2.png"
          alt="climbing mountain"
          className="w-[650px] rounded-xl"
        />
      </motion.div>
    </div>
  );
};

export default LogicalMathmatical;
