import { motion } from "framer-motion";

const CreateGroupSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 bg-white bg-[url('/assets/background/section/stars_background.png')] bg-center bg-cover bg-no-repeat py-10 px-10 sm:px-0">

      <motion.div
        className="flex justify-center flex-1 ml-7 md:ml-0"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <img
          src="/assets/groups/Jupiter.png"
          alt="Group Planet"
          className="w-72 sm:w-80 md:w-[450px] object-contain"
        />
      </motion.div>

      <motion.div
        className="flex flex-col flex-1 items-start justify-center -ml-5 md:ml-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.h1
        style={{ letterSpacing: "4px" }}
          className="text-3xl sm:text-4xl font-semibold w-[300px] text-[#E39712] pt-4 md:pt-10 pb-6 md:pb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          CREATE YOUR OWN GROUP
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-black pb-8 max-w-full sm:max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco labo
        </motion.p>

        <motion.button
          className="flex items-center justify-center gap-3 px-5 py-3 text-base sm:text-lg rounded text-black bg-[#E39712] hover:bg-[#cc810e] transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <span className="text-[#936D42] text-xl">✦ </span>
          SUBMIT FOR APPROVAL
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CreateGroupSection;
