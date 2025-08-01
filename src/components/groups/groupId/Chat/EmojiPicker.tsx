import EmojiPicker from "emoji-picker-react";

interface EmojiPickerComponentProps {
  show: boolean;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerComponent = ({ show, onEmojiSelect }: EmojiPickerComponentProps) => {
  if (!show) return null;

  return (
    <div className="absolute bottom-14 left-0 z-50">
      <EmojiPicker
        onEmojiClick={(emojiData) => onEmojiSelect(emojiData.emoji)}
        height={350}
      />
    </div>
  );
};

export default EmojiPickerComponent