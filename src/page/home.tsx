import AboutMythos from "../components/home/about";
import MythosBanner from "../components/home/banner";
import BlogsForYou from "../components/home/blogsForYou";
import GroupsSuggested from "../components/home/groupsSuggested/groupsSuggested";
import MembershipPlans from "../components/home/membershipPlans";
import PersonalReport from "../components/home/personalReport";
import ProblemFaced from "../components/home/problemFaced";
import SignUpSection from "../components/home/signUp";
import StepsGuide from "../components/home/stepGuide";
import { PROBLEMS_FACED_ASTROLOGY } from "../constants";
import { PROBLEMS_FACED_PSYCHOLOGY } from "../constants/problemsFaced";
import { useAppSelector } from "../hooks/reduxHooks";

const MythosHome = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      <MythosBanner />
      <AboutMythos />
      {/* <div className="grid lg:grid-cols-2 space-y-3 lg:space-x-3 ">
        <div className=" md:px-8">
          <BusinessForm />
        </div> */}
        <div className="flex flex-col xl:flex-row  overflow-hidden">
          <div className="flex-1 min-w-0">
            <ProblemFaced text="DAILY LIFE" data={PROBLEMS_FACED_ASTROLOGY} />
          </div>
          <div className="flex-1 min-w-0">
            <ProblemFaced text="CAREER" data={PROBLEMS_FACED_PSYCHOLOGY} />
          </div>
        {/* </div> */}
      </div>
      <PersonalReport />
      <StepsGuide />
      <GroupsSuggested />
      <BlogsForYou />
      <MembershipPlans />
      {!user && <SignUpSection />}
    </div>
  );
};

export default MythosHome;
