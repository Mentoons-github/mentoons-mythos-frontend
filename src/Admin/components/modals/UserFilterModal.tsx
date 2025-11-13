const UserFilterModal = ({
  onClose,
  data,
  onSelect,

}: {
  onClose: () => void;
  data: string;
  onSelect: (value: string) => void;
}) => {
  const intelligenceList = [
    "Linguistic",
    "Logical",
    "Spatial",
    "Music",
    "Sports",
    "Interpersonal",
    "Intrapersonal",
    "Naturalistic",
    "Existential",
  ];

  const astrologyList = [
    "Mesha",
    "Vrishabha",
    "Mithuna",
    "Karka",
    "Simha",
    "Kanya",
    "Tula",
    "Vrishchika",
    "Dhanu",
    "Makara",
    "Kumbha",
    "Meena",
  ];

  const blockLsit = ["Blocked", "Not Blocked"];

  const list =
    data === "Intelligence"
      ? intelligenceList
      : data === "Rashi"
      ? astrologyList
      : blockLsit;

  return (
    <div
      className="fixed inset-0 z-40 flex  items-start pt-28 left-80"
      onClick={onClose} 
    >
      <div
        className="bg-[#ece6dc] rounded-lg shadow-2xl px-2 py-6 hide-scrollbar w-full max-w-[150px] max-h-[220px] relative overflow-y-auto"
        onClick={
          (e) => e.stopPropagation()

        }
      >
        <ul className="space-y-2">
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className="px-2 py-2 rounded-md bg-black text-white hover:text-gray-300 transition-all duration-200 cursor-pointer text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFilterModal;
