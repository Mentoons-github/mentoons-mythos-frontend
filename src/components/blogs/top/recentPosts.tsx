import { motion } from "framer-motion";
import { RECENT_POSTS } from "../../../constants/blogs";

const RecentPosts = () => {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <motion.h1
        className="text-2xl font-semibold "
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Recent Posts
      </motion.h1>

      <div className="space-y-6">
        {RECENT_POSTS.map((post, ind) => (
          <motion.div
            key={ind}
            className="flex items-start gap-5 py-3 pl-"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: ind * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-72 object-cover rounded-md"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            <div className="flex flex-col justify-between h-full gap-1">
              <p className="text-sm text-gray-500 font-medium">
                <span className="text-purple-700">{post.writere}</span> • {post.date}
              </p>

              <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {post.description}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {post.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-sm text-green-600 font-medium px-3 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentPosts;
