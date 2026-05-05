import PostActions from "./PostActions";
import { BlogFormatDate } from "../../utils/DateFormate";
import { IBlogV2 } from "../../types/redux/blogInterface";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaUser } from "react-icons/fa";
import ModalHeader from "../modal/BlogModal/ModalHeader";

type Props = {
  post: IBlogV2;
  children: ReactNode;
  commentClick: (postId: string) => void;
  activeMenuId: string | null;
  setActiveMenuId: Dispatch<SetStateAction<string | null>>;
};

const PostWrapper = ({
  post,
  children,
  commentClick,
  activeMenuId,
  setActiveMenuId,
}: Props) => {
  const user = post.user;

  return (
    <div className="bg-background rounded-2xl shadow-md hover:shadow-lg transition p-4 border space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex-shrink-0 flex justify-end  w-12 h-12 overflow-hidden rounded-full bg-muted-foreground ">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt={user.lastName || "User"}
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : (
              <FaUser className="w-8 h-8 mx-auto my-auto text-background" />
            )}
          </div>

          <div className="flex flex-col figtree">
            {user ? (
              <>
                <span className="Futura Std">
                  {user.firstName} {user.lastName}
                </span>
                <span className="figtree text-[12px] text-muted-foreground">
                  {post.createdAt && BlogFormatDate(post.createdAt)}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground text-sm">Unknown User</span>
            )}
          </div>
        </div>
        <ModalHeader
          userId={post.user?._id}
          postId={post._id}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
          isCommentOff={post.commentsOff}
        />
      </div>

      <div>{children}</div>

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <PostActions post={post} commentClick={commentClick} />
    </div>
  );
};

export default PostWrapper;
