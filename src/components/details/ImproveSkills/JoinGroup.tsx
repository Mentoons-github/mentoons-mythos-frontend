import { motion } from "framer-motion";

const JoinGroup = () => {
  return (
    <section className="bg-white py-3 px-4 md:px-20">
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.img
          className="w-full md:w-[500px]"
          src="assets/details/details5.png"
          alt="Join Group"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className=" md:text-left space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold text-[#1A1D3B] leading-snug"
          >
            Join The Sports Intelligence Group and Contribute To The
            Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#343C4B] text-md max-w-md"
          >
            Mentoons Mythos isn’t just about reports; it’s a thriving community
            of individuals seeking purpose, clarity, and cosmic guidance.
          </motion.p>
          <motion.button
            className="bg-[#1A1D3B] hover:bg-[#131530] px-6 py-2 rounded text-white flex items-center justify-center transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#E39712] mr-3">✦</span> JOIN NOW
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default JoinGroup;
