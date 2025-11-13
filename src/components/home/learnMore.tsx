import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Discover = ({
  label,
  textColor = "text-foreground", // default color class
}: {
  label: string;
  textColor?: string;
}) => {
  return (
    <Link to="#" className="flex items-center gap-2 w-fit group">
      <img src="/assets/icons/star.png" alt="star-icon" className="h-3 w-3" />
      <span
        className={`font-bold text-[13px] tracking-[1.3px] font-mulish ${textColor}`}
      >
        {label}
      </span>
      <FaChevronRight
        className={`text-sm transition-transform group-hover:translate-x-2 ${textColor}`}
      />
    </Link>
  );
};

export default Discover;


