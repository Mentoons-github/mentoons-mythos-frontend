import FAQ from "../components/about/FAQ";
import CreateGroupSection from "../components/groups/CreateGroupSection";
import GroupsCardSection from "../components/groups/GroupsCardSection";
import GroupsHeroSection from "../components/groups/GroupsHeroSection";
import GroupsSunshineCardSection from "../components/groups/GroupsSunshineCardSection";
const MythosGroups = () => {
  return (
    <div>
      <GroupsHeroSection />
      <GroupsCardSection />
      <GroupsSunshineCardSection />
      <CreateGroupSection />
      <FAQ />
    </div>
  );
};

export default MythosGroups;
