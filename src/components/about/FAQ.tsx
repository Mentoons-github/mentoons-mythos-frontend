import FAQCard from "../cards/faqCard";
import { MYTHOS_FAQ } from "../../constants";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const FAQ = () => {
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true });
  const [expandedIndex, setExpandedIndex] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // const fadeIn = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       duration: 0.8,
  //     },
  //   },
  // };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={faqRef}
      initial="hidden"
      animate={faqInView ? "visible" : "hidden"}
      // variants={fadeIn}
      className="py-8 lg:py-10 md:p-8 lg:px-28 bg-[url('/assets/background/section/stars_background.png')] bg-center"
    >
      <motion.h2
        variants={fadeInUp}
        className="pb-8 text-xl font-semibold  tracking-widest md:text-4xl ml-2"
      >
        FREQUENTLY ASKED QUESTIONS
      </motion.h2>
      <motion.div
        variants={fadeInUp}
        className="md:flex md:gap-8 w-[90%] lg:w-[80%] mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          className="flex flex-col flex-1 gap-4 mb-8"
        >
          {MYTHOS_FAQ.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FAQCard
                faq={faq}
                isExpanded={expandedIndex === index}
                onClick={() =>
                  setExpandedIndex(index === expandedIndex ? -1 : index)
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
