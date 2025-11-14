import { motion } from "framer-motion";
import ProblemCard from "./problemCard";
import useInView from "../../hooks/useInView";
import { ProblemFacedI } from "../../types/problemFaced";

const ProblemFaced = ({
  text,
  data,
}: {
  text: string;
  data: ProblemFacedI[];
}) => {
  const { ref, isInView } = useInView(0.3, false);

  return (
    <section ref={ref} className="py-5 px-4 md:px-8  overflow-hidden">
      <motion.h1
        className=" font-bold text-xl sm:text-2xl md:text-[25px] font-montserrat mb-6 tracking-[2px] montserrat"
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        CHALLENGES WE FACE IN OUR {text}
      </motion.h1>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <ProblemCard data={data} />
      </motion.div>
    </section>
  );
};

export default ProblemFaced;