import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  commentBlogThunk,
  getCommentBlogThunk,
  likeBlogThunk,
  replyCommentThunk,
} from "../../features/blog/blogThunk";
import { Blog } from "../../types/redux/blogInterface";
import ModalHeader from "./BlogModal/ModalHeader";
import BlogImage from "./BlogModal/BlogImage";
import BlogMeta from "./BlogModal/BlogMeta";
import CommentsList from "./BlogModal/CommentLists";
import BlogContent from "./BlogModal/BlogContent";
import CommentInput from "./BlogModal/CommentInput";
import BlogActions from "./BlogModal/BlogAction";

interface SinglePostModalProps {
  post: Blog;
  onClose: () => void;
  userId: string;
}

const SinglePostModal: React.FC<SinglePostModalProps> = ({
  post,
  onClose,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  const postFromRedux = useAppSelector((state) =>
    state.blog.data.find((b) => b._id === post._id)
  );
  const { comments } = useAppSelector((state) => state.blog);

  const blogId = post._id;
  const currentPost = postFromRedux || post;

  useEffect(() => {
    if (!blogId) return;
    dispatch(getCommentBlogThunk(blogId));
  }, [blogId, dispatch]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLike = () => {
    if (!blogId) return;
    dispatch(likeBlogThunk(blogId));
  };



  const handleCommentSubmit = (comment: string) => {
    if (!blogId) return;

    dispatch(commentBlogThunk({ blogId, comment })).then(() => {
      dispatch(getCommentBlogThunk(blogId));
    });

    setInputOpen(false);
  };

  const handleReplyComment = (commentId: string, replyText: string) => {
  if (!blogId) return;

  dispatch(replyCommentThunk({commentId, replyText })).then(() => {
    dispatch(getCommentBlogThunk(blogId));
  });
};


  const isLiked = currentPost?.likes?.includes(userId) || false;
  const likesCount = currentPost?.likes?.length || 0;
  const commentsCount = comments.length || 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <motion.div
        className="bg-white p-5 rounded-lg w-full max-w-xl shadow-xl max-h-[100vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader title={post.title} onClose={onClose} userId = {post.writerId} postId = {post._id}/>

        <BlogImage src={post.file} alt={post.title} />

        <BlogMeta writer={post.writer} createdAt={post.createdAt} />

        <div className="h-72 overflow-y-auto pr-2 hide-scrollbar will-change-scroll transform-gpu">
          {commentOpen ? (
            <CommentsList
              comments={comments}
              onClose={() => setCommentOpen(false)}
              handleReplyComment = {handleReplyComment}
            />
          ) : (
            <BlogContent description={post.description} tags={post.tags} />
          )}
        </div>

        <CommentInput isOpen={inputOpen} onSubmit={handleCommentSubmit} />

        <BlogActions
        commentsOff = {currentPost.commentsOff}
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={commentsCount}
          onLike={handleLike}
          onToggleComment={() => setInputOpen((prev) => !prev)}
          onToggleCommentsList={() => setCommentOpen(!commentOpen)}
          blogUrl={`${window.location.origin}/blog?id=${post._id}`}
        />
      </motion.div>
    </div>
  );
};

export default SinglePostModal;
