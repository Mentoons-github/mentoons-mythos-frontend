import { useState, useRef, useEffect } from "react";
import { formatTime } from "../../../../utils/BlogCommentDate";
import { BsThreeDots } from "react-icons/bs";
import ReportOptions from "./ReportOptions";

interface CommentHeaderProps {
  commentId:string
  userId:string
  username: string;
  createdAt?: string;
  onReply: () => void;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  commentId,
  userId,
  username,
  createdAt,
  onReply,
}) => {
  const optionRef = useRef<HTMLDivElement>(null);

  const [showOption, setShowOption] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const handleShowOption = () => {
    setShowOption((prev) => !prev);
  };
  const handleReportOption = () => {
    setShowOption(false);
    setReportModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showOption &&
        optionRef.current &&
        !optionRef.current.contains(e.target as Node)
      ) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOption]);

  return (
    <div className="relative group flex items-center space-x-2 cursor-pointer">
      <p className="font-semibold text-sm text-primary">{username}</p>
      {createdAt && (
        <span className="text-xs text-muted-foreground">{formatTime(createdAt)}</span>
      )}
      <button
        onClick={onReply}
        className="text-xs text-blue-600 hover:underline"
      >
        Reply
      </button>

      <div className="relative" ref={optionRef}>
        <BsThreeDots
          className="ml-2 hidden group-hover:block cursor-pointer"
          onClick={handleShowOption}
        />
        {showOption && (
          <div className="absolute top-7 right-12 w-32 bg-secondary shadow-md border rounded-md z-50">
            <div
              className="p-2 px-4 hover:bg-muted-foreground text-sm  cursor-pointer rounded-t-md transition"
              onClick={handleReportOption}
            >
              Report
            </div>
            <div className="p-2 px-4 hover:bg-muted-foreground text-sm text-red-600 cursor-pointer rounded-b-md transition border-t">
              Block
            </div>
          </div>
        )}
        {reportModal && (
         <div className="absolute top-6 right-5 z-50">
          <ReportOptions
            from="comment"
            userId={userId}
            Id={commentId}
            onClose={() => setReportModal(false)}
          />
        </div>
       )}
      </div>
    </div>
  );
};

export default CommentHeader;
