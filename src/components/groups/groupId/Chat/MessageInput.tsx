import { IoIosSend } from "react-icons/io";
import EmojiPickerComponent from "./EmojiPicker";
import { BsEmojiSmile } from "react-icons/bs";

interface MessageInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  showEmojiPicker: boolean;
  onToggleEmojiPicker: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const MessageInput = ({
  text,
  onTextChange,
  onSend,
  showEmojiPicker,
  onToggleEmojiPicker,
  onEmojiSelect
}: MessageInputProps) => {
  return (
    <div className="flex items-center bg-black/80 mt-0 p-2 md:rounded-b-lg space-x-2 relative">
      <BsEmojiSmile
        className="absolute left-4 cursor-pointer text-xl text-white"
        onClick={onToggleEmojiPicker}
      />

      <EmojiPickerComponent
        show={showEmojiPicker}
        onEmojiSelect={onEmojiSelect}
      />

      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        rows={1}
        className="flex-1 pl-10 px-4 py-2 border text-white border-white rounded-md focus:outline-none resize-none"
      />

      <button
        disabled={!text.trim()}
        onClick={onSend}
        className="text-white bg-[#E39712] rounded-full p-2 transition disabled:bg-[#f8c162]"
      >
        <IoIosSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageInput