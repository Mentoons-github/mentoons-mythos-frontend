import { motion } from "framer-motion";
import LeftSection from "../components/blogs/left/leftSection";
import RightSection from "../components/blogs/right/rigthSection";
import { FaSearch } from "react-icons/fa";
import TopSection from "../components/blogs/top/topSection";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { searchBlogThunk } from "../features/blog/blogThunk";
import BlogSearchModal from "../components/modal/BlogModal/BlogSearch/BlogSearchModal";
import { resetBlogSlice } from "../features/blog/blogSlice";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blogs = () => {
  const { searchBlogs, searchLoading } = useAppSelector((state) => state.blog);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        dispatch(searchBlogThunk(search));
        setShow(true);
      } else {
        setShow(false);
        dispatch(resetBlogSlice());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <motion.section
      className="flex flex-col md:px-20 py-12 justify-between items-center relative"
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
          className="font-montserrat ml-3 md:ml-0 text-2xl md:text-4xl font-semibold tracking-wider"
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
            name={search}
            type="text"
            placeholder="Search Here..."
            id="search"
            className="outline-none p-3 px-5 font-semibold bg-[#33364F] text-white"
            onChange={handleChange}
          />
          <button className="w-12 h-12 flex items-center justify-center bg-primary">
            <FaSearch className="text-background"/>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full mt-10"
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
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
        <motion.div
          className="flex-1"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <RightSection />
        </motion.div>
      </motion.div>
      {show && (
        <BlogSearchModal
          blog={searchBlogs}
          loading={searchLoading}
          userId={user?._id}
        />
      )}
    </motion.section>
  );
};

export default Blogs;
