import useInView from "../../../hooks/useInView";
import Heading from "./heading";
import { motion } from "framer-motion";

const GroupsSuggested = () => {
  const { isInView, ref } = useInView(0.3, false);

  return (
    <motion.section
      ref={ref}
      className="px-4 lg:px-16 xl:px-24 py-10 flex flex-col items-start gap-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <Heading />
      </motion.div>

      <div className="flex flex-wrap justify-start items-center lg:items-start w-full gap-5 md:gap-2 xl:gap-10 mt-10">
        <motion.div
          className="flex flex-col justify-center gap-3 p-8 bg-yellow-500 rounded-xl shadow-md h-[480px] w-full md:w-full lg:w-[28%] min-w-[250px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-2xl md:text-center lg:text-start font-bold font-mulish">
            Astrologers
          </h1>
          <p className="text-sm md:text-xl lg:text-sm font-inter leading-relaxed">
            Astrologers study how celestial bodies influence human behavior,
            using birth charts to predict events and provide guidance.
          </p>
          <motion.img
            src="/assets/cards/suggestedGroups/Purple magic ball with cards and incense stick.png"
            alt="purple_ball"
            className="w-[275px] h-[304px] mx-auto object-contain mt-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.4, delay: 0.5 }}
          />
        </motion.div>
        <div className="flex flex-col justify-start gap-4 h-fit md:h-[480px] md:w-[50%] lg:w-[50%] xl:w-[40%] min-w-[250px] md:min-w-[350px]">
          {[
            {
              title: "Psychologists",
              description:
                "Psychologists specialize in the study of human behavior and mental processes, using scientific methods to understand and explain thoughts, emotions, and behaviors.",
              img: "/assets/cards/suggestedGroups/female psychologist sits and explains.png",
              bg: "#567AE5",
            },
          ].map((group, index) => (
            <motion.div
              key={index}
              className="flex items-start justify-between md:justify-start p-5 rounded-xl shadow-md flex-1"
              style={{ backgroundColor: group.bg }}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2 + index * 0.2,
              }}
            >
              <div className="w-auto sm:w-3/5">
                <h1 className="text-2xl font-bold font-mulish">
                  {group.title}
                </h1>
                <p className="text-md font-inter tracking-tight leading-relaxed h-fit w-auto sm:w-[90%] lg:w-[80%]">
                  {group.description}
                </p>
              </div>
              <motion.img
                src={group.img}
                alt={group.title.toLowerCase()}
                className="w-[120px] h-24 sm:h-[128px] lg:w-[150px] lg:h-[158px] xl:w-[178px] xl:h-[170px] object-contain flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GroupsSuggested;
