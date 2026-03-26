import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RewardModal = ({
  points,
  onClose,
}: {
  points: number;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 right-6 z-50"
      >
        <div className="bg-white shadow-2xl rounded-2xl px-6 py-4 w-80 border border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
              🎁
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                Reward Earned!
              </h3>
              <p className="text-sm text-gray-600">
                You gained <span className="font-bold text-purple-600">{points}</span> points
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
              className="h-full bg-purple-500"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RewardModal;
