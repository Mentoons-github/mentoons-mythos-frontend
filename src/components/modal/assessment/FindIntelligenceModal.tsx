import { X, BrainCircuit } from "lucide-react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FindIntelligenceModal = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user) return null;

  const handleStart = () => {
    onClose();
    navigate("/initialassessment");
  };

  if (user.takeInitialAssessment == true) {
    return null;
  }

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
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 p-10 rounded-2xl text-center space-y-8 border border-gray-700/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-lg w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto animate-fadeIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Icon + Heading */}
        <div className="flex flex-col items-center space-y-3">
          <div className="p-4 rounded-full bg-white/20 border border-white/50 shadow-md">
            <BrainCircuit className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Discover Your Intelligence Type
          </h1>
          <p className="text-gray-400 text-sm max-w-sm">
            Everyone has a unique type of intelligence. Take this quick
            assessment to find out which one defines{" "}
            <span className="text-white font-medium">you</span>.
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4 -mb-6 -mr-6">
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded-xl bg-white hover:bg-white/80 text-black font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Take a test
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FindIntelligenceModal;
