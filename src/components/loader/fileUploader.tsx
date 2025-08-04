import { motion } from "framer-motion";

const FileUploadLoader = () => {
  const fileVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const arrowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const progressVariants = {
    animate: {
      width: ["0%", "70%", "100%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main animation container */}
      <div className="relative w-32 h-24 mb-4">
        {/* Folder */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Folder back */}
            <div className="w-20 h-14 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-t-lg border-2 border-orange-500 shadow-lg"></div>
            {/* Folder tab */}
            <div className="absolute -top-2 left-2 w-8 h-4 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t border-2 border-orange-500 border-b-0"></div>
            {/* Folder front opening */}
            <div className="absolute top-4 left-1 w-18 h-10 bg-gradient-to-b from-yellow-300 to-orange-300 rounded border border-orange-400 shadow-inner"></div>
            {/* Folder highlight */}
            <div className="absolute top-1 left-2 w-16 h-2 bg-gradient-to-r from-yellow-200 to-transparent rounded opacity-60"></div>
          </motion.div>
        </div>

        {/* Animated file */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          variants={fileVariants}
          animate="animate"
        >
          <div className="w-8 h-10 bg-white border-2 border-orange-400 rounded-sm shadow-lg relative overflow-hidden">
            {/* File corner fold */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-bl from-orange-200 to-orange-100 border-l border-b border-orange-400"></div>
            {/* File lines */}
            <div className="mt-3 space-y-1 px-1">
              <div className="w-4 h-0.5 bg-gradient-to-r from-orange-300 to-orange-200 rounded"></div>
              <div className="w-3 h-0.5 bg-gradient-to-r from-orange-300 to-yellow-200 rounded"></div>
              <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-200 rounded"></div>
            </div>
            {/* File shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{
                x: [-20, 20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Upload arrow */}
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2"
          variants={arrowVariants}
          animate="animate"
        >
          <div className="w-0.5 h-4 bg-gradient-to-b from-orange-500 to-orange-600"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-orange-600"></div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-lg font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1"
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Uploading your file...
        </motion.p>
        <p className="text-sm text-orange-500">
          Please wait while we process your image
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-2 bg-orange-100 rounded-full mt-4 overflow-hidden border border-orange-200"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-full"
          variants={progressVariants}
          animate="animate"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploadLoader;
