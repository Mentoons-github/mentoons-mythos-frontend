import { RiArrowDropRightLine } from "react-icons/ri";

export type TWORKSHOPFAQ = {
  id: string;
  question: string;
  answer: string;
};

const FAQCard = ({
  faq,
  isExpanded,
  color = "#E39712",
  onClick,
}: {
  faq: TWORKSHOPFAQ;
  isExpanded: boolean;
  color?: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={
        {
          borderColor: isExpanded ? `${color}80` : "",
          "--hover-border-color": `${color}80`,
        } as React.CSSProperties
      }
      className={`overflow-hidden transition-all duration-300 border-4 cursor-pointer rounded-xl hover:border-[var(--hover-border-color)] bg-white ${
        isExpanded ? "" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center justify-between w-full p-4 text-neutral-700">
        <span className="text-xl font-semibold transition-colors duration-300">
          {faq.question}
        </span>
        <span
          style={
            {
              backgroundColor: isExpanded ? `${color}1A` : "",
              borderColor: isExpanded ? color : "",
              "--hover-bg-color": `${color}1A`,
              "--hover-border-color": color,
            } as React.CSSProperties
          }
          className={`p-1 rounded-full border-2 flex items-center transition-all duration-300 ease-in-out transform ${
            isExpanded
              ? "rotate-90"
              : "hover:bg-[var(--hover-bg-color)] hover:border-[var(--hover-border-color)]"
          }`}
        >
          <RiArrowDropRightLine
            style={{ color: isExpanded ? color : "" }}
            className={`text-4xl transition-colors duration-300 ${
              isExpanded ? "" : "text-neutral-800"
            }`}
          />
        </span>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 text-neutral-600">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
