import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface AlreadyCheckModalProps {
  onClose: () => void;
  onResults: () => void;
}

const AlreadyCheckModal: React.FC<AlreadyCheckModalProps> = ({
  onClose,
  onResults,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl w-full max-w-md text-center p-8 space-y-6 relative border border-gray-700"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <AlertTriangle className="w-14 h-14 text-orange-400" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-wide">
          Rashi Already Checked
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-base leading-relaxed">
          You’ve already checked your{" "}
          <span className="text-yellow-400 font-semibold">Rashi</span>. Please
          explore other services or revisit your details.
        </p>

        {/* Action */}
        <div className="flex justify-end pt-4 gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-white hover:bg-white/80 text-black font-medium transition"
          >
            Back
          </button>
          <button
            onClick={onResults}
            className="px-6 py-2 rounded-lg bg-black border border-white hover:bg-gray-900 text-white font-medium transition"
          >
            Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlreadyCheckModal;
