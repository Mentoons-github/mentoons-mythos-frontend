import { Link } from "react-router-dom";
import { FooterLists } from "../../types/interface";

const FooterLinks = ({
  Links,
  label,
}: {
  Links: FooterLists[] | string[];
  label: string;
}) => {
  return (
    <div className="w-full md:w-fit space-y-3 md:space-y-5 text-center md:text-left">
      <h1 className="font-forum text-lg text-start sm:text-xl md:text-2xl text-[#FEE898] tracking-[1.5px] md:tracking-[2.4px]">
        {label}
      </h1>
      <ul className=" space-y-2 md:space-y-5">
        {Links.map((item, index) => (
          <li
            key={index}
            className="flex justify-start md:justify-start items-center gap-2 md:gap-3 font-mulish"
          >
            <Link
              to={`/${typeof item === "string" ? item : item.value}`}
              className="flex items-center"
            >
              {typeof item === "string" ? (
                <>
                  <span className="text-[#FEE898]">✦</span>
                  <span className="text-white font-bold text-xs sm:text-sm ml-1 sm:ml-2">
                    {item}
                  </span>
                </>
              ) : (
                <div className="flex gap-2 sm:gap-3 items-center">
                  <item.icon className="text-lg sm:text-xl text-[#FEE898]" />
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {item.value}
                  </span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
