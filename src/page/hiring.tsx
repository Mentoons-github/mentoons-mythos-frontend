import HiringBanner from "../components/hiring/banner";
import Jobs from "../components/hiring/jobs";
import Summary from "../components/hiring/summary";
import WhyShouldJoin from "../components/hiring/whyShouldJoin";

const Hiring = () => {
  return (
    <div className="bg-black">
      <HiringBanner />
      <Jobs />
      <Summary />
      <WhyShouldJoin />
    </div>
  );
};

export default Hiring;
