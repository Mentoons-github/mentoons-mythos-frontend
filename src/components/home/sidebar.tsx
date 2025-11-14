import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useEffect, useCallback, useRef, useState } from "react";

interface MythosSidebarProps {
  isOpen: boolean;
  setSidebar: (val: boolean) => void;
  navItems: string[];
  mentorItems: { name: string; path: string }[];
}

const MythosSidebar = ({
  isOpen,
  setSidebar,
  navItems,
  mentorItems,
}: MythosSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMentorDropdownOpen, setIsMentorDropdown] = useState(false);
  const navigate = useNavigate();
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebar(false);
      }
    },
    [isOpen, setSidebar]
  );

  useEffect(() => {
    const handleBreakPoint = () => {
      if (window.innerWidth >= 1280) {
        setSidebar(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("resize", handleBreakPoint);
    document.addEventListener("mousedown", handleClickOutside);

    handleBreakPoint();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleBreakPoint);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setSidebar, handleClickOutside]);

  const handleMentorClick = (type: string) => {
    navigate("/become-mentor", {
      state: { mentorType: type },
    });
    setIsMentorDropdown(false);
    setSidebar(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-full h-full bg-black/80 z-40"
          aria-hidden="true"
        >
          <motion.aside
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-80 bg-background shadow-xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex justify-end p-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-foreground rounded-full shadow hover:bg-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setSidebar(false)}
                aria-label="Close menu"
              >
                <FaTimes size={24} className="text-background" />
              </motion.button>
            </div>

            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-7 font-semibold text-xl md:text-2xl mulish">
                {navItems.map((item, index) => {
                  if (item.toLowerCase() === "assessments") {
                    return (
                      <motion.li
                        key={index}
                        className="relative px-6 py-2 border-l-4 border-transparent hover:border-foreground"
                      >
                        {/* Toggle Dropdown on Click */}
                        <span
                          onClick={() => setDropdownOpen((prev) => !prev)}
                          className="block cursor-pointer transition hover:text-muted-foreground focus:outline-none focus:text-gray-600"
                        >
                          {item}
                        </span>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 mt-2 bg-background border text-base shadow-md rounded-md py-2 w-60 z-50"
                            >
                              <li className="px-4 py-2 hover:bg-secondary ">
                                <Link
                                  className=" flex items-center gap-2"
                                  to="/assessment/psychology"
                                  onClick={() => {
                                    setSidebar(false);
                                    setDropdownOpen(false);
                                  }}
                                >
                                  <img
                                    src="/assets/icons/star.png"
                                    alt="star"
                                    className="w-3 h-3"
                                  />
                                  Psychology
                                </Link>
                              </li>
                              <li className="px-4 py-2 hover:bg-secondary">
                                <Link
                                  className="flex items-center gap-2"
                                  to="/assessment/planet"
                                  onClick={() => {
                                    setSidebar(false);
                                    setDropdownOpen(false);
                                  }}
                                >
                                  <img
                                    src="/assets/icons/star.png"
                                    alt="star"
                                    className="w-3 h-3"
                                  />
                                  Astrology
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  } else if (item == "BECOME MENTOR") {
                    return (
                      <motion.li
                        key={index}
                        className="relative px-6 py-2 border-l-4 border-transparent hover:border-foreground "
                      >
                        {/* Toggle Dropdown on Click */}
                        <span
                          onClick={() => setIsMentorDropdown((pre) => !pre)}
                          className="block cursor-pointer transition hover:text-muted-foreground focus:outline-none focus:text-gray-600"
                        >
                          {item}
                        </span>

                        <AnimatePresence>
                          {isMentorDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 bottom-10 mt-2 bg-background border  shadow-md rounded-md py-2 w-60 z-50"
                            >
                              <li className=" hover:bg-">
                                <div className="py">
                                  {mentorItems.map((item, itemIndex) => (
                                    <motion.div
                                      key={item.name}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: itemIndex * 0.05 }}
                                    >
                                      <button
                                        onClick={() =>
                                          handleMentorClick(item.name)
                                        }
                                        className="block hover:bg-secondary w-full px-4 py-3  hover:text-foreground/70 transition-all duration-200 text-base font-medium"
                                      >
                                        <div className="flex items-center gap-2 ">
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
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  } else {
                    // Normal nav item
                    return (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.05, x: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="px-6 py-2 border-l-4 border-transparent hover:border-foreground"
                      >
                        <Link
                          to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                          className="block transition hover:text-muted-foreground focus:outline-none focus:text-gray-600"
                          onClick={() => setSidebar(false)}
                        >
                          {item}
                        </Link>
                      </motion.li>
                    );
                  }
                })}
              </ul>
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MythosSidebar;
