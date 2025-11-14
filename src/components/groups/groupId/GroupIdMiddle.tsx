import { motion } from "framer-motion";
import PlaneteryTrends from "./PlanetaryTrends";
import SkillTips from "./SkillTips";
const GroupIdMiddle = ({isIntelligence}:{isIntelligence:boolean}) => {
  return (
    <motion.div className="flex flex-col md:flex-row md:space-x-10 md:px-10 md:py-10">
      <div className="md:w-3/5">
        <PlaneteryTrends isIntelligence = {isIntelligence}/>
      </div>
      <div className="md:w-2/5">
        <SkillTips />
      </div>
    </motion.div>
  );
};

export default GroupIdMiddle;
