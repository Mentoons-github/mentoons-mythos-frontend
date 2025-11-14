import { useParams } from "react-router-dom";
import { SUNSHINE } from "../../constants";
import GroupIdtop from "../../components/groups/groupId/GroupIdtop";
import { Intelligence, Sunshine } from "../../types/interface";
import ChatPeople from "../../components/groups/groupId/ChatPeople";
import GroupIdMiddle from "../../components/groups/groupId/GroupIdMiddle";
import ShareIntelligence from "../../components/groups/groupId/ShareIntelligence";
import { INTELLIGENCE } from "../../constants/intelligence";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import {
  getIntelligenceGroupMembersThunk,
  getRashiGroupMembersThunk,
} from "../../features/group/groupThunk";

const isSunshine = (item: Sunshine | Intelligence): item is Sunshine => {
  return (item as Sunshine).rashi !== undefined;
};

const Rashi = () => {
  const { groupId } = useParams();
  const isIntelligence = groupId?.startsWith("int") ?? false;

  const details: Sunshine | Intelligence = isIntelligence
    ? INTELLIGENCE.find((ele) => ele.id === groupId)!
    : SUNSHINE.find((ele) => ele.id === groupId)!;

  const { user } = useAppSelector((state) => state.user);
  const { intelligenceUsers, rashiUsers } = useAppSelector(
    (state) => state.group
  );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const checkAccess = () => {
  //     if (loading) return;

  //     if (!user) {
  //       toast.warning("Please login to access this group");
  //       navigate("/groups");
  //       return;
  //     }

  //     if (isIntelligence) {
  //       // Intelligence group access
  //       if (!user.intelligenceTypes.includes(details.name)) {
  //         toast.warning("You cannot access this group");
  //         navigate("/groups");
  //         return;
  //       }
  //     } else if (isSunshine(details)) {
  //       // Rashi group access
  //       if (
  //         user.astrologyDetail?.sunSign !== details.rashi &&
  //         user.astrologyDetail?.moonSign !== details.rashi
  //       ) {
  //         toast.warning("You cannot access this group");
  //         navigate("/groups");
  //         return;
  //       }
  //     }
  //   };

  //   checkAccess();
  // }, [user, details, isIntelligence, navigate, loading]);

  useEffect(() => {
    if (isIntelligence) {
      dispatch(getIntelligenceGroupMembersThunk(details.name));
    } else if (isSunshine(details)) {
      dispatch(getRashiGroupMembersThunk(details.rashi));
    }
  }, [details, dispatch, isIntelligence]);

  return (
    <div className="">
      <GroupIdtop details={details} isIntelligence={isIntelligence} />
      <ChatPeople
        users={isIntelligence ? intelligenceUsers : rashiUsers}
        isIntelligence={isIntelligence}
        details={details}
        userId={user?._id}
      />
      <GroupIdMiddle isIntelligence={isIntelligence} />
      <ShareIntelligence
        name={details.name}
        isIntelligence={isIntelligence}
        groupId={groupId}
      />
    </div>
  );
};

export default Rashi;
