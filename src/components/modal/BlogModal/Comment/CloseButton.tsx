interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      className="absolute right-2 top-2 hover:text-muted-foreground text-2xl z-10"
      onClick={onClose}
    >
      &times;
    </button>
  );
};

export default CloseButton