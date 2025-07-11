import { motion } from "framer-motion";
import { JoinCardsProps } from "../../types/interface";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
    },
  }),
};

const BlogsCard = ({ blogs }: { blogs: Partial<JoinCardsProps>[] }) => {
  return (
    <div className="flex flex-col gap-8 w-full md:w-[50rem]">
      {blogs.map(({ date, description, img, name }, index) => (
        <motion.div
          className="flex flex-col w-full min-h-fit"
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {img && (
            <div className="w-full h-[450px] overflow-hidden">
              <img
                src={img}
                alt={name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-12 bg-[#1A1D3B] flex flex-col flex-grow">
            <div className="flex gap-5 text-gray-300 font-medium font-proza">
              <span>{date}</span>
              <span className="text-[#9D9D9D]">0 Comments</span>
            </div>
            <h1 className="text-2xl font-bold font-inter text-[#FFC367] mt-2 md:w-[520px]">
              {name}
            </h1>
            <p className="text-[#9D9D9D] mt-4 font-proza">{description}</p>
            <div className="flex items-center justify-start mt-5">
              <button className="p-3 outline-none bg-transparent border-[#3B3B3B] border-2 text-[#9D9D9D] font-semibold tracking-[2px] font-proza text-xs w-1/4">
                READ MORE
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogsCard;