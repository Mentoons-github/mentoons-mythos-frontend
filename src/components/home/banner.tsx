import { motion } from "framer-motion";
import MythosButton from "./button";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MythosBanner = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePathClick = () => {
    if (!user) {
      toast.warning("Please Login to continue Find path");
    } else {
      navigate("profile");
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

  const planetVariants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
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
    <section className="relative w-full h-screen flex justify-center items-center py-6 sm:py-8 md:py-10 bg-[url('/assets/banner/Section.png')] bg-cover bg-center bg-no-repeat mulish px-3 sm:px-4 md:px-5 overflow-hidden">
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
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
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
        className="absolute w-30 h-30 top-1/5 right-1/6"
        variants={floatVariants}
        animate="animate"
        transition={{ duration: 0.3 }}
      />

      <motion.img
        src="/assets/banner/planet1.png"
        alt="planet1"
        className="absolute w-50 h-50 top-5 right-1/4"
        variants={planetVariants}
        animate="animate"
        transition={{ duration: 0.4 }}
      />

      <motion.img
        src="/assets/banner/planet3.png"
        alt="planet3"
        className="absolute w-40 h-40 bottom-1/3 right-20"
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

      <motion.img
        src="/assets/banner/planets4.png"
        alt="planet4"
        className="absolute w-50 h-50 bottom-15 right-1/6"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, -15, 0],
          rotate: [0, -360],
          transition: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.1, y: -15 }}
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
        style={{ right: "15%", top: "15%" }}
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
        style={{ right: "10%", top: "10%" }}
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
      <div className="relative space-y-3 sm:space-y-4 md:space-y-5 p-3 sm:p-4 md:p-5 text-center flex flex-col pt-40 md:pt-0 justify-start items-start w-full z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="text-[#E39712] font-semibold break-words md:w-[550px] text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[1.5px] sm:tracking-[2.9px] font-montserrat drop-shadow-lg"
        >
          LET THE PLANETS GUIDE YOUR CAREER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          whileHover={{
            scale: 1.01,
            color: "#1f2937",
          }}
          className="font-semibold text-left text-base sm:text-lg md:text-xl lg:text-2xl w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-[45%] text-black font-mulish drop-shadow-sm"
        >
          Feeling stuck in life? Let your birth sign find solutions to all your
          problems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.7,
            ease: "easeOut",
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10"
        >
          <MythosButton
            label="FIND YOUR PATH"
            bg="#FEE898"
            onClick={handlePathClick}
          />
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default MythosBanner;
