import { IconType } from "react-icons/lib";

const MythosButton = ({
  label,
  bgColor = "var(--foreground)",
  textColor = "var(--background)",
  icon: Icon,
  onClick = () => {},
}: {
  label: string;
  bgColor?: string;
  textColor?: string;
  icon?: IconType;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 z-3 cursor-pointer rounded-md hover:opacity-90 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {Icon ? (
        <div className="flex items-center justify-center w-10 h-10 border rounded-full">
          <Icon className="w-5 h-5" style={{ color: textColor }} />
        </div>
      ) : (
        <img
          src="/assets/icons/star.png"
          alt="star-icon"
          className="h-3 w-3 sm:h-4 sm:w-4"
        />
      )}

      <span className="font-bold text-xs sm:text-sm tracking-[1px] sm:tracking-[1.3px] font-mulish">
        {label}
      </span>
    </button>
  );
};

export default MythosButton;

// Usage examples:
// <MythosButton label="EXPLORE MORE" />
// <MythosButton label="EXPLORE MORE" bgColor="#FF5733" textColor="#FFFFFF" />
// <MythosButton label="EXPLORE MORE" bgColor="var(--primary)" textColor="var(--primary-foreground)" />