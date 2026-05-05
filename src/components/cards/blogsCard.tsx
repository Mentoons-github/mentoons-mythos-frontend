// import { motion } from "framer-motion";
// import { Blog, Comments } from "../../types/redux/blogInterface";
// import { format } from "date-fns";
// import { likeBlogThunk, updateBlogViewThunk } from "../../features/blog/blogThunk";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../hooks/reduxHooks";
// import useSignInSignUp from "../../hooks/useSignInSignUpModal";
// import BlogActions from "../modal/BlogModal/BlogAction";
// import { useState } from "react";

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       delay: i * 0.2,
//     },
//   }),
// };

// const BlogsCard = ({ blogs, userId, comments }: { blogs: Blog[]; userId: string, comments:Comments[] }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { showModal } = useSignInSignUp();

//   const [inputOpen, setInputOpen] = useState<boolean>(false);
//   const [commentOpen, setCommentOpen] = useState<boolean>(false);

//   const handleLike = () => {
//     // if (!blogId) return;
//     // dispatch(likeBlogThunk(blogId));
//   };

//   const commentsCount = comments.length || 0;

//   const handlePostClick = (post: Blog) => {
//     if (!userId) showModal("Blog");
//     if (!post._id || !userId) return;
//     dispatch(updateBlogViewThunk(post._id));
//     navigate(`?id=${post._id}`);
//   };
//   return (
//     <div className="flex flex-col gap-8 w-full lg:w-[50rem]">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-semibold -mb-4 ml-2 md:ml-0">
//           Popular Blogs
//         </h1>
//       </div>

//       {blogs.map((blog, index) => {
//         const isLiked = blog?.likes?.includes(userId) || false;
//         const likesCount = blog?.likes?.length || 0;
//         return (
//           <motion.div
//             className="flex flex-col w-full min-h-fit border border-muted-foreground"
//             key={index}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeUp}
//           >
//             {blog.file && (
//               <div className="w-full lg:h-[450px] overflow-hidden">
//                 <img
//                   src={blog.file}
//                   alt={blog.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             )}
//             <div className="p-4 md:p-10  flex flex-col flex-grow">
//               <div className="flex gap-5 font-medium font-proza">
//                 <span>
//                   {blog.createdAt && (
//                     <span>
//                       {format(new Date(blog.createdAt), "dd MMM yyyy")}
//                     </span>
//                   )}
//                 </span>
//                 <span className="text-[#9D9D9D]">
//                   {blog.commentCount && blog.commentCount > 0
//                     ? `${blog.commentCount} Comments`
//                     : "0 Comments"}
//                 </span>
//               </div>
//               <h1 className="text-2xl font-bold font-inter mt-2 md:w-[520px]">
//                 {blog.title}
//               </h1>
//               <p className="text-[#9D9D9D] mt-4 font-proza truncate whitespace-nowrap overflow-hidden text-ellipsis">
//                 {blog.description}
//               </p>

//               <BlogActions
//                 commentsOff={blog.commentsOff}
//                 isLiked={isLiked}
//                 likesCount={likesCount}
//                 commentsCount={commentsCount}
//                 onLike={handleLike}
//                 onToggleComment={() => setInputOpen((prev) => !prev)}
//                 onToggleCommentsList={() => setCommentOpen(!commentOpen)}
//                 blogUrl={`${window.location.origin}/blog?id=${blog._id}`}
//               />

//               <div className="flex items-center justify-start mt-5">
//                 <button
//                   className="p-3 outline-none bg-transparent border-foreground rounded-md hover:text-background hover:bg-foreground border-2  font-semibold tracking-[2px] font-proza text-xs "
//                   onClick={() => handlePostClick(blog)}
//                 >
//                   READ MORE
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export default BlogsCard;
