import { motion } from "framer-motion";
import LeftSection from "../components/blogs/left/leftSection";
import RightSection from "../components/blogs/right/rigthSection";
import { FaSearch } from "react-icons/fa";
import TopSection from "../components/blogs/top/topSection";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetcheBlogThunk } from "../features/blog/blogThunk";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blogs = () => {

  const dispatch = useAppDispatch()
  const {data} = useAppSelector((state)=> state.blog)

  console.log(data)

  useEffect(()=> {
    dispatch(fetcheBlogThunk())
  },[dispatch])

  return (
    <motion.section
      className="flex flex-col md:px-20 py-12 justify-between items-center bg-[#FEFEF6]"
      initial="hidden"
      animate="show"
      variants={fadeInUp}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center w-full"
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <motion.h1
          className="font-montserrat ml-3 md:ml-0 text-2xl md:text-4xl font-semibold text-[#E39712] tracking-wider"
          variants={fadeInUp}
        >
          CREATE, CONNECT & EXPAND
        </motion.h1>
        <motion.div
          className=" flex items-center mt-5 md:mt-0"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search Here..."
            id="search"
            className="outline-none p-3 px-5 font-semibold bg-[#33364F] text-white"
          />
          <button className="w-12 h-12 flex items-center justify-center bg-[#FFC367]">
            <FaSearch />
          </button>
        </motion.div>
      </motion.div>

      <motion.div className="w-full mt-10" variants={fadeInUp} transition={{ delay: 0.3 }}>
        <TopSection />
      </motion.div>

      <motion.div
        className="md:flex justify-between items-start w-full mt-10 gap-4"
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <motion.div className="flex-1" variants={fadeInUp}>
          <LeftSection />
        </motion.div>
        <motion.div className="flex-1" variants={fadeInUp} transition={{ delay: 0.5 }}>
          <RightSection />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Blogs;