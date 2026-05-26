import { FaUser } from "react-icons/fa";
import { BlogFormatDate } from "../../../utils/DateFormate";
import { IBlogV2 } from "../../../types/redux/blogInterface";

const BlogCommentRightHeader = ({ post }: { post: IBlogV2 | null }) => {
  return (
    <div className="p-4 border-b flex items-center gap-3">
      <div className="flex-shrink-0 flex justify-end  w-10 h-10 overflow-hidden rounded-full bg-muted-foreground ">
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
  );
};

export default BlogCommentRightHeader;
