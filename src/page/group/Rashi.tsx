import { useParams } from "react-router-dom";
import { SUNSHINE } from "../../constants";
import GroupIdtop from "../../components/groups/groupId/GroupIdtop";
import { Sunshine } from "../../types/interface";
import ChatPeople from "../../components/groups/groupId/ChatPeople";
import GroupIdMiddle from "../../components/groups/groupId/GroupIdMiddle";
import ShareIntelligence from "../../components/groups/groupId/ShareIntelligence";

const Rashi = () => {
  const { groupId } = useParams();
  const details: Sunshine | undefined = SUNSHINE.find(
    (ele) => ele.id === groupId
  );

  return (
    <div className="">
      <GroupIdtop details={details} />
      <ChatPeople/>
      <GroupIdMiddle/>
      <ShareIntelligence name={details?.name}/>
    </div>
  );
};

export default Rashi;
