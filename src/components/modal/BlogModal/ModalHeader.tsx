import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ReportOptions from "./Comment/ReportOptions";

interface ModalHeaderProps {
  userId?: string;
  postId?: string;
  title?: string;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  userId,
  postId,
}) => {
  const [showOption, setShowOption] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const handleShowOption = () => {
    setShowOption((prev) => !prev);
  };
  const handleReportOption = () => {
    setShowOption(false);
    setReportModal(true);
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center justify-center gap-5 relative">
        <BsThreeDots className="mt-1 text-2xl" onClick={handleShowOption} />
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
              from="blog"
              userId={userId}
              Id={postId}
              onClose={() => setReportModal(false)}
            />
          </div>
        )}
        <button
          className=" hover:text-muted-foreground text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
