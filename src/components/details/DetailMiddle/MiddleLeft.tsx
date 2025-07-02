import { motion } from "framer-motion";
import { RiArrowDropRightLine } from "react-icons/ri";
import { BLOGS_FOR_SPORTS } from "../../../constants/details";

const MiddleLeft = () => {
  return (
    <div className="">
      <div className="flex md:ml-14 space-x-4 md:space-x-6 items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center">
          <RiArrowDropRightLine className="text-6xl" />
        </div>
        <h1 className="text-[#4FA82C] text-xl md:text-3xl font-medium">
          Traits of Sports Intelligence Individuals
        </h1>
      </div>
      <div className="mt-10 md:mt-14">
        <h1 className="text-xl md:text-3xl text-[#FEE898]">
          Blogs For Sports Intelligence
        </h1>
        <div className="space-y-">
          {BLOGS_FOR_SPORTS.map((post, ind) => (
            <motion.div
              key={ind}
              className="flex items-start gap-3 md:gap-5 py-3 pl-"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: ind * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-36 md:w-72 object-cover rounded-md"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              />
              <div className="flex flex-col justify-between h-full md:gap-1">
                <p className="text-sm text-gray-500 md:font-medium">
                  <span className="text-purple-700">{post.writere}</span> •{" "}
                  {post.date}
                </p>

                <h2 className="text-white md:text-lg font-semibold mt-1">{post.title}</h2>
                <p className="text-xs md:text-base text-white mt-1 line-clamp-3">
                  {post.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleLeft;
