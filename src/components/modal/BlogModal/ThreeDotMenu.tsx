import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ReportOptions from "./Comment/ReportOptions"; // Adjust path as needed

interface ThreeDotsMenuProps {
  from: "blog" | "comment";
  userId?: string;
  Id?: string;
  showBlock?: boolean;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({
  from,
  userId,
  Id,
  showBlock = true,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setShowReport(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <BsThreeDots
        className="text-2xl cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      {/* First-Level Options */}
      {menuOpen && !showReport && (
        <div className="absolute top-6 right-0 bg-white border rounded shadow-md z-50 w-28">
          <button
            onClick={() => {
              setShowReport(true);
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
          >
            Report
          </button>
          {showBlock && (
            <button
              onClick={() => {
                setMenuOpen(false);
                alert("User blocked"); // Optional: dispatch block logic
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Block
            </button>
          )}
        </div>
      )}

      {/* Report Options */}
      {showReport && (
        <div className="absolute top-6 right-0 z-50">
          <ReportOptions from={from} userId={userId} Id={Id} onClose={() => {
            setShowReport(false);
            setMenuOpen(false);
          }} />
        </div>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
