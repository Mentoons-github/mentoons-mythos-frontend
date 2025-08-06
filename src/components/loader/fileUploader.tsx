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
            <div className="w-20 h-14 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-lg border-2 border-gray-700 shadow-lg"></div>
            {/* Folder tab */}
            <div className="absolute -top-2 left-2 w-8 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t border-2 border-gray-700 border-b-0"></div>
            {/* Folder front opening */}
            <div className="absolute top-4 left-1 w-18 h-10 bg-gradient-to-b from-gray-300 to-gray-500 rounded border border-gray-600 shadow-inner"></div>
            {/* Folder highlight */}
            <div className="absolute top-1 left-2 w-16 h-2 bg-gradient-to-r from-gray-200 to-transparent rounded opacity-60"></div>
          </motion.div>
        </div>

        {/* Animated file */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          variants={fileVariants}
          animate="animate"
        >
          <div className="w-8 h-10 bg-white border-2 border-gray-600 rounded-sm shadow-lg relative overflow-hidden">
            {/* File corner fold */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-bl from-gray-200 to-gray-100 border-l border-b border-gray-600"></div>
            {/* File lines */}
            <div className="mt-3 space-y-1 px-1">
              <div className="w-4 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded"></div>
              <div className="w-3 h-0.5 bg-gradient-to-r from-gray-600 to-gray-300 rounded"></div>
              <div className="w-4 h-0.5 bg-gradient-to-r from-gray-500 to-gray-300 rounded"></div>
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
          <div className="w-0.5 h-4 bg-gradient-to-b from-gray-700 to-gray-800"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800"></div>
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
          className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1"
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
        <p className="text-sm text-gray-600">
          Please wait while we process your image
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-2 bg-gray-100 rounded-full mt-4 overflow-hidden border border-gray-300"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 rounded-full"
          variants={progressVariants}
          animate="animate"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-500 rounded-full opacity-60"
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
