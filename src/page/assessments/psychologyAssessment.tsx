import FAQ from "../../components/about/FAQ";
import CareerBlog from "../../components/assessment/psychology/CareerBlog";
import IntaligentTypes from "../../components/assessment/psychology/IntaligentTypes";
import LogicalMathmatical from "../../components/assessment/psychology/LogicalMathmatical";
import PsychologyAssessmentTop from "../../components/assessment/psychology/PsychologyAssessmentTop";
import StuckCareer from "../../components/assessment/psychology/StuckCareer";
import WeAreHiring from "../../components/assessment/weAreHiring";

const PsychologyAssessment = () => {
  
  return (
    <div>
      <PsychologyAssessmentTop/>
      <IntaligentTypes/>
      <LogicalMathmatical/>
      <StuckCareer/>
      <CareerBlog/>
      <WeAreHiring/>
      <FAQ/>
    </div>
  );
};

export default PsychologyAssessment;
