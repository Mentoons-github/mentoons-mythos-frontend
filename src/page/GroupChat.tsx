import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { Chat } from "../types/redux/chatInterfaces";
import { getChatThunk } from "../features/chat/chatThunk";
import {
  joinGroup,
  listenToGroupMessages,
  removeGroupMessageListener,
  sendGroupMessage,
} from "../socket/events/chatEvents";
import ChatHeader from "../components/groups/groupId/Chat/ChatHeader";
import MessagesList from "../components/groups/groupId/Chat/MessageList";
import MessageInput from "../components/groups/groupId/Chat/MessageInput";
import ChatRightSide from "../components/groups/groupId/Chat/ChatRightSide";
import { toast } from "sonner";
import { SUNSHINE } from "../constants";
import { INTELLIGENCE } from "../constants/intelligence";
import { Intelligence, Sunshine } from "../types/interface";

const GroupChat = () => {
  const dispatch = useAppDispatch();
  const { data: chatData } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);
  const { groupId } = useParams();
  // const location = useLocation();
  // const details = location.state?.details;
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const details =
    SUNSHINE.find((item) => item.id === groupId) ||
    INTELLIGENCE.find((item) => item.id === groupId);

  const isSunshine = (
    details: Sunshine | Intelligence
  ): details is Sunshine => {
    return (details as Sunshine).rashi !== undefined;
  };

  useEffect(() => {
    if (!details) {
      toast.warning("Group not found");
      navigate("/groups"); 
      return;
    }

    if (!user) {
      toast.warning("Please login to access this group");
      navigate("/login");
      return;
    }

    if (isSunshine(details)) {
      if (
        user.astrologyDetail?.sunSign !== details.rashi &&
        user.astrologyDetail?.moonSign !== details.rashi
      ) {
        toast.warning("You cannot access this group");
        navigate("/groups");
        return;
      }
    } else {
      if (!user.intelligenceTypes.includes(details.name)) {
        toast.warning("You cannot access this group");
        navigate("/groups");
        return;
      }
    }
  }, [details, user, navigate]);

  const [messages, setMessages] = useState<Chat[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!groupId) return;
    dispatch(getChatThunk(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (chatData && chatData.length > 0) {
      const formatted = chatData.map((chat: Chat) => ({
        sender: {
          _id: chat.sender?._id,
          firstName: chat.sender?.firstName || "Unknown",
          lastName: chat.sender?.lastName,
          profilePicture: chat.sender?.profilePicture || "",
        },
        message: chat.message,
        createdAt: chat.createdAt,
      }));
      setMessages(formatted);
    }
  }, [chatData]);

  useEffect(() => {
    if (!groupId) return;
    joinGroup(groupId);
    listenToGroupMessages((data) => {
      if (data.groupId === groupId) {
        const newMsg = {
          sender: {
            _id: data.sender._id,
            firstName: data.sender?.firstName,
            lastName: data.sender?.lastName,
            profilePicture: data.sender?.profilePicture || "",
          },
          message: data.message,
          createdAt: data.createdAt || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    return () => {
      removeGroupMessageListener();
    };
  }, [groupId]);

  const handleSend = () => {
    if (text.trim() === "") return;
    if (!user?._id || !groupId) return;
    sendGroupMessage(groupId, text, user?._id);

    setShowEmojiPicker(false);
    setText("");
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleContainerClick = () => {
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    setMessages([]);
  }, [groupId]);

  return (
    <div className="flex items-start justify-center h-screen gap-3 md:p-4 md:px-10">
      <div className="md:w-[70%] w-full md:rounded-xl relative flex flex-col h-full">
        <ChatHeader onBack={() => navigate(-1)} groupName={details?.name} />

        <MessagesList
          userId={user?._id}
          messages={messages}
          backgroundImage={details?.imageUrl}
          onContainerClick={handleContainerClick}
        />

        <MessageInput
          text={text}
          onTextChange={setText}
          onSend={handleSend}
          showEmojiPicker={showEmojiPicker}
          onToggleEmojiPicker={handleToggleEmojiPicker}
          onEmojiSelect={handleEmojiSelect}
        />
      </div>
      <div className="w-[30%] hidden md:block">
        <ChatRightSide />
      </div>
    </div>
  );
};

export default GroupChat;
