import { FaUser } from "react-icons/fa";
import { BlogFormatDate } from "../../../utils/DateFormate";
import { IBlogV2 } from "../../../types/redux/blogInterface";
import { BsThreeDots } from "react-icons/bs";
import BlogOptions from "../../../Admin/components/modals/Blog/BlogOptions";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { takeBlogActionsthunk } from "../../../features/blog/blogThunk";

const BlogCommentRightHeader = ({
  post,
  from,
  handleOptionClick,
  viewOption,
}: {
  post: IBlogV2 | null;
  from?: string;
  handleOptionClick?: () => void;
  viewOption?: boolean;
}) => {
  const dispatch = useAppDispatch();
  // HANDLE ADMIN ACTIONS
  const handleAdminAction = (action: string, days?: number) => {
    console.log(action);
    if (!post?._id) {
      return;
    }

    switch (action) {
      case "delete":
        dispatch(takeBlogActionsthunk({ action, blogId: post?._id }));
        break;

      case "hide":
        dispatch(takeBlogActionsthunk({ action, blogId: post?._id }));
        break;

      case "warn_user":
        dispatch(takeBlogActionsthunk({ action, blogId: post?._id }));
        break;

      case "ban_user":
        dispatch(
          takeBlogActionsthunk({
            action,
            blogId: post?._id,
            days,
          }),
        );
        break;

      case "comment_off":
        dispatch(takeBlogActionsthunk({ action, blogId: post?._id }));
        break;

      default:
        break;
    }
  };

  return (
    <div className="p-4 border-b flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 flex justify-end w-10 h-10 overflow-hidden rounded-full bg-muted-foreground">
          {post?.user?.profilePicture ? (
            <img
              src={post.user?.profilePicture}
              alt={post.user?.lastName || "User"}
              className="object-cover w-full h-full cursor-pointer"
            />
          ) : (
            <FaUser className="w-8 h-8 mx-auto my-auto text-background" />
          )}
        </div>

        <div>
          <p className="font-semibold">
            {post?.user?.firstName} {post?.user?.lastName}
          </p>

          <p className="text-xs text-muted-foreground">
            {post?.createdAt && BlogFormatDate(post.createdAt)}
          </p>
        </div>
      </div>

      {from && (
        <div className="relative">
          <BsThreeDots
            className="text-2xl cursor-pointer"
            onClick={handleOptionClick}
          />

          {viewOption && (
            <BlogOptions
              onAction={handleAdminAction}
              isHidden={post?.moderationStatus === "hidden"}
              isCommentOff={post?.commentsOff || false}
              isDeleted={post?.moderationStatus === "deleted"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCommentRightHeader;
