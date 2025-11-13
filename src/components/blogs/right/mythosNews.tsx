import { JoinCardsProps } from "../../../types/interface";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const MythosNews = ({ news }: { news: JoinCardsProps[] }) => {
  return (
    <motion.div
      className="p-8 w-full  border border-muted-foreground"
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-4xl font-bold font-mulish w-3/4"
        variants={itemVariant}
      >
        Recent News
      </motion.h1>

      {news.map((data, index) => (
        <motion.div key={index} className="mt-5 space-y-2" variants={itemVariant}>
          <div className="flex justify-start items-center gap-4">
            <img src={data.img} alt={data.name} className="w-20 h-20" />
            <h1 className="font-outfit text-xl font-medium  w-1/2">
              {data.name}
            </h1>
          </div>
          <span className="block text-center w-full text-muted-foreground font-proza font-medium -mt-2 text-sm">
            {data.date}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MythosNews;
