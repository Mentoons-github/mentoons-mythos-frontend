import { motion } from "framer-motion";
import PlaneteryTrends from "./PlanetaryTrends";
import SkillTips from "./SkillTips";
const GroupIdMiddle = () => {
  return (
    <motion.div className="flex flex-col md:flex-row bg-black md:space-x-10 md:px-10 md:py-10">
      <div className="md:w-3/5">
        <PlaneteryTrends />
      </div>
      <div className="md:w-2/5">
        <SkillTips />
      </div>
    </motion.div>
  );
};

export default GroupIdMiddle;
