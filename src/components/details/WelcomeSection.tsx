import { motion } from "framer-motion";

const WelcomeSection = () => {
  return (
    <motion.div
      className="bg-black flex flex-col md:flex-row justify-between items-center pt-10 px-4 md:px-32 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-4 md:text-left"
      >
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl text-[#E39712] hidden md:block"
        >
          KNOW WHAT TYPE OF INTELLIGANCE YOU ARE!
        </motion.h3>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-3xl md:text-5xl text-white font-semibold"
        >
          Welcome, Nupur
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-[#4FA82C] text-xl md:text-3xl font-semibold"
        >
          You Belong To Sports Intelligence
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-white max-w-xl font-semibold md:text-lg mt-5"
        >
          Virgos are analytical thinkers. Their minds are constantly processing,
          categorizing, and refining. They seek perfection not for praise, but
          because they feel a spiritual calling to improve the world around them
          — whether that’s through work, service, health, or daily routines.
        </motion.p>
      </motion.div>

      <motion.img
        src="assets/details/details1.png"
        alt="Virgo Lady"
        className="w-FULL md:w-[400px] mt-4 md:mt-0"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default WelcomeSection;
