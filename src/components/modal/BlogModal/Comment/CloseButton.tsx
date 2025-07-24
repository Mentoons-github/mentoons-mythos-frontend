interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      className="absolute right-2 top-2 text-gray-500 hover:text-red-500 text-2xl z-10"
      onClick={onClose}
    >
      &times;
    </button>
  );
};

export default CloseButton