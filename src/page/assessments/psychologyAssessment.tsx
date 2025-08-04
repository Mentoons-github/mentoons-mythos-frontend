import FAQ from "../../components/about/FAQ";
// import CareerBlog from "../../components/assessment/psychology/CareerBlog";
import IntaligentTypes from "../../components/assessment/psychology/IntaligentTypes";
// import LogicalMathmatical from "../../components/assessment/psychology/LogicalMathmatical";
import PsychologyAssessmentTop from "../../components/assessment/psychology/PsychologyAssessmentTop";
import Tests from "../../components/assessment/psychology/Tests";
import WeAreHiring from "../../components/assessment/weAreHiring";
import { useAppSelector } from "../../hooks/reduxHooks";

const PsychologyAssessment = () => {

  const {user} = useAppSelector((state)=>state.user)
  
  return (
    <div>
      <PsychologyAssessmentTop/>
      <IntaligentTypes/>
      {/* <LogicalMathmatical/> */}
      {/* <StuckCareer/> */}
      <Tests userId = {user?._id}/>
      {/* <CareerBlog/> */}
      <WeAreHiring/>
      <FAQ/>
    </div>
  );
};

export default PsychologyAssessment;
