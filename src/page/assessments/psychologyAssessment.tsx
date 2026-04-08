// import CareerBlog from "../../components/assessment/psychology/CareerBlog";
// import LogicalMathmatical from "../../components/assessment/psychology/LogicalMathmatical";
import Tests from "../../components/assessment/psychology/Tests";
import { useAppSelector } from "../../hooks/reduxHooks";

const PsychologyAssessment = () => {

  const {user} = useAppSelector((state)=>state.user)
  
  return (
    <div>
      {/* <PsychologyAssessmentTop/>
      <IntaligentTypes/> */}
      {/* <LogicalMathmatical/> */}
      {/* <StuckCareer/> */}
      <Tests user = {user }/>
      {/* <CareerBlog/> */}
      {/* <WeAreHiring/>
      <FAQ/> */}
    </div>
  );
};

export default PsychologyAssessment;
