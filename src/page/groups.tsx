import FAQ from "../components/about/FAQ";
import GroupsCardSection from "../components/groups/GroupsCardSection";
import GroupsHeroSection from "../components/groups/GroupsHeroSection";
import GroupsSunshineCardSection from "../components/groups/GroupsSunshineCardSection";
import { SUNSHINE } from "../constants";
import { INTELLIGENCE } from "../constants/intelligence";
const MythosGroups = () => {
  return (
    <div>
      <GroupsHeroSection />
      <GroupsCardSection />
      <GroupsSunshineCardSection props = {SUNSHINE}/>
      <GroupsSunshineCardSection props =  {INTELLIGENCE}/>
      {/* <CreateGroupSection /> */}
      <FAQ />
    </div>
  );
};

export default MythosGroups;
