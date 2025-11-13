import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExplorePodcast from "./explorePodcast";
import { MYTHOS_NEWS, NEWS } from "../../../constants";
import { JoinCardsProps } from "../../../types/interface";
import MythosNews from "./mythosNews";
import MissingOutProducts from "./missingOutProducts";

const RightSection = () => {
  const [news, setNews] = useState<JoinCardsProps[] | []>([]);

  useEffect(() => {
    setNews(MYTHOS_NEWS);
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <ExplorePodcast />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <MythosNews news={news} />
      </motion.div>

      <motion.div
        className=" space-y-5 p-5 w-full max-h-[550px] border border-muted-foreground overflow-y-auto"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        {NEWS.map((data, index) => (
          <motion.div
            key={index}
            className="w-full lg:max-w-2xs mx-auto lg:mx-0 p-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => window.open(data.redirect, "_blank")}
          >
            <div className="flex justify-center items-center w-full font-jost font-semibold text-xs">
              <h1 className="bg-muted-foreground border whitespace-nowrap z-10 pr-3">
                {data.category}
              </h1>
              <div className="flex-grow border-t "></div>
              <span className="bg-muted-foreground border  whitespace-nowrap px-3">
                {data.date}
              </span>
              <div className="w-[30px] border-t "></div>
            </div>
            <h1 className="font-outfit font-semibold text-lg  mt-3 cursor-pointer hover:text-muted-foreground">
              {data.news}
            </h1>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <MissingOutProducts />
      </motion.div>

      {/* <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src="/assets/planets/NEPTİN.png"
          alt="neptune"
          className="w-96 h-96"
        />
      </motion.div> */}
    </motion.div>
  );
};

export default RightSection;
