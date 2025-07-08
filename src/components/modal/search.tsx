import { motion } from "framer-motion";
import { FormEvent } from "react";
import { FaTimes } from "react-icons/fa";

interface SearchIntrface {
  setIsSearchOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const MythosSearch = ({
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchInputRef,
}: SearchIntrface) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-10 -left-10 w-20 h-20 border-2 border-dashed border-[#E39712]/30 rounded-full"
          />
          <motion.div
            initial={{ rotate: 360 }}
            animate={{ rotate: 0 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-10 -right-10 w-16 h-16 border-2 border-dashed border-gray-600/30 rounded-full"
          />

          <motion.div
            initial={{ borderColor: "#374151" }}
            animate={{
              borderColor: ["#374151", "#E39712", "#374151"],
              boxShadow: [
                "0 0 0 0 rgba(227, 151, 18, 0)",
                "0 0 30px 5px rgba(227, 151, 18, 0.3)",
                "0 0 0 0 rgba(227, 151, 18, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative bg-black border-2 rounded-2xl p-8 shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </motion.button>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-akshar"
            >
              What are you looking for?
            </motion.h2>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <motion.input
                  ref={searchInputRef}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type your search here..."
                  className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-xl px-6 py-4 text-white text-lg placeholder-gray-400 focus:border-[#E39712] focus:outline-none focus:ring-2 focus:ring-[#E39712]/50 transition-all duration-300"
                />

                <motion.div
                  animate={{ rotate: searchQuery ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src="/assets/icons/Vector.png"
                    alt="search"
                    className="w-6 h-6 opacity-60"
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#E39712] to-[#F4B942] text-black font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#E39712]/30 transition-all duration-300 transform"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Search Now
                </motion.span>
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400 text-sm mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Groups", "Assessments", "Blog Posts", "Shop Items"].map(
                  (item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSearchQuery(item);
                        searchInputRef.current?.focus();
                      }}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-[#E39712] hover:text-black transition-all duration-300"
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-500 text-xs text-center mt-4"
            >
              Press <kbd className="bg-gray-700 px-2 py-1 rounded">ESC</kbd> to
              close
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MythosSearch;
