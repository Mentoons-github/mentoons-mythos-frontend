import { motion } from "framer-motion";
import { LuImage } from "react-icons/lu";
import { BiVideoRecording } from "react-icons/bi";
import { TfiMicrophone } from "react-icons/tfi";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createBlogThunk } from "../../../features/blog/blogThunk";
import { useEffect, useState } from "react";
import { resetBlogSlice } from "../../../features/blog/blogSlice";

const CreateBlog = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    description: "",
  });
  const { error, loading, message, createblogSuccess } = useAppSelector((state) => state.blog);

  useEffect(()=> {
    if(createblogSuccess){
      alert(message)
      dispatch(resetBlogSlice())
    }
    if(error){
      alert(error)
      dispatch(resetBlogSlice())
    }
  },[createblogSuccess, dispatch, error, message])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBlogThunk(input));
    setInput({ description: "" });
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className=" text-2xl md:text-3xl ml-3 md:ml-0 font-medium mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Create your first blog post
      </motion.h1>

      <motion.div
        className="w-full min-h-44 bg-[#E4E4E4] p-3 rounded-md flex flex-col justify-between"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <motion.div className="relative w-full">
            <textarea
              name="description"
              rows={3}
              cols={95}
              className="bg-white p-4 pr-4 pl-4 pb-12 rounded h-24 md:h-full resize-none w-full"
              onChange={handleChange}
              placeholder="Start writing your thoughts here...."
              value={input.description}
            ></textarea>

            <motion.div
              className="absolute left-4 bottom-3 flex gap-3 text-gray-500 text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LuImage className="cursor-pointer text-black md:text-2xl" />
              <BiVideoRecording className="cursor-pointer text-black md:text-2xl" />
              <TfiMicrophone className="cursor-pointer text-black md:text-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-end gap-4 md:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="text-[#E39712] font-medium hover:underline">
              Post Later
            </button>
            <motion.button
              type="submit"
              className="bg-[#E39712] px-6 py-2 text-white rounded hover:bg-[#d3860f]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >{loading?"Loading...":"Post"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateBlog;
