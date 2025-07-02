import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const getVisiblePages = (): (number | string)[] => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange: (page: number) => void = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const activeVariants = {
    initial: { scale: 1, backgroundColor: "#ffffff", color: "#000000" },
    animate: {
      scale: 1.1,
      backgroundColor: "#000000",
      color: "#ffffff",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex items-center justify-center bg-white py-5">
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            flex items-center justify-center w-10 h-10 border-2 border-black rounded-lg
            transition-colors duration-200 group
            ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-black hover:text-white bg-white text-black"
            }
          `}
        >
          <motion.div
            animate={{ x: currentPage === 1 ? 0 : [-2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={16} />
          </motion.div>
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          <AnimatePresence mode="wait">
            {getVisiblePages().map((page, index) => (
              <motion.div
                key={`${page}-${index}`}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {page === "..." ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <MoreHorizontal size={16} className="text-black" />
                  </div>
                ) : (
                  <motion.button
                    variants={
                      currentPage === page ? activeVariants : buttonVariants
                    }
                    initial="initial"
                    animate={currentPage === page ? "animate" : "initial"}
                    whileHover={currentPage !== page ? "hover" : {}}
                    whileTap="tap"
                    onClick={() => handlePageChange(page as number)}
                    className={`
                      relative w-10 h-10 border-2 border-black rounded-lg font-medium
                      transition-all duration-200 overflow-hidden
                      ${
                        currentPage === page
                          ? "bg-black text-white shadow-lg"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }
                    `}
                  >
                    <motion.span
                      animate={currentPage === page ? { y: [10, 0] } : { y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "relative", zIndex: 10 }}
                    >
                      {page}
                    </motion.span>

                    {/* Active page indicator */}
                    {currentPage === page && (
                      <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ borderRadius: "6px", zIndex: 0 }}
                      />
                    )}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            flex items-center justify-center w-10 h-10 border-2 border-black rounded-lg
            transition-colors duration-200 group
            ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-black hover:text-white bg-white text-black"
            }
          `}
        >
          <motion.div
            animate={{ x: currentPage === totalPages ? 0 : [2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
