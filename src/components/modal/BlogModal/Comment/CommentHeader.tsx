import { FiFlag } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import ReportOptions from "./ReportOptions";
import { IUser } from "../../../../types";
import { BiSolidEdit } from "react-icons/bi";

interface CommentHeaderProps {
  commentId: string;
  commentUserId: string;
  currentUser: IUser | null;
  reportModal: boolean;
  handleReportOption: () => void;
  onClose: () => void;
  handleDeleteComment: (commentId: string) => void;
  handleEditComment: (commnetId: string) => void;
  onCloseReportModal: () => void;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  commentId,
  commentUserId,
  currentUser,
  reportModal,
  handleReportOption,
  onClose,
  handleDeleteComment,
  handleEditComment,
  onCloseReportModal,
}) => {
  return (
    // <div className="relative group flex items-center space-x-2 cursor-pointer">
    //   <p className="font-semibold text-sm text-primary">{username}</p>
    //   {createdAt && (
    //     <span className="text-xs text-muted-foreground">{formatTime(createdAt)}</span>
    //   )}
    //   <button
    //     onClick={onReply}
    //     className="text-xs text-blue-600 hover:underline"
    //   >
    //     Reply
    //   </button>

    //   <div className="relative" ref={optionRef}>
    //     <BsThreeDots
    //       className="ml-2 hidden group-hover:block cursor-pointer"
    //       onClick={handleShowOption}
    //     />
    //     {showOption && (
    //       <div className="absolute top-7 right-12 w-32 bg-secondary shadow-md border rounded-md z-50">
    //         <div
    //           className="p-2 px-4 hover:bg-muted-foreground text-sm  cursor-pointer rounded-t-md transition"
    //           onClick={handleReportOption}
    //         >
    //           Report
    //         </div>
    //         <div className="p-2 px-4 hover:bg-muted-foreground text-sm text-red-600 cursor-pointer rounded-b-md transition border-t">
    //           Block
    //         </div>
    //       </div>
    //     )}
    //     {reportModal && (
    //      <div className="absolute top-6 right-5 z-50">
    //       <ReportOptions
    //         from="comment"
    //         userId={userId}
    //         Id={commentId}
    //         onClose={() => setReportModal(false)}
    //       />
    //     </div>
    //    )}
    //   </div>
    // </div>
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center lg:items-start lg:pt-20 justify-center"
      onClick={onClose}
    >
      <div
        className="w-[300px] lg:w-[600px] bg-secondary shadow-md border rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {currentUser?._id === commentUserId ? (
          <div>
            <button
              className="w-full flex items-center cursor-pointer justify-center gap-1 px-4 py-2 text text-red-600 hover:bg-red-50 transition"
              onClick={() => handleDeleteComment(commentId)}
            >
              <MdDeleteOutline className="text-lg" />
              Delete Comment
            </button>
            <button
              className="w-full flex items-center cursor-pointer justify-center text-black hover:text-gray-600 gap-1 px-4 py-2 text border-t transition"
              onClick={() => {
                handleEditComment(commentId);
                onClose();
              }}
            >
              <BiSolidEdit className="text-lg" />
              Edit Comment
            </button>
            <button
              className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-2 text  transition border-t"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleReportOption}
              className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <FiFlag className="text-lg" />
              Report
            </button>

            <button
              className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 text-sm  transition border-t"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {reportModal && (
        <div className="absolute top-6 right-5 z-50">
          <ReportOptions
            from="comment"
            userId={commentUserId}
            Id={commentId}
            onClose={onCloseReportModal}
          />
        </div>
      )}
    </div>
  );
};

export default CommentHeader;
