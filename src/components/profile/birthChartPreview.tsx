import { motion } from "framer-motion";
import ComingSoon from "../modal/comingSoon";

const BirthChartPreview = () => {
  return (
    <>
      <ComingSoon />
      <motion.div
        className="relative w-64 h-64 mx-auto"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Circle */}
        <motion.div
          className="absolute inset-0 border-2 border-gray-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Inner Circle */}
        <motion.div
          className="absolute inset-8 border border-gray-600 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Center */}
        <motion.div
          className="absolute inset-1/2 w-4 h-4 -ml-2 -mt-2 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* Zodiac Signs */}
        {[
          "♈",
          "♉",
          "♊",
          "♋",
          "♌",
          "♍",
          "♎",
          "♏",
          "♐",
          "♑",
          "♒",
          "♓",
        ].map((sign, index) => (
          <motion.div
            key={index}
            className="absolute text-lg font-bold text-gray-300"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${
                index * 30
              }deg) translateY(-100px) rotate(-${index * 30}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{
              scale: 1.2,
              textShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          >
            {sign}
          </motion.div>
        ))}

        {/* Planetary positions on chart */}
        {[
          { planet: "☉", angle: 45, distance: 80, color: "text-yellow-400" },
          { planet: "☽", angle: 120, distance: 70, color: "text-blue-400" },
          { planet: "♂", angle: 200, distance: 85, color: "text-red-400" },
          { planet: "♀", angle: 300, distance: 75, color: "text-pink-400" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`absolute text-sm font-bold ${item.color}`}
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-${item.distance}px) rotate(-${item.angle}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            whileHover={{ scale: 1.3 }}
          >
            {item.planet}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default BirthChartPreview;
