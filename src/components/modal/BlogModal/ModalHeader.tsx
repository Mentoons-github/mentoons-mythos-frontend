interface ModalHeaderProps {
  title?: string;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
    
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button
        className="text-gray-500 hover:text-red-500 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default ModalHeader;