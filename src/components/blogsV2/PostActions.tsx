import { MessageCircle, Share2 } from "lucide-react";
import { IBlogV2 } from "../../types/redux/blogInterface";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { likeBlogThunk, saveBlogThunk } from "../../features/blog/blogThunk";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import RewardModal from "../modal/RewardModal";
import { resetBlogSlice } from "../../features/blog/blogSlice";
import ShareOption from "../modal/BlogModal/ShareOption";
import useSignInSignUp from "../../hooks/useSignInSignUpModal";

const PostActions = ({
  post,
  commentClick,
}: {
  post: IBlogV2;
  commentClick: (postId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { likeSuccess, rewardPoints } = useAppSelector((state) => state.blog);
  const { user } = useAppSelector((state) => state.user);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { showModal } = useSignInSignUp();

  useEffect(() => {
    if (likeSuccess) {
      setRewardModalOpen(true);
    }
  }, [likeSuccess]);

  const handleLike = () => {
    if (!post._id) return;
    if (!user) {
      showModal("Blog Interaction");
      return;
    }
    dispatch(likeBlogThunk(post?._id));
  };

  const handleSave = () => {
    if (!post._id) return;
    if (!user) {
      showModal("Blog Interaction");
      return;
    }
    dispatch(saveBlogThunk(post?._id));
  };

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, []);

  const isLiked = post?.likes?.includes(user?._id as string) || false;
  const isMyPostReward = rewardPoints?.postId === post._id;
  const isSaved = user?.savedPosts?.includes(post._id as string) || false;

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 relative">
          <button
            onClick={handleLike}
            className="flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            {isLiked ? (
              <FaHeart
                className={`w-6 h-6 text-red-500 transition-all duration-200 scale-100`}
              />
            ) : (
              <FaRegHeart className="w-6 h-6 text-muted-foreground hover:text-red-500 transition-colors duration-200" />
            )}
          </button>

          <span className=" font-semibold text-muted-foreground">
            {post?.likes?.length || 0}
          </span>
          {rewardModalOpen &&
            isMyPostReward &&
            (rewardPoints?.action === "LIKE_BLOG" ||
              rewardPoints?.action === "UNLIKE_BLOG") && (
              <RewardModal
                type="LIKE"
                points={rewardPoints}
                onClose={() => {
                  setRewardModalOpen(false);
                  dispatch(resetBlogSlice());
                }}
              />
            )}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center transition-all duration-200 cursor-pointer">
            <MessageCircle
              className="w-6 h-6 text-muted-foreground hover:text-gray-500"
              onClick={() => commentClick(post?._id as string)}
            />
          </button>
          <span className="text-sm text-muted-foreground">
            {post.commentsOff ? null : post.commentCount || 0}
          </span>
        </div>

        <div
          className="flex items-center gap-2 relative "
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          <button className="flex items-center justify-center transition-all duration-200 cursor-pointer">
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-gray-500" />
          </button>
          {showShareOptions && (
            <ShareOption
              blogUrl={`${window.location.origin}/blog/${post._id}`}
              onClose={() => setShowShareOptions(false)}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          {isSaved ? (
            <FaBookmark
              className={`w-6 h-6 text-muted-foreground transition-all duration-200 scale-100`}
            />
          ) : (
            <FaRegBookmark className="w-6 h-6 text-muted-foreground hover:text-gray-500 transition-colors duration-200" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PostActions;
