import { useAppSelector } from "../../../hooks/reduxHooks";
import RecentPosts from "./recentPosts";
import TopLeftSection from "./topLeftSection";

const TopSection = () => {
   const {user} = useAppSelector((state)=>state.user)

  const userId = user?._id
  return (
    <div className="md:flex ">
      <div className="md:w-[47rem]">
        <TopLeftSection userId = {userId??""}/>
      </div>
      <div className="md:ml-16 ml-2 mt-12 md:w-2/5 ">
        <RecentPosts userId = {userId??""}/>
      </div>
    </div>
  );
};

export default TopSection;
