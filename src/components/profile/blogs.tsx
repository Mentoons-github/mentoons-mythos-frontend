import { motion } from "framer-motion";
import { Blog } from "../../types/redux/blogInterface";
import { BookOpen, Sparkles, Stars, Moon } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

// Animation variants for the empty state
const planetVariants = {
  orbit: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const starVariants = {
  twinkle: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ProfileBlogs = ({
  userBlogs,
  blogsLoading,
  blogError,
}: {
  userBlogs: Blog[];
  blogsLoading: boolean;
  blogError: string | null | undefined;
}) => {

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-gray-800" />
        <h2 className="text-2xl font-bold text-gray-800">My Blogs</h2>
        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {userBlogs.length} {userBlogs.length === 1 ? "blog" : "blogs"}
        </div>
      </div>

      {blogError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{blogError}</p>
        </div>
      )}

      {blogsLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mb-4"></div>
          <p className="text-gray-600">Loading your blogs...</p>
        </div>
      ) : userBlogs.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                variants={starVariants}
                animate="twinkle"
                transition={{ delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* Central Solar System Animation */}
          <div className="relative mb-8">
            {/* Sun (center) */}
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full flex items-center justify-center shadow-lg"
              variants={floatingVariants}
              animate="float"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            {/* Orbiting Planets */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
            >
              <div className="relative w-32 h-32">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full shadow-md"></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
              transition={{ duration: 15, delay: 0.5 }}
            >
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-700 rounded-full shadow-md"></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
              transition={{ duration: 25, delay: 1 }}
            >
              <div className="relative w-40 h-40">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-800 rounded-full shadow-md"></div>
              </div>
            </motion.div>
          </div>

          {/* Main Message */}
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Moon className="w-6 h-6 text-gray-600" />
              Your Cosmic Journey Awaits
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The stars are aligned for your first blog post! Share your
              astrological insights, celestial observations, or cosmic wisdom
              with the universe.
            </p>

            <motion.div
              className="flex items-center justify-center gap-2 text-gray-700 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Stars className="w-5 h-5" />
              <span>Begin your stellar storytelling</span>
              <Stars className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Shooting Star Animation */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full"
            initial={{ x: -50, y: 50, opacity: 0 }}
            animate={{
              x: 100,
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {userBlogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title || "Untitled"}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {blog.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBlogs;
