import RecentPosts from "./recentPosts";
import TopLeftSection from "./topLeftSection";

const TopSection = () => {
  return (
    <div className="flex ">
      <div className="w-[47rem]">
        <TopLeftSection />
      </div>
      <div className="ml-16 mt-12 w-2/5 md:block hidden">
        <RecentPosts />
      </div>
    </div>
  );
};

export default TopSection;
