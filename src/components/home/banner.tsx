import { motion } from "framer-motion";
import MythosButton from "./button";

const MythosBanner = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center py-6 sm:py-8 md:py-10 bg-[url('/assets/banner/Section.png')] bg-cover bg-center bg-no-repeat mulish px-3 sm:px-4 md:px-5 overflow-hidden">
      <div className="relative space-y-3 sm:space-y-4 md:space-y-5 p-3 sm:p-4 md:p-5 text-center flex flex-col justify-start items-start w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#E39712] font-semibold break-words w-[550px] text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] tracking-[1.5px] sm:tracking-[2.9px] font-montserrat"
        >
          LET THE PLANETS GUIDE YOUR CAREER
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-semibold text-left text-base sm:text-lg md:text-xl lg:text-2xl w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-[45%] text-black font-mulish"
        >
          Feeling stuck in life? Let your birth sign find solutions to all your
          problems
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10"
        >
          <MythosButton label="FIND YOUR PATH" bg="#FEE898" />
        </motion.div>
      </div>
    </section>
  );
};

export default MythosBanner;
