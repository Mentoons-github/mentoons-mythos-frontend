import { useEffect } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#141414] via-[#4a4a4b] to-[#19191b] flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-purple-100/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-blue-100/20 rounded-full animate-bounce" />
      </div>

      <motion.div
        className="text-center text-white relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.img
          src='/assets/logo/image 2.png'
          alt="Mythos Logo"
          className="w-40 mx-auto mb-6 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.h1
          className="text-5xl font-extrabold mb-4 tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Welcome to <span className="text-yellow-300">Mentoons Mythos</span>
        </motion.h1>

        <motion.p
          className="text-3xl opacity-90 mb-10 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Where <span className="text-pink-300 text-4xl">PSYCHOLOGY</span> and{" "}
          <span className="text-green-300 text-3xl">ASTROLOGY</span> meet ✨
        </motion.p>

        {/* <motion.div
          className="w-16 h-16 border-4 border-white/40 border-t-white rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        /> */}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
