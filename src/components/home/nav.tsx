import { FaBars, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import MythosSidebar from "./sidebar";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MythosSearch from "../modal/search";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { fetchUserData, userLogout } from "../../features/user/userThunk";
import useSignInSignUp from "../../hooks/useSignInSignUpModal";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import ThemeToggle from "../ThemToggle";
import { Heart } from "lucide-react";

const MythosHeader = () => {
  const dispatch = useAppDispatch();
  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const { showModal } = useSignInSignUp();

  const headerText = [
    "ASSESSMENTS",
    "WORKSHOPS",
    "SHOP",
    "BLOG",
    "ABOUT-US",
    "CAREER",
    "GROUPS",
    "BECOME MENTOR",
  ];

  const navigate = useNavigate();

  // Sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Dropdown
  const [isAssessmentsDropdownOpen, setIsAssessmentsDropdownOpen] =
    useState(false);

  const [becomeMentorDropdown, setBecomeMentorDropdown] = useState(false);
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

  // Auth state
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const userHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const assessmentItems = [
    { name: "Psychology", path: "/assessment/psychology" },
    { name: "Astrology", path: "/assessment/planet" },
  ];

  const mentorItems = [
    { name: "Psychology", path: "/become-mentor" },
    { name: "Astrology", path: "/become-mentor" },
    { name: "Spiritual", path: "/become-mentor" },
  ];

  useEffect(() => {
    let isMounted = true;
    console.log("Fetching user data...");
    dispatch(fetchUserData())
      .unwrap()
      .catch((error) => {
        if (isMounted) {
          console.error("Fetch user data failed:", error);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

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

  // Handle hover interactions for assessments dropdown
  const handleMouseEnter = (from: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (from == "assessment") {
      setIsAssessmentsDropdownOpen(true);
    } else {
      setBecomeMentorDropdown(true);
    }
  };

  const handleMouseLeave = (from: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (from == "assessment") {
        setIsAssessmentsDropdownOpen(false);
      } else {
        setBecomeMentorDropdown(false);
      }
    }, 150);
  };

  // Handle hover interactions for user dropdown
  const handleUserMouseEnter = () => {
    if (userHoverTimeoutRef.current) {
      clearTimeout(userHoverTimeoutRef.current);
    }
    setIsUserDropdownOpen(true);
  };

  const handleUserMouseLeave = () => {
    userHoverTimeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 150);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (userHoverTimeoutRef.current) {
        clearTimeout(userHoverTimeoutRef.current);
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

  const handleLogout = () => {
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        setIsUserDropdownOpen(false);
        navigate("/", { replace: true });
        sessionStorage.clear();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
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

  const handleWishList = () => {
    if (!user?._id) {
      showModal("Wishlist");
      return;
    }
    navigate("/wishlist");
  };

  const handleCart = () => {
    if (!user?._id) {
      showModal("Cart");
      return;
    }
    navigate("/cart");
  };

  const handleMentorClick = (type: string) => {
    navigate("/become-mentor", {
      state: { mentorType: type },
    });
  };

  return (
    <>
      <motion.header
        animate={controls}
        initial={{ y: 0 }}
        className={`w-full bg-background z-50 font-akshar border-b border-border ${
          isScrolled ? "fixed top-0 left-0 shadow-lg" : "relative"
        }`}
      >
        <nav className="max-w-full px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center py-2">
          <div className="flex justify-center items-center">
            <Link to="/" className="flex justify-center items-center">
              <img
                src="/assets/logo/image 2.png"
                alt="company logo"
                className="w-20 md:w-24 lg:w-32 h-11 md:h-14 lg:h-16"
              />
            </Link>
          </div>

          {/* Tablet and Desktop Navigation */}
          <ul className="hidden xl:flex items-center gap-4  mulish  mx-4 xl:mx-0">
            {headerText.map((text, index) => (
              <li
                key={index}
                className={`relative font-bold text-[14px] tracking group`}
              >
                {text === "ASSESSMENTS" ? (
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => handleMouseEnter("assessment")}
                    onMouseLeave={() => handleMouseLeave("assessment")}
                  >
                    <div className="relative flex items-center gap-1  cursor-pointer">
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
                        <FaChevronDown className="text-xs ml-" />
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
                          className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-[60]"
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
                                  className="block px-4 py-3  hover:text-foreground/70 transition-all duration-200 text-sm font-medium"
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
                ) : text === "BECOME MENTOR" ? (
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => handleMouseEnter("mentor")}
                    onMouseLeave={() => handleMouseLeave("mentor")}
                  >
                    <div className="relative flex items-center gap-1  cursor-pointer">
                      <img
                        src="/assets/icons/star.png"
                        alt="star"
                        className="w-3 h-3 lg:w-4 lg:h-4"
                      />
                      {text}
                      <motion.div
                        animate={{
                          rotate: becomeMentorDropdown ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-xs ml-" />
                      </motion.div>
                      <span className="absolute left-1/2 -bottom-1 lg:-bottom-2 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </div>

                    <AnimatePresence>
                      {becomeMentorDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-[60]"
                        >
                          <div className="py-2">
                            {mentorItems.map((item, itemIndex) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05 }}
                              >
                                <button
                                  onClick={() => handleMentorClick(item.name)}
                                  className="block px-4 py-3  hover:text-foreground/70 transition-all duration-200 text-sm font-medium"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src="/assets/icons/star.png"
                                      alt="star"
                                      className="w-3 h-3"
                                    />
                                    {item.name}
                                  </div>
                                </button>
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
                    className="relative flex items-center gap-1"
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
            {/* Search Button */}
            {/* <motion.button
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
            </motion.button> */}

            {/* Cart Button */}
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              onClick={handleCart}
              aria-label="View cart"
              className="relative flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
            >
              <IoCartOutline className="" size={25} />
              <span className="absolute -top-1 -right-1 md:-top-2 md:right-0  w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-foreground rounded-full text-background flex items-center justify-center text-[10px] sm:text-xs">
                0
              </span>
            </motion.button>

            {/* Wishlist Button */}
            {user && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                aria-label="View wishlist"
                onClick={handleWishList}
                className="flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 outline-dashed outline-2 outline-gray-600 cursor-pointer"
              >
                <Heart size={20} />
                {/* <img
                  src="/assets/icons/Vector (2).png"
                  alt="wishlist-icon"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                /> */}
              </motion.button>
            )}

            {/* Auth Section */}
            {userLoading ? (
              <div className="border border-foreground rounded-full text-sm w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 animate-spin"></div>
            ) : user ? (
              // User is logged in - show user dropdown
              <div
                className="relative"
                ref={userDropdownRef}
                onMouseEnter={handleUserMouseEnter}
                onMouseLeave={handleUserMouseLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-center items-center rounded-full outline-dashed outline-2 outline-gray-600 w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-foreground cursor-pointer text-background"
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#02599c] flex items-center justify-center text-[20px] text-white">
                      {user?.firstName[0].toUpperCase()}
                    </div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-border">
                          <p className=" text-sm font-medium">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.email || "User"}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          to="/profile"
                          className="block px-4 py-3  hover:bg-foreground hover:text-background transition-all duration-200 text-sm font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <FaUser className="w-3 h-3" />
                            Profile
                          </div>
                        </Link>

                        <Link
                          to="/orders"
                          className="block px-4 py-3 hover:bg-foreground hover:text-background transition-all duration-200 text-sm font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <HiOutlineShoppingBag />
                            My Orders
                          </div>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3  hover:bg-red-600 hover:text-white transition-all duration-200 text-sm font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <FaSignOutAlt className="w-3 h-3" />
                            Logout
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // User is not logged in - show user icon with dropdown
              <div
                className="relative"
                ref={userDropdownRef}
                onMouseEnter={handleUserMouseEnter}
                onMouseLeave={handleUserMouseLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-center items-center rounded-full outline-dashed outline-2 outline-gray-600 w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer "
                >
                  <FaUser className="text-sm sm:text-lg" />
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 w-40 bg-background  border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="py-2">
                        <button
                          onClick={() => navigate("/login")}
                          className="block w-full text-left px-4 py-3 hover:bg-foreground hover:text-background transition-all duration-200 text-sm font-medium"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => navigate("/register")}
                          className="block w-full text-left px-4 py-3 hover:bg-foreground hover:text-background transition-all duration-200 text-sm font-medium"
                        >
                          Register
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ rotate: 360 }}
              whileTap={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="xl:hidden flex justify-center items-center rounded-full w-8 h-8 sm:w-10 sm:h-10 outline-dashed outline-2 outline-gray-600 cursor-pointer "
            >
              <FaBars className="text-sm md:text-lg" />
            </motion.button>
          </div>
        </nav>
        <MythosSidebar
          isOpen={isSidebarOpen}
          navItems={headerText}
          setSidebar={setSidebarOpen}
          mentorItems={mentorItems}
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
