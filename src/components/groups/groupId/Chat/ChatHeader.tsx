import { IoMdArrowRoundBack } from "react-icons/io";

interface ChatHeaderProps {
  onBack: () => void;
  groupName?: string;
}

const ChatHeader = ({ onBack }: ChatHeaderProps) => {
  return (
    <div className="relative">
      <div className="bg-white z-10 rounded-full absolute top-2 left-2 flex items-center justify-center w-6 h-6">
        <IoMdArrowRoundBack
        className="text-2xl text-black hover:text-[#E39712] cursor-pointer "
        onClick={onBack}
      />
      </div>
    </div>
  );
};

export default ChatHeader