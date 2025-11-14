import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RashiResultData {
  rashi: string;
  element: string;
  ruler: string;
  description: string;
}

interface RashiResultProps {
  result: RashiResultData;
  selectedMode: "vedic" | "zodiac";
  setResult: React.Dispatch<React.SetStateAction<RashiResultData | null>>;
  onClose: () => void;
}

const RashiResult: React.FC<RashiResultProps> = ({
  result,
  selectedMode,
  // setResult,
  onClose,
}) => {
  const handlePrint = () => {
    if (!result) {
      alert("Please calculate your rashi before downloading the report.");
      return;
    }
    alert("Printing");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center "
    >
      <motion.div
        className="mb-6"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star className="w-16 h-16 text-yellow-400 mx-auto" />
      </motion.div>

      <h2 className="font-serif font-bold text-3xl bg-yellow-400 bg-clip-text text-transparent mb-2">
        Your Rashi Result
      </h2>
      <p className="text-muted-foreground mb-6">
        Your {selectedMode === "vedic" ? "Vedic (Lunar)" : "Zodiac (Solar)"}{" "}
        sign
      </p>

      <div className=" rounded-xl p-6 mb-6 border ">
        <h3 className="text-2xl font-bold  mb-2">{result.rashi}</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-left">
            <p className="text-muted-foreground text-sm">Element</p>
            <p className=" font-semibold">{result.element}</p>
          </div>
          <div className="text-left">
            <p className="text-muted-foreground text-sm">Ruling Planet</p>
            <p className=" font-semibold">{result.ruler}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {result.description}
        </p>
      </div>

      <div className="flex space-x-4">
        {/* <motion.button
          onClick={() => setResult(null)}
          className="flex-1 px-4 py-2 border bg-foreground rounded-lg hover:bg-foreground/90 text-background transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Find Kundali
        </motion.button> */}
        <motion.button
          onClick={handlePrint}
          className="flex-1 px-4 py-2 border bg-foreground rounded-lg hover:bg-foreground/90 text-background transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Download Report
        </motion.button>
        <motion.button
          onClick={onClose}
          className="flex-1  border border-foreground hover-secondary font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RashiResult;
