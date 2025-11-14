interface EmployeeButtonProps {
  text: string;
  onClick: () => void;
}
const EmployeeButton = ({ text, onClick }: EmployeeButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="px-4 py-2 flex bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
      >
        + <span className="hidden md:block">{text} </span>
      </button>
    </div>
  );
};

export default EmployeeButton;
