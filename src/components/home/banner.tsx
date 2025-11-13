import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import SlidingSheet from "./SlidingSheet";
import RashiFinderModal from "../modal/astro/rashiFindermodal.tsx";
import AlreadyCheckModal from "../modal/astro/rashiFindermodal.tsx/AlreadyCheckModal.tsx";
import MythosLoginModal from "../modals/mythosLogin.tsx";

const MythosBanner = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [showServices, setShowServices] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedModal, setCheckedModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);



  const handlePathClick = (from: string) => {
    if (!user) {
      setLoginModal(true);
    } else if (from == "astrology") {
      if (user.astrologyDetail?.moonSign || user.astrologyDetail?.sunSign) {
        setCheckedModal(true);
        console.log(user.astrologyDetail, "laksdjfad");
      } else {
        setModalOpen(true);
      }
    } else {
      navigate("assessment/psychology");
    }
  };

  // Animation variants for floating elements
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const twinkleVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const meteorVariants = {
    animate: {
      x: ["-100px", "100vw"],
      y: ["-50px", "50px"],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full xl:min-h-screen flex justify-center py-6 sm:py-8 md:py-10 md:bg-[url('/assets/banner/Section1.png')] bg-cover bg-center bg-no-repeat mulish px-3 sm:px-4 md:px-5 overflow-hidden ">
      {/* Floating Particles - Left Side (Dark) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-left-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-full"
          style={{
            left: `${Math.random() * 40}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.4, 1, 0.4],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Particles - Right Side (White) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-right-${i}`}
          className="absolute w-1 h-1 bg-[#ede8e8d3] rounded-full opacity-60"
          style={{
            right: `${Math.random() * 50}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 20, -20, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={twinkleVariants}
          animate="animate"
          transition={{
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 2,
          }}
        />
      ))}

      {/* Shooting Star/Meteor */}
      <motion.div
        className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
        style={{ top: "20%", left: "-100px" }}
        variants={meteorVariants}
        animate="animate"
      />

      {/* Animated Planets */}
      <motion.img
        src="/assets/banner/planet2.png"
        alt="planet2"
        className="absolute w-30 h-30 top-1/7 right-4"
        variants={floatVariants}
        animate="animate"
        transition={{ duration: 0.3 }}
      />

      <motion.img
        src="/assets/banner/planet3.png"
        alt="planet3"
        className="absolute w-40 h-40 bottom-1/4 -right-5 "
        animate={{
          y: [0, -25, 0],
          rotate: [0, 180, 360],
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        whileHover={{ scale: 1.2, rotate: 45 }}
      />

      {/* Cosmic Dust Clouds - Left Side */}
      <motion.div
        className="absolute w-32 h-32 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-sm"
        style={{ left: "10%", top: "30%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 bg-gradient-radial from-blue-400/15 to-transparent rounded-full blur-sm"
        style={{ left: "5%", bottom: "40%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [180, 0, -180],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Cosmic Rings - Right Side */}
      <motion.div
        className="absolute w-40 h-40 border border-white/20 rounded-full"
        style={{ right: "2%", top: "10%" }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute w-60 h-60 border border-white/10 rounded-full"
        style={{ right: "1%", top: "4%" }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative space-y-3 lg:ml-16 sm:space-y-4 md:space-y-5 p-3 sm:p-4 md:p-5 text-center flex flex-col md:mt-16 md:pt-0 justify-start items-start w-full z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="md:text-black font-bold break-words md:w-[700px] text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[1.5px] sm:tracking-[2.9px] font-montserrat drop-shadow-lg"
        >
          LET THE PLANETS GUIDE YOUR CAREER
        </motion.h1>

        <div className="flex flex-col lg:flex-row xl:pr-52 w-full gap-5">
          <div className="w-full lg:w-1/2 space-y-8 sm:space-y-14 mt-5 sm:mt-14">
            {/* First Test */}
            <motion.div
              className="md:w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              <div className="font-semibold text-left text-base sm:text-lg md:text-xl md:text-black font-mulish drop-shadow-sm">
                Feeling stuck in career? Find which intelligence belongs you
                are.{" "}
                <motion.button
                  onClick={() => handlePathClick("psychology")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-foreground text-background md:bg-black inline-flex items-center md:text-white px-3 py-2 rounded-md !text-sm whitespace-nowrap align-middle gap-1"
                >
                  <span className="text-sm">Take a Test</span>
                  <GrNext className="inline text-sm" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="md:w-md ml-5 lg:ml-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div className="font-semibold text-left text-base sm:text-lg md:text-xl md:text-black font-mulish drop-shadow-sm">
                Feeling stuck in life? Let your birth sign find solutions to all
                your problems.{" "}
                <motion.button
                  onClick={() => handlePathClick("astrology")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-foreground text-background md:bg-black inline-flex items-center md:text-white px-3 py-2 rounded-md !text-sm whitespace-nowrap align-middle gap-1"
                >
                  <span className="text-sm">Find My Rashi</span>
                  <GrNext className="inline text-sm" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div ref={videoRef} className="w-full lg:w-1/2 mt-8 lg:mt-0 ">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <ReactPlayer
                url="assets/about.mp4"
                className="absolute inset-0"
                width="100%"
                height="100%"
                controls
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      disablePictureInPicture: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {!showServices && (
        <motion.button
          onClick={() => setShowServices(true)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0f0b2b] text-white px-2 py-4 rounded-r-md shadow-lg z-50 flex flex-row items-center justify-center sm:gap-2 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center sm:space-y-1">
            {"services".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-sm md:text-lg font-semibold tracking-wide"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.2, color: "#A78BFA" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="text-white"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <GrNext className="sm:text-lg text-xs" />
          </motion.div>
        </motion.button>
      )}

      <SlidingSheet
        onClose={() => setShowServices(false)}
        showServices={showServices}
        openModal={() => {
          setModalOpen(true);
          setShowServices(false);
        }}
        noUser={() => setLoginModal(true)}
        user={user}
        openCheckedModal={() => {
          setCheckedModal(true);
          setShowServices(false);
        }}
      />

      {checkedModal && (
        <AlreadyCheckModal
          onClose={() => setCheckedModal(false)}
          onResults={() => navigate("profile")}
        />
      )}

      {loginModal && <MythosLoginModal onClose={() => setLoginModal(false)} />}

      {modalOpen && <RashiFinderModal onClose={() => setModalOpen(false)} />}

      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default MythosBanner;
