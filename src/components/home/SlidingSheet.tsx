import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types";

const SlidingSheet = ({
  onClose,
  showServices,
  openModal,
  openCheckedModal,
  user,
  noUser,
}: {
  onClose: () => void;
  showServices: boolean;
  openModal: () => void;
  openCheckedModal: () => void;
  user?: IUser | null;
  noUser: () => void;
}) => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Psychology",
      items: [
        {
          text: "Assessment on 9 Intelligences",
          navigate: "assessment/psychology",
        },
        { text: "Detailed Reports", navigate: "#" },
        { text: "One-on-one Consultation", navigate: "book-call" },
        { text: "Access to Psychology Groups", navigate: "groups" },
      ],
      gradient: "from-fuchsia-700 to-gray-800",
    },
    {
      title: "Astrology",
      items: [
        { text: "Free Kundali", navigate: "kundali" },
        { text: "Birth Sign Reports", navigate: "#" },
        { text: "One-on-one Consultation", navigate: "book-call" },
        { text: "Introduction to Sprituality", navigate: "workshops" },
        { text: "Access to Astrology Groups", navigate: "groups" },
      ],
      gradient: "from-sky-900 to-tale-500",
    },
  ];

  const handleClick = (url: string) => {
    if (url == "book-call" && !user) {
      onClose();
      noUser();
    } else if (url === "kundali") {
      if (!user) {
        onClose();
        noUser();
      } else if (
        user?.astrologyDetail?.moonSign ||
        user?.astrologyDetail?.sunSign
      ) {
        openCheckedModal();
      } else {
        openModal();
      }
    } else {
      navigate(url);
    }
  };

  return (
    <AnimatePresence>
      {showServices && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-[600px] lg:h-[450px] md:mt-20 lg:w-[800px] bg-[#0f0b2b] shadow-2xl z-50 p-6 rounded-r-3xl overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <motion.div
              className="flex gap-3 items-center cursor-pointer group relative overflow-x-hidden"
              onClick={() => {
                onClose();
                navigate("career-gps");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="flex items-center gap-3 px-4 py-2 rounded-xl">
                <motion.img
                  src="assets/icons/icon.png"
                  alt="Career GPS"
                  className="w-10 h-10 md:w-12 md:h-12"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                />

                <div className="flex flex-col">
                  <motion.h2
                    className="text-xl md:text-2xl font-bold text-[#bcbac6] tracking-wide group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                   Introducing Career GPS
                  </motion.h2>
                  <motion.span
                    className="text-xs md:text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-300 flex items-center gap-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Find out more
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <button
              onClick={onClose}
              className="text-[#bcbac6] hover:text-white text-2xl md:text-3xl font-bold transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className={`flex-1 p-6 rounded-2xl shadow-2xl bg-gradient-to-br ${service.gradient} text-white relative overflow-hidden cursor-pointer group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-wide border-b pb-5">
                  {service.title}
                </h1>

                <ul className="space-y-3 text-base md:text-lg font-medium">
                  {service.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="relative hover:text-gray-400 transition-colors"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleClick(item.navigate)}
                    >
                      {item.text}
                      {item.navigate === "workshops" && (
                        <span className="text-sm"> (workshop)</span>
                      )}
                      <motion.div
                        className="absolute left-1/2 -bottom-1 w-0.5 h-full bg-white opacity-20 rounded"
                        initial={{ height: 0 }}
                        whileHover={{ height: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative floating circle */}
                <motion.div
                  className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-white opacity-20 blur-3xl"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
          {/* Mentor Promo Section */}
          <div className="text-white mt-10 border-t border-gray-700 pt-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              Become a Mentor & Guide Future Careers
            </h1>

            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Share your knowledge, inspire students, and help them discover the
              right path. Join as a mentor today!
            </p>

            <div className="mb-5">
              <h3 className="font-semibold text-lg mb-2">
                We are looking for mentors in:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-gray-200">
                <li>🧠 Psychology Mentors</li>
                <li>🔮 Astrology Mentors</li>
                <li>🧘‍♂️ Spiritual Guide</li>
              </ul>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate("become-mentor");
              }}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlidingSheet;
