import { motion } from "framer-motion";

const MakeCall = () => {
  return (
    <section className="bg-black px-4 py-3 md:px-40">
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.img
          className="w-full md:w-[400px]"
          src="assets/details/mythos_logo.png"
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
          className=" md:text-left space-y-6 text-white md:ml-10"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold max-w-2xl leading-snug "
          >
            Get a Personalized Session With Top Psychologists & Mentors
          </motion.h1>
          <p>Not sure about your current career path?</p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-md max-w-md"
          >
            Our assessments combine Howard Gardner’s Multiple Intelligence
            Theory helping you understand how your body intelligence aligns with
            your planetary blueprint
          </motion.p>
          <motion.button
            className="bg-[#E39712] hover:bg-[#E39030] px-6 py-2 rounded text-white flex items-center justify-center transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK A CALL
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MakeCall;
