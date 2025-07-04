import { motion } from "framer-motion";
import useInView from "../../../hooks/useInView";
import Discover from "../../home/learnMore";
import { BLOGS, MYTHOS_PODCASTS } from "../../../constants";
import { FaBars, FaPlay } from "react-icons/fa";

const CareerBlog = () => {
  const { isInView, ref } = useInView(0.1, false);

  return (
    <section
      ref={ref}
      className="px-4 lg:px-16 xl:px-24 py-10 bg-black overflow-hidden w-full"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <motion.h1
          className="text-[#E39712] font-montserrat font-semibold text-2xl sm:text-3xl md:text-4xl max-w-xl leading-tight md:leading-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Blogs That Will Help You Kick-Starting Your Career!
        </motion.h1>

        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          <Discover label="LEARN MORE" />
        </motion.div>
      </div>

      <div className="flex flex-col justify-between gap-8 mt-10 lg:flex-row">
        <div
          ref={ref}
          className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:w-3/5"
        >
          {BLOGS.slice(0, 4).map((blog, index) => (
            <motion.div
              className="w-full max-w-[350px] mx-auto h-fit space-y-1"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={blog.img}
                alt="blog-post1"
                className="object-cover w-full h-auto rounded-xl"
              />
              <span className="text-[#9FE9FF] font-semibold text-md sm:text-sm md:text-base font-montserrat">
                {blog.date}
              </span>
              <h1 className="mt-1 text-xl font-semibold text-white font-cormorant sm:text-lg md:text-xl lg:text-xl">
                {blog.name}
              </h1>
              <Discover label="READ MORE" />
            </motion.div>
          ))}
        </div>

        <motion.div
              className="p-6 flex flex-col bg-[#FEE898] max-h-[500px] md:w-[490px] rounded-lg shadow-md mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex justify-between items-center w-full mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h1 className="text-4xl font-bold font-mulish text-[#1A1D3B] w-3/4">
                  Explore Podcasts For You
                </h1>
                <img
                  src="/assets/background/blogs/Frame 9.png"
                  className="w-12 h-12"
                  alt="Podcast Icon"
                />
              </motion.div>
        
              <div className="space-y-2 w-full mt-5">
                {MYTHOS_PODCASTS.map((data, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 flex justify-center items-center rounded-full border border-black bg-transparent text-[#333333] hover:bg-white transition">
                        <FaPlay className="w-5 h-5" />
                      </button>
                      <h2 className="text-sm font-bold text-[#333333] tracking-wider font-roboto">
                        {data.title}
                      </h2>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center">
                      <FaBars className="w-6 h-6 text-gray-700" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
      </div>
    </section>
  );
};

export default CareerBlog;
