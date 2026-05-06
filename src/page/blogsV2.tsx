import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import PostBlog from "../components/blogsV2/PostBlog";
import { IUser } from "../types";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  commentBlogThunk,
  deleteCommentThunk,
  editCommentBlogThunk,
  fetcheBlogThunk,
  getCommentBlogThunk,
  getReplyCommentBlogThunk,
  replyCommentThunk,
} from "../features/blog/blogThunk";
import BlogPosts from "../components/blogsV2/BlogPosts";
import BlogForComment from "../components/modal/BlogModal/BlogModalV2/BlogForComment";
import { toast } from "sonner";
import { resetBlogSlice } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import RewardModal from "../components/modal/RewardModal";
import AlreadyCheckModal from "../components/modal/astro/rashiFindermodal.tsx/AlreadyCheckModal";
import MythosLoginModal from "../components/modals/mythosLogin";
import RashiFinderModal from "../components/modal/astro/rashiFindermodal.tsx";
import AssignmentAlreadyTakenHome from "../components/modal/assessment/AssignmentAlreadyTakenHome.tsx";
import HiringModal from "../components/modal/HiringModal/HiringModal.tsx";
import BlogHiring from "../components/blogsV2/BlogHiring.tsx";
import BlogRightCol from "../components/blogsV2/BlogRightCol.tsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogsV2 = () => {
  const dispatch = useAppDispatch();
  const {
    data,
    total,
    loading,
    fetchBlogLoading,
    blog: blogFromStore,
    comments,
    commentSubmitLoading,
    commentSubmitSuccess,
    error,
    replyComments,
    rewardPoints,
    deleteMessage,
    deleteSuccess,
    commentTotal,
  } = useAppSelector((state) => state.blog);
  const { user } = useAppSelector((state) => state.user);
  const limit = 5;
  const [comment, setComment] = useState("");
  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const selectedPost = data.find((post) => post._id === postId);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<
    "create" | "edit" | "reply" | null
  >(null);
  const skipRef = useRef(0);
  const isFirstLoad = useRef(true);
  const isFetchingRef = useRef(false);
  const totalRef = useRef(0);
  const commentSkipRef = useRef(0);
  const commentLimit = 5;
  const isCommentFetching = useRef(false);
  const replySkipMap = useRef<{ [key: string]: number }>({});
  const replyFetchingMap = useRef<{ [key: string]: boolean }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedModal, setCheckedModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [alreadyTakeModal, setAlreadyTakeModal] = useState(false);
  const [applyJob, setApplyJob] = useState<string | null>(null);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  useEffect(() => {
    if (deleteSuccess && rewardPoints) {
      setRewardModalOpen(true);
    }
  }, [deleteMessage, deleteSuccess, rewardPoints]);

  const [replyMeta, setReplyMeta] = useState<{
    commentId: string;
    userName: string;
    replyToUserId: string;
  } | null>(null);

  useEffect(() => {
    if (postId && commentSubmitSuccess) {
      if (actionType !== "edit" && actionType !== "reply") {
        setRewardModalOpen(true);
      }
      setComment("");
      setActionType(null);
    }
    if (postId && error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [actionType, commentSubmitSuccess, dispatch, error, postId]);

  const fetchComments = async () => {
    if (isCommentFetching.current) return;
    isCommentFetching.current = true;
    await dispatch(
      getCommentBlogThunk({
        blogId: postId as string,
        skip: commentSkipRef.current,
        limit: commentLimit,
      }),
    );
    commentSkipRef.current += commentLimit;
    isCommentFetching.current = false;
  };

  useEffect(() => {
    if (!postId) return;
    commentSkipRef.current = 0;
    dispatch(resetBlogSlice());
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = () => {
    if (!postId || !comment.trim()) return;

    if (editCommentId) {
      setActionType("edit");
      dispatch(
        editCommentBlogThunk({ commentId: editCommentId, newComment: comment }),
      ).then(() => {
        setEditCommentId(null);
        setComment("");
      });
      return;
    }

    if (replyMeta) {
      setActionType("reply");
      dispatch(
        replyCommentThunk({
          commentId: replyMeta.commentId,
          replyText: comment,
          replyToUserId: replyMeta.replyToUserId,
        }),
      ).then(() => {
        setReplyMeta(null);
        setComment("");
      });
      return;
    }

    setActionType("create");
    dispatch(commentBlogThunk({ blogId: postId, comment })).then(() => {
      setComment("");
    });
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteCommentThunk(commentId));
  };

  const fetchMoreBlogs = useCallback(async () => {
    if (isFetchingRef.current) return;
    if (!isFirstLoad.current && skipRef.current >= totalRef.current) return;

    isFetchingRef.current = true;
    const currentSkip = skipRef.current;
    const scrollY = window.scrollY;

    const result = await dispatch(
      fetcheBlogThunk({ skip: currentSkip, limit, sort: "newest" }),
    );

    if (fetcheBlogThunk.fulfilled.match(result)) {
      totalRef.current = result.payload.total;
    }

    skipRef.current = currentSkip + limit;
    isFetchingRef.current = false;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      requestAnimationFrame(() => window.scrollTo({ top: scrollY }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMoreBlogs();
  }, []);

  const handleFetchReplies = async (commentId: string) => {
    if (replyFetchingMap.current[commentId]) return;
    replyFetchingMap.current[commentId] = true;
    const skip = replySkipMap.current[commentId] || 0;
    await dispatch(getReplyCommentBlogThunk({ commentId, skip, limit: 5 }));
    replySkipMap.current[commentId] = skip + 5;
    replyFetchingMap.current[commentId] = false;
  };

  const handleReplyComment = (
    commentId: string,
    userName: string,
    replyToUserId: string,
  ) => {
    setReplyMeta({ commentId, userName, replyToUserId });
    setComment("");
  };

  const handleEditComment = (id: string) => {
    const commentData = comments.find((c) => c._id === id);
    if (commentData) {
      setComment(commentData.comment);
      setEditCommentId(id);
      return;
    }
    const replyData = replyComments.find((r) => r._id === id);
    if (replyData) {
      setComment(replyData.replyText);
      setEditCommentId(id);
      return;
    }
  };

  const handleOpenPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const handlePathClick = (from: string) => {
    if (!user) {
      setLoginModal(true);
    } else if (from == "astrology") {
      if (user.astrologyDetail?.moonSign || user.astrologyDetail?.sunSign) {
        setCheckedModal(true);
        console.log(user.astrologyDetail, "laksdjfad");
      } else {
        setModalOpen(true);
      }
    } else {
      if (user?.takeInitialAssessment) {
        setAlreadyTakeModal(true);
      } else {
        navigate("/initialassessment");
      }
    }
  };

  return (
    <motion.section
      className="min-h-screen grid lg:grid-cols-7 px-2 md:px-10 lg:px-3 gap-10 py-12 justify-between relative"
      initial="hidden"
      animate="show"
      variants={fadeInUp}
    >
      <div className="col-span-2 hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto pt-16 hide-scrollbar pb-10">
        <BlogHiring setApplyJob={setApplyJob} />
      </div>

      {/* CENTER col — scrolls normally with the page */}
      <div className="col-span-3">
        <motion.div
          className="flex flex-col md:flex-row justify-between w-full"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <motion.h1
            className="font-montserrat lg:text-2xl font-semibold ml-3 md:ml-0 tracking-wider"
            variants={fadeInUp}
          >
            CREATE, CONNECT & EXPAND
          </motion.h1>
        </motion.div>

        <motion.div
          className="w-full"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <PostBlog user={user as IUser} />
        </motion.div>

        <motion.div className="w-full">
          <BlogPosts
            data={data}
            blogFromStore={blogFromStore}
            fetchBlogLoading={fetchBlogLoading}
            loading={loading}
            total={total}
            commentClick={handleOpenPost}
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
            fetchMore={fetchMoreBlogs}
            isFirstLoad={isFirstLoad}
          />
        </motion.div>
      </div>

      <div className="col-span-2 hidden lg:block sticky top-0 pb-10 h-screen overflow-y-auto pt-16 hide-scrollbar">
        <BlogRightCol handlePathClick={handlePathClick} />
      </div>

      {postId && selectedPost && (
        <BlogForComment
          post={selectedPost}
          onClose={() => navigate("/blog")}
          handleCommentSubmit={handleCommentSubmit}
          comments={comments}
          comment={comment}
          setComment={setComment}
          commentSubmitLoading={commentSubmitLoading}
          handleReplyComment={handleReplyComment}
          replyMeta={replyMeta}
          setReplyMeta={setReplyMeta}
          replyComments={replyComments}
          openReplies={openReplies}
          setOpenReplies={setOpenReplies}
          handleFetchReplies={handleFetchReplies}
          rewardModalOpen={rewardModalOpen}
          rewardPoints={rewardPoints}
          setRewardModalOpen={setRewardModalOpen}
          currentUser={user}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          editCommentId={editCommentId}
          fetchMoreComments={fetchComments}
          hasMoreComments={comments.length < commentTotal}
        />
      )}

      {rewardModalOpen && !selectedPost && (
        <RewardModal
          type="POST"
          points={rewardPoints}
          onClose={() => {
            setRewardModalOpen(false);
            dispatch(resetBlogSlice());
          }}
        />
      )}
      {checkedModal && (
        <AlreadyCheckModal
          onClose={() => setCheckedModal(false)}
          onResults={() => navigate("/rashi-details")}
        />
      )}

      {loginModal && <MythosLoginModal onClose={() => setLoginModal(false)} />}

      {modalOpen && <RashiFinderModal onClose={() => setModalOpen(false)} />}
      {alreadyTakeModal && (
        <AssignmentAlreadyTakenHome
          onClose={() => setAlreadyTakeModal(false)}
          viewDetails={() =>
            navigate("/assessment/psychology", {
              state: { from: "homeAssessment" },
            })
          }
        />
      )}
      {applyJob && (
        <HiringModal
          setModalOpen={() => {
            setApplyJob(null);
          }}
          title={applyJob}
          jobId={"69f88cff5b8bdad3b163dd4c"}
        />
      )}
    </motion.section>
  );
};

export default BlogsV2;
