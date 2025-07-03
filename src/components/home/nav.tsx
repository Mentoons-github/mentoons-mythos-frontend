import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import MythosSidebar from "./sidebar";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MythosHeader = () => {
  const headerText = [
    "HOME",
    "GROUPS",
    "BLOG",
    "ABOUT-US",
    "ASSESSMENTS",
    "SHOP",
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssessmentsDropdownOpen, setIsAssessmentsDropdownOpen] =
    useState(false);
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const assessmentItems = [
    { name: "Intellectual", path: "" },
    { name: "Astrology", path: "/assessments/planet" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY) {
          controls.start({ y: "-100%", transition: { duration: 0.3 } });
        } else {
          controls.start({ y: 0, transition: { duration: 0.3 } });
        }
      } else {
        setIsScrolled(false);
        controls.start({ y: 0, transition: { duration: 0.3 } });
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle hover interactions
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsAssessmentsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAssessmentsDropdownOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  return (
    <>
      <motion.header
        animate={controls}
        initial={{ y: 0 }}
        className={`w-full bg-black z-50 font-akshar ${
          isScrolled ? "fixed top-0 left-0 shadow-lg" : "relative"
        }`}
      >
        <nav className="max-w-full px-2 space-x-4 md:space-x-0 sm:px-6 md:px-10 flex justify-between items-center">
          <div className="flex justify-center items-center">
            <Link to="/" className="flex justify-center items-center">
              <img
                src="/assets/logo/image 2.png"
                alt="company logo"
                className="w-25 md:w-30"
              />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-6 space-x-5 xl:gap-8 mulish text-white">
            {headerText.map((text, index) => (
              <li
                key={index}
                className="relative font-bold text-sm tracking-[1.5px] group"
              >
                {text === "ASSESSMENTS" ? (
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative flex items-center gap-3 cursor-pointer">
                      <img src="/assets/icons/star.png" alt="star" />
                      {text}
                      <motion.div
                        animate={{
                          rotate: isAssessmentsDropdownOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-xs ml-1" />
                      </motion.div>
                      <span className="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </div>

                    <AnimatePresence>
                      {isAssessmentsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-[60]"
                        >
                          <div className="py-2">
                            {assessmentItems.map((item, itemIndex) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05 }}
                              >
                                <Link
                                  to={item.path}
                                  className="block px-4 py-3 text-white hover:bg-[#E39712] hover:text-black transition-all duration-200 text-sm font-medium"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src="/assets/icons/star.png"
                                      alt="star"
                                      className="w-3 h-3"
                                    />
                                    {item.name}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={text === "HOME" ? "/" : `/${text.toLowerCase()}`}
                    className="relative flex items-center gap-3"
                  >
                    <img src="/assets/icons/star.png" alt="star" />
                    {text === "ABOUT-US" ? "ABOUT" : text}
                    <span className="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex justify-center items-center rounded-full w-10 h-10 sm:w-12 sm:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer hover:outline-[#E39712] transition-colors duration-300"
            >
              <img
                src="/assets/icons/Vector.png"
                alt="search-icon"
                className="w-5 sm:w-6 h-5 sm:h-6"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              onClick={() => navigate("/cart")}
              aria-label="View cart"
              className="relative flex justify-center items-center rounded-full w-10 h-10 sm:w-12 sm:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
            >
              <img
                src="/assets/icons/Vector (1).png"
                alt="cart-icon"
                className="w-5 sm:w-6 h-5 sm:h-6"
              />
              <span className="absolute -top-2 right-0 border-[#E39712] w-4 sm:w-5 h-4 sm:h-5 bg-[#E39712] rounded-full text-white flex items-center justify-center text-xs">
                0
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              aria-label="View more"
              className="hidden md:flex justify-center items-center rounded-full w-10 h-10 sm:w-12 sm:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
            >
              <img
                src="/assets/icons/Vector (2).png"
                alt="view-icon"
                className="w-6 sm:w-8 h-6 sm:h-8"
              />
            </motion.button>
            <motion.button
              whileHover={{ rotate: 360 }}
              whileTap={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden flex  justify-center items-center rounded-full w-10 h-10 sm:w-12 sm:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer text-white"
            >
              <FaBars className="text-lg sm:text-xl" />
            </motion.button>
          </div>
        </nav>
        <MythosSidebar
          isOpen={isSidebarOpen}
          navItems={headerText}
          setSidebar={setSidebarOpen}
        />
      </motion.header>

      <AnimatePresence>
        {isSearchOpen && (
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
                    <p className="text-gray-400 text-sm mb-3">
                      Popular searches:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        "Groups",
                        "Assessments",
                        "Blog Posts",
                        "Shop Items",
                      ].map((item, index) => (
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
                      ))}
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-gray-500 text-xs text-center mt-4"
                  >
                    Press{" "}
                    <kbd className="bg-gray-700 px-2 py-1 rounded">ESC</kbd> to
                    close
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MythosHeader;
