import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import MythosSidebar from "./sidebar";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MythosSearch from "../modal/search";

const MythosHeader = () => {
  const headerText = [
    "HOME",
    "GROUPS",
    "BLOG",
    "ABOUT-US",
    "ASSESSMENTS",
    "SHOP",
  ];

  const navigate = useNavigate();

  // Sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Dropdown
  const [isAssessmentsDropdownOpen, setIsAssessmentsDropdownOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Header scroll animation
  const controls = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const assessmentItems = [
    { name: "psychology", path: "/assessment/psychology" },
    { name: "Astrology", path: "/assessment/planet" },
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
        <nav className="max-w-full px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center py-2">
          <div className="flex justify-center items-center">
            <Link to="/" className="flex justify-center items-center">
              <img
                src="/assets/logo/image 2.png"
                alt="company logo"
                className="w-20 md:w-24 lg:w-28"
              />
            </Link>
          </div>

          {/* Tablet and Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8 mulish text-white mx-4 xl:mx-0">
            {headerText.map((text, index) => (
              <li
                key={index}
                className={`relative font-bold ${
                  // Smaller text on tablets, normal on desktop
                  window.innerWidth < 1024 ? "text-xs" : "text-sm"
                } tracking-[1.5px] group`}
              >
                {text === "ASSESSMENTS" ? (
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative flex items-center gap-2 lg:gap-3 cursor-pointer">
                      <img
                        src="/assets/icons/star.png"
                        alt="star"
                        className="w-3 h-3 lg:w-4 lg:h-4"
                      />
                      {text}
                      <motion.div
                        animate={{
                          rotate: isAssessmentsDropdownOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-xs ml-1" />
                      </motion.div>
                      <span className="absolute left-1/2 -bottom-1 lg:-bottom-2 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
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
                    className="relative flex items-center gap-2 lg:gap-3"
                  >
                    <img
                      src="/assets/icons/star.png"
                      alt="star"
                      className="w-3 h-3 lg:w-4 lg:h-4"
                    />
                    {text === "ABOUT-US" ? "ABOUT" : text}
                    <span className="absolute left-1/2 -bottom-1 lg:-bottom-2 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 lg:gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer hover:outline-[#E39712] transition-colors duration-300"
            >
              <img
                src="/assets/icons/Vector.png"
                alt="search-icon"
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              onClick={() => navigate("/cart")}
              aria-label="View cart"
              className="relative flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
            >
              <img
                src="/assets/icons/Vector (1).png"
                alt="cart-icon"
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <span className="absolute -top-1 -right-1 md:-top-2 md:right-0 border-[#E39712] w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#E39712] rounded-full text-white flex items-center justify-center text-[10px] sm:text-xs">
                0
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              aria-label="View more"
              onClick={() => navigate("/wishlist")}
              className="flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
            >
              <img
                src="/assets/icons/Vector (2).png"
                alt="view-icon"
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
            </motion.button>
            <motion.button
              whileHover={{ rotate: 360 }}
              whileTap={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 outline-dashed outline-2 outline-gray-600 cursor-pointer text-white"
            >
              <FaBars className="text-sm sm:text-lg" />
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
          <MythosSearch
            handleSearch={handleSearch}
            searchInputRef={searchInputRef}
            searchQuery={searchQuery}
            setIsSearchOpen={setIsSearchOpen}
            setSearchQuery={setSearchQuery}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MythosHeader;
