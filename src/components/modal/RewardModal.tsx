import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reward } from "../../types/redux/blogInterface";

type Props = {
  points: Reward | null;
  onClose: () => void;
  type: "LIKE" | "COMMENT" | "POST" | "ASSESSMENT" | "DAILYLOGIN";
};

const RewardModal = ({ points, onClose, type }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isPositive = (points?.points ?? 0) > 0;

  const isMicroAction =
    points?.action === "LIKE_BLOG" ||
    points?.action === "UNLIKE_BLOG" ||
    points?.action === "COMMENT_BLOG" ||
    points?.action === "DELETE_COMMENT";

  const positionClass =
    type === "LIKE"
      ? "absolute -top-12 left-1/2 -translate-x-1/2"
      : type === "COMMENT"
        ? "absolute -top-12 left-1/2 -translate-x-1/2"
        : "fixed top-6 right-6";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: -10 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${positionClass} z-50`}
      >
        {isMicroAction ? (
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full shadow-md text-xs font-medium whitespace-nowrap
                       ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
          >
            <span>
              {points?.action === "LIKE_BLOG" && "❤️"}
              {points?.action === "UNLIKE_BLOG" && "💔"}
              {points?.action === "COMMENT_BLOG" && "💬"}
              {points?.action === "DELETE_COMMENT" && "🗑️"}
            </span>

            <span>
              {points?.action === "LIKE_BLOG" && "Liked"}
              {points?.action === "UNLIKE_BLOG" && "Unliked"}
              {points?.action === "COMMENT_BLOG" && "Commented"}
              {points?.action === "DELETE_COMMENT" && "Comment Deleted"}
            </span>

            <span className="font-bold flex-shrink-0">
              {isPositive ? `+${points?.points}` : points?.points} Reward points
            </span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 right-6 z-50"
          >
            <div
              className={`bg-white shadow-2xl rounded-2xl px-6 py-4 w-80 border 
          ${isPositive ? "border-green-200" : "border-red-200"}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
              ${isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                >
                  {isPositive ? "🎁" : "⚠️"}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {isPositive ? "Reward Earned!" : "Points Deducted"}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {isPositive ? "You gained" : "You lost"}{" "}
                    <span
                      className={`font-bold ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {points?.points}
                    </span>{" "}
                    points
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 text-lg font-bold"
                >
                  ×
                </button>
              </div>

              <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className={`h-full ${isPositive ? "bg-green-500" : "bg-red-500"}`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RewardModal;
