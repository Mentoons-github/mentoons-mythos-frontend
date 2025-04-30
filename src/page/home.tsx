import HelperList from "../components/helperList/helperList";
import AboutMythos from "../components/home/about";
import MythosBanner from "../components/home/banner";
import BlogsForYou from "../components/home/blogsForYou";
import GroupsSuggested from "../components/home/groupsSuggested/groupsSuggested";
import MembershipPlans from "../components/home/membershipPlans";
import PersonalReport from "../components/home/personalReport";
import ProblemFaced from "../components/home/problemFaced";
import SignUpSection from "../components/home/signUp";
import StepsGuide from "../components/home/stepGuide";
import TypeOfIntelligence from "../components/home/typeOfIntelligence";
import { SignedOut } from "@clerk/clerk-react";

const MythosHome = () => {
  const helps = {
    "Psychology assessment":
      "a thorough assessment of your intelligence based on Howard Gardner’s (theory of 9 intelligences)",
    "Planetary impacts":
      "on your academics and career along with a detailed assessment report will be provided with necessary guidelines ",
    "Get one-on-one": "video call session with our career guides ",
  };
  return (
    <div>
      <MythosBanner />
      <AboutMythos />
      <ProblemFaced />
      <PersonalReport />
      <TypeOfIntelligence />
      <StepsGuide />
      <HelperList data={helps} label="HOW WE HELP YOU" />
      <GroupsSuggested />
      <BlogsForYou />
      <MembershipPlans />
      <SignedOut>
        <SignUpSection />
      </SignedOut>
    </div>
  );
};

export default MythosHome;
