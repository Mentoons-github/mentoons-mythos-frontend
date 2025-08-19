import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const ContactUsP2 = () => {
  return (
    <div className="bg-black space-y-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="p-2 md:p-10 lg:p-20 bg-black bg-[url('/assets/background/section/stars_background.png')] py-10 flex flex-col justify-center items-center"
      >
        <motion.h1
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#E39712] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-widest md:text-center"
        >
          CONTACT US
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FBF9F9] md:text-center mt-4 md:mt-7 max-w-3xl md:px-2"
        >
          At Mentoons Mythos, we don’t just read the stars — we help you wear
          them, live them, and share your cosmic story. Whether you’re looking
          for a personalized birth chart, a mythological design, or a celestial
          collab, the universe brought you here for a reason. Let’s connect.
        </motion.p>
      </motion.div>
      <div className="flex items-center gap-5 p-10 bg-black">
        <div className="p-5 border border-2 border-[#E39712]/30p-4 rounded-xl focus:outline-none focus:border-[#E39712]">
          <h1 className="text-2xl text-[#E39712]">Reach out us</h1>
          <div className="flex items-center justify-center gap-5 mt-5">
            <FaEnvelope className="text-white" />
            <motion.a
              href="mailto:mentoonsmythos@gmail.com"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              mentoonsmythos@gmail.com
            </motion.a>
          </div>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
};

export default ContactUsP2;
