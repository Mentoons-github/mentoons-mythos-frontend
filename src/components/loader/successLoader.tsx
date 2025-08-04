import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
        }}
        className="mb-6"
      >
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>

          {/* Success rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 border-4 border-green-400 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              delay: 0.7,
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 border-2 border-green-300 rounded-full"
          />
        </div>
      </motion.div>

      {/* Success Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold text-green-600 mb-2">
          Upload Successful!
        </h3>
        <p className="text-green-500">Your profile picture has been updated</p>
      </motion.div>

      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 4 === 0
                ? "bg-yellow-400"
                : i % 4 === 1
                ? "bg-green-400"
                : i % 4 === 2
                ? "bg-blue-400"
                : "bg-pink-400"
            }`}
            style={{
              left: `${20 + ((i * 8) % 60)}%`,
              top: `${20 + ((i * 12) % 40)}%`,
            }}
            initial={{ scale: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              y: [-20, -40, -60],
              x: [0, i % 2 === 0 ? 20 : -20, i % 2 === 0 ? 40 : -40],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SuccessLoader;
