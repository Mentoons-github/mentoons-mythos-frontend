import { motion } from "framer-motion";
import { Star, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignInSignUp {
  onClose: () => void;
  content: string;
}

const SignInSignUpModal = ({ onClose, content }: SignInSignUp) => {
  const navigate = useNavigate();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const pingVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeOut" },
    },
  };

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
    },
  };

  const borderPulseVariants = {
    animate: {
      opacity: [0.2, 0.4, 0.2],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleSignUp = () => {
    onClose();
    navigate("/register");
  };

  const handleSignIn = () => {
    onClose();
    navigate("/login");
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-2xl text-center space-y-6 border border-gray-600/50 shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Background Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-4 left-4 text-white"
            variants={pulseVariants}
            animate="animate"
          >
            <Star size={12} />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 text-gray-300"
            variants={bounceVariants}
            animate="animate"
            transition={{ delay: 1 }}
          >
            <Star size={8} />
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-8 text-gray-400"
            variants={pingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          >
            <Star size={10} />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 text-white"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 3 }}
          >
            <Star size={14} />
          </motion.div>
        </div>

        {/* Rotating Birth Chart */}
        <motion.div
          className="absolute top-4 right-4 w-24 h-24"
          variants={spinVariants}
          animate="animate"
        >
          <img
            src="/assets/common/login/signInSignup.png"
            alt="birthchart"
            className="w-full h-full object-contain opacity-30"
            style={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))" }}
          />
        </motion.div>

        {/* Celestial Icons */}
        <motion.div
          className="flex justify-center items-center space-x-4 mb-6"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-white"
            variants={pulseVariants}
            animate="animate"
          >
            <Sun size={24} />
          </motion.div>
          <motion.div
            className="text-gray-300"
            variants={bounceVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
          >
            <Star size={28} />
          </motion.div>
          <motion.div
            className="text-gray-400"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 1 }}
          >
            <Moon size={24} />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10">
          <motion.h1
            className="font-serif font-bold text-4xl bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent mb-4"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
          >
            SignIn - SignUp Needed
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg mb-6 leading-relaxed"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Please signin or signup to access the {content}
          </motion.p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8" />

          {/* Action Buttons */}
          <motion.div className="space-y-4" initial="hidden" animate="visible">
            <motion.button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 border border-gray-600 hover:border-white/30"
              variants={fadeInVariants}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <Sun size={18} />
                <span>Sign In</span>
              </div>
            </motion.button>

            <motion.button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
              variants={fadeInVariants}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <Moon size={18} />
                <span>Create Account</span>
              </div>
            </motion.button>

            <motion.button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-white font-medium py-2 transition-colors duration-300"
              variants={fadeInVariants}
              transition={{ delay: 0.8 }}
            >
              Maybe Later
            </motion.button>
          </motion.div>
        </div>

        {/* Mystical Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-gray-500/10 to-white/5 pointer-events-none"
          variants={borderPulseVariants}
          animate="animate"
        />
      </motion.div>
    </motion.div>
  );
};

export default SignInSignUpModal;
