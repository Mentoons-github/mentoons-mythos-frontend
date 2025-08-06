import { useParams } from "react-router-dom";
import { SUNSHINE } from "../../constants";
import GroupIdtop from "../../components/groups/groupId/GroupIdtop";
import { Intelligence, Sunshine } from "../../types/interface";
import ChatPeople from "../../components/groups/groupId/ChatPeople";
import GroupIdMiddle from "../../components/groups/groupId/GroupIdMiddle";
import ShareIntelligence from "../../components/groups/groupId/ShareIntelligence";
import { INTELLIGENCE } from "../../constants/intelligence";
import { useAppSelector } from "../../hooks/reduxHooks";

const Rashi = () => {
  const { groupId } = useParams();
  const isIntelligence = groupId?.startsWith("int") ?? false
  const details: Sunshine | Intelligence = groupId?.startsWith(
    "int"
  )
    ? INTELLIGENCE.find((ele) => ele.id === groupId)!
    : SUNSHINE.find((ele) => ele.id === groupId)!;
  
  const {user} = useAppSelector((state)=>state.user)



  return (
    <div className="">
      <GroupIdtop details={details} isIntelligence = {isIntelligence}/>
      <ChatPeople isIntelligence = {isIntelligence} details = {details} userId = {user?._id}/>
      <GroupIdMiddle isIntelligence = {isIntelligence}/>
      <ShareIntelligence name={details?.name} isIntelligence = {isIntelligence} groupId = {groupId}/>
    </div>
  );
};

export default Rashi;
