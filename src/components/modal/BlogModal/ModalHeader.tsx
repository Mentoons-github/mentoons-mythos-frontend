import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiFlag, FiUserX } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ReportOptions from "./Comment/ReportOptions";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  commentOffToggleThunk,
  deleteBlogThunk,
} from "../../../features/blog/blogThunk";
import { FaComments, FaCommentSlash } from "react-icons/fa";
import useSignInSignUp from "../../../hooks/useSignInSignUpModal";

interface ModalHeaderProps {
  userId?: string;
  postId?: string;
  activeMenuId: string | null;
  setActiveMenuId: Dispatch<SetStateAction<string | null>>;
  isCommentOff: boolean | undefined;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  userId,
  postId,
  activeMenuId,
  setActiveMenuId,
  isCommentOff,
}) => {
  const [reportModal, setReportModal] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickedFor, setClickedFor] = useState<"report" | "block">("report");

  const isOpen = activeMenuId === postId;
  const { showModal } = useSignInSignUp();

  const handleToggle = () => {
    setActiveMenuId(isOpen ? null : postId!);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) // ← exclude the button
      ) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickReportOrBlock = (clickedFor: "report" | "block") => {
    if (!user) {
      showModal("Blog Action");
      return;
    }
    setReportModal(true);
    setClickedFor(clickedFor);
  };

  const handleDelete = () => {
    if (!postId) return;
    dispatch(deleteBlogThunk(postId));
  };

  const handleCommentOff = () => {
    if (!postId) return;
    dispatch(commentOffToggleThunk(postId)).then(() => {
      setActiveMenuId(null);
    });
  };

  const isOwner = user?._id === userId;

  return (
    <div className="flex justify-end items-center mb-4 relative">
      {/* Three dots */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-muted transition"
      >
        <BsThreeDots className="text-xl text-muted-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 right-0 w-52 bg-background shadow-lg border rounded-xl z-50 overflow-hidden"
          >
            {isOwner ? (
              <>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline className="text-lg" />
                  Delete Post
                </button>
                {isCommentOff ? (
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted-foreground transition"
                    onClick={handleCommentOff}
                  >
                    <FaComments className="text-lg" />
                    Turn on Comment
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted-foreground transition"
                    onClick={handleCommentOff}
                  >
                    <FaCommentSlash className="text-lg" />
                    Turn off Comment
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => handleClickReportOrBlock("report")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted-foreground transition"
                >
                  <FiFlag className="text-lg" />
                  Report
                </button>

                <button
                  onClick={() => handleClickReportOrBlock("block")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t"
                >
                  <FiUserX className="text-lg" />
                  Block User
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {reportModal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 right-0 z-50"
          >
            <ReportOptions
              from="blog"
              forClick={clickedFor}
              userId={userId}
              Id={postId}
              onClose={() => setReportModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModalHeader;
