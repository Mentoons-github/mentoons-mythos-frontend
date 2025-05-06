import { motion } from "framer-motion";
import useInView from "../../hooks/useInView";

const AstrologyAssessment = () => {
  const titleRef = useInView(0.1);
  const items1Ref = useInView(0.1);
  const items2Ref = useInView(0.1);

  const itemsRef = [items1Ref, items2Ref];

  const data = [
    {
      image: "/assets/gods/image 29.png",
      title: "Facing Health issues, Addiction etc? Rahu-Ketu Test Is For you",
      listItems: [
        "Understand your past-life karmic debts and current spiritual lessons.",
        "Analyze Rahu's placement (desire, illusion, material obsessions).",
        "Decode Ketu's placement (past life, detachment, intuition)",
      ],
      time: "Approximately 10 minutes",
      age: 20,
      bg: "#F7941D",
    },
    {
      image: "/assets/gods/image 28.png",
      title: "Career Delays, Finance Problems? Take The Shani Test!",
      listItems: [
        "Understand your past-life karmic debts and current spiritual lessons.",
        "Analyze Rahu's placement (desire, illusion, material obsessions).",
        "Decode Ketu's placement (past life, detachment, intuition)",
      ],
      time: "Approximately 10 minutes",
      age: 20,
      bg: "#567AE5",
    },
  ];

  return (
    <div className="px-6 sm:px-10 md:px-15 lg:px-20 xl:px-25 py-10 xl:py-15 bg-[#FEEBD5]">
      <motion.h1
        ref={titleRef.ref}
        initial={{ opacity: 0, y: -20 }}
        animate={
          titleRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ duration: 0.8 }}
        className="text-[#1A1D3B] text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl tracking-widest font-bold font-montserrat text-center max-w-xl mx-auto"
      >
        Explore our wide range of Astrology Assessments
      </motion.h1>
      <div className="relative flex flex-col justify-end items-center xl:items-end mt-10 xl:mt-15">
        {data.map((detail, index) => {
          return (
            <motion.div
              key={index}
              ref={itemsRef[index].ref}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={
                itemsRef[index].isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col xl:flex-row items-center xl:items-end mb-16 xl:mb-20 w-full"
            >
              <motion.div
                className="flex-shrink-0 relative z-0 mb-6 xl:mb-12 rounded-lg xl:rounded-none overflow-hidden"
                style={{ backgroundColor: detail.bg }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={detail.image}
                  alt="gods"
                  className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[720px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[650px] object-contain"
                />
              </motion.div>
              <motion.div
                className="w-full sm:w-[400px] md:w-[500px] lg:w-[550px] xl:w-[630px] p-6 sm:p-8 md:p-8 lg:p-10 xl:p-10 bg-[#242633] xl:mt-30 xl:-ml-12 z-5 xl:px-20 rounded-lg xl:rounded-none"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#FFFFFF] max-w-md">
                  {detail.title}
                </h1>
                <ul className="list-disc text-white text-base md:text-base lg:text-lg xl:text-lg mt-4 xl:mt-10 ml-4">
                  {detail.listItems.map((item, idx) => (
                    <li key={idx} className="mt-2 xl:mt-4">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-white mt-6 xl:mt-15">
                  <span className="text-semibold text-base lg:text-lg xl:text-lg">
                    🕒 Time
                  </span>
                  :
                  <span className="text-sm xl:text-md ml-2">{detail.time}</span>
                </p>
                <p className="text-white mt-2">
                  <span className="text-semibold text-base lg:text-lg xl:text-lg">
                    🎯 Ages:{" "}
                  </span>
                  :
                  <span className="text-sm xl:text-md ml-2">{detail.age}+</span>
                </p>
                <motion.button
                  className="mt-6 xl:mt-10 bg-[#EC9600] rounded-full px-4 py-2 font-extrabold text-white"
                  whileHover={{ scale: 1.05, backgroundColor: "#f8a728" }}
                  whileTap={{ scale: 0.95 }}
                >
                  START TEST
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AstrologyAssessment;
