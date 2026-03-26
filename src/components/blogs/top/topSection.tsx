import { useAppSelector } from "../../../hooks/reduxHooks";
import RecentPosts from "./recentPosts";
import TopLeftSection from "./topLeftSection";

const TopSection = () => {
   const {user} = useAppSelector((state)=>state.user)

  const userId = user?._id
  return (
    <div className="lg:flex ">
      <div className="lg:w-[47rem] ">
        <TopLeftSection userId = {userId??""}/>
      </div>
      <div className="lg:ml-16 mt-12 lg:w-2/5 border p-2 rounded-md">
        <RecentPosts userId = {userId??""}/>
      </div>
    </div>
  );
};

export default TopSection;
