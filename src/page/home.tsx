import AboutMythos from "../components/home/about";
import MythosBanner from "../components/home/banner";
import BlogsForYou from "../components/home/blogsForYou";
import GroupsSuggested from "../components/home/groupsSuggested/groupsSuggested";
import MembershipPlans from "../components/home/membershipPlans";
import PersonalReport from "../components/home/personalReport";
import ProblemFaced from "../components/home/problemFaced";
import SignUpSection from "../components/home/signUp";
import StepsGuide from "../components/home/stepGuide";
import { useAppSelector } from "../hooks/reduxHooks";

const MythosHome = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      <MythosBanner />
      <AboutMythos />
      <ProblemFaced />
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
