import { motion } from "framer-motion";
import { Blog } from "../../types/redux/blogInterface";
import { format } from "date-fns";
import { updateBlogViewThunk } from "../../features/blog/blogThunk";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { toast } from "sonner";

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


const BlogsCard = ({ blogs, userId }: { blogs: Blog[], userId:string }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlePostClick = (post: Blog) => {
     if(!userId) toast.warning("Please Login to continue reading")
      if(!post._id || !userId) return
      dispatch(updateBlogViewThunk(post._id))
      navigate(`?id=${post._id}`);
    };
  return (
    <div className="flex flex-col gap-8 w-full md:w-[50rem]">
     <div>
       <h1 className="text-3xl font-semibold -mb-4">Popular Blogs</h1>
     </div>
      
      {blogs.map((blog, index) => (
        <motion.div
          className="flex flex-col w-full min-h-fit"
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {blog.file && (
            <div className="w-full h-[450px] overflow-hidden">
              <img
                src={blog.file}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-4 md:p-12 bg-[#1A1D3B] flex flex-col flex-grow">
            <div className="flex gap-5 text-gray-300 font-medium font-proza">
              <span>
                {blog.createdAt && (
                  <span>{format(new Date(blog.createdAt), "dd MMM yyyy")}</span>
                )}
              </span>
              <span className="text-[#9D9D9D]">
                {blog.commentCount && blog.commentCount > 0
                  ? `${blog.commentCount} Comments`
                  : "0 Comments"}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-inter text-[#FFC367] mt-2 md:w-[520px]">
              {blog.title}
            </h1>
            <p className="text-[#9D9D9D] mt-4 font-proza truncate whitespace-nowrap overflow-hidden text-ellipsis">
              {blog.description}
            </p>

            <div className="flex items-center justify-start mt-5">
              <button className="p-3 outline-none bg-transparent border-[#3B3B3B] border-2 text-[#9D9D9D] font-semibold tracking-[2px] font-proza text-xs " onClick={() => handlePostClick(blog)}>
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
