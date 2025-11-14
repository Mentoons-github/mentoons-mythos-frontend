import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MythosLoginModalProps {
  onClose: () => void;
}

const MythosLoginModal = ({ onClose }: MythosLoginModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
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
          className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl w-full md:max-w-lg p-8 space-y-6 relative border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute text-2xl font-bold top-3 right-3 text-[#ebdfdf] hover:text-white transition"
            onClick={onClose}
            aria-label="Close Modal"
          >
            ×
          </button>

          <h1 className="font-semibold text-3xl  font-serif text-[#ebdfdf] text-center">
            Start Your Cosmic Journey With Us
          </h1>

          {/* Description */}
          <p className="mt-4 text-[#dcdcdc] text-base md:text-[16px] ">
            Sign up with us to get a detailed report of your personalogy
            assessment and improve your life and career.
          </p>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <button
              className="w-full py-3 bg-[#000000] border text-white font-medium text-lg rounded-md hover:bg-[#1b1a1a] transition"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
            <button
              className="w-full py-3 text-lg font-medium bg-white text-black border border-gray-800 rounded-md hover:bg-white/80 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MythosLoginModal;
