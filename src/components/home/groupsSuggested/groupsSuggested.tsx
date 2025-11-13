import { useNavigate } from "react-router-dom";
import useInView from "../../../hooks/useInView";
import MythosButton from "../button";
import { motion } from "framer-motion";

const cardData = [
  {
    title: "Psychologists",
    description:
      "Psychologists specialize in the study of human behavior and mental processes, using scientific methods to understand and explain thoughts, emotions, and behaviors.",
    img: "/assets/cards/suggestedGroups/Psychologist.png",
    bg: "#567AE5",
  },
  {
    title: "Astrologers",
    description:
      "Astrologers study how celestial bodies influence human behavior, using birth charts to predict events and provide guidance.",
    img: "/assets/cards/suggestedGroups/Astrologer.png",
    bg: "#FACC15", // Tailwind yellow-500
  },
];

const GroupsSuggested = () => {
  const { isInView, ref } = useInView(0.3, false);
  const navigate = useNavigate();

  return (
    <motion.section
      ref={ref}
      className="px-4 lg:px-16 xl:px-24 py-10 flex flex-col items-start gap-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        {/* <Heading /> */}
        <h1 className="text-lg md:text-3xl font-bold font-montserrat ">
          TAKE OUR ASSESSMENT AND GET YOUR PERSONAL REPORT{" "}
        </h1>
      </motion.div>

      <div className="flex flex-wrap justify-start items-stretch md:px-16 gap-10 md:gap-40 w-full mt-5 md:mt-10">
        {cardData.map((group, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col justify- gap-4 px-6 pt-6 pb-10 rounded-xl shadow-md min-h-[460px] w-full max-w-lg border overflow-visible"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.2 + index * 0.4,
            }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mulish">
                {group.title}
              </h1>
              <p className="text-sm md:text-base font-inter leading-relaxed mt-2">
                {group.description}
              </p>
            </div>
            <div
              className="mt-4 sm:mt-5 z-10"
              onClick={() =>
                navigate(
                  `/assessment/${
                    group.title == "Astrologers" ? "planet" : "psychology"
                  }`
                )
              }
            >
              <div
                className={`w-full flex ${
                  index === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <MythosButton label="EXPLORE MORE" />
              </div>
            </div>
            <motion.img
              src={group.img}
              alt={group.title.toLowerCase()}
              className={`absolute bottom-0 object-contain max-h-80 ${
                index === 0
                  ? "left-0 -translate-x-5"
                  : "right-0 translate-x-3"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default GroupsSuggested;
