import { MdLocationOn } from "react-icons/md";
import { FooterLists } from "../../types/interface";
import MapComponent from "../footer/Map";
import { useNavigate } from "react-router-dom";

const FooterLinks = ({
  Links,
  label,
}: {
  Links: FooterLists[];
  label: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-fit space-y-3 md:space-y-5 text-center md:text-left">
      <h1 className="font-forum text-lg text-start sm:text-xl md:text-2xl tracking-[1.5px] md:tracking-[2.4px]">
        {label}
      </h1>
      <ul className=" space-y-2 md:space-y-5">
        {Links.map((item, index) => (
          <li
            key={index}
            className="flex justify-start md:justify-start items-center gap-2 md:gap-3 font-mulish"
          >
            <div className="flex items-center">
              {label == "ABOUT" || label == "QUICK LINKS" ? (
                <div
                  onClick={() => navigate(item.url as string)}
                  className="cursor-pointer"
                >
                  <span className="text-">✦</span>
                  <span className=" font-bold text-xs sm:text-sm ml-1 sm:ml-2">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-3 items-center">
                  {item.icon && <item.icon className="text-lg sm:text-xl" />}

                  {item.value?.includes("@") ? (
                    // if it's an email
                    <a
                      href={`mailto:${item.value}`}
                      className=" font-bold text-xs sm:text-sm "
                    >
                      {item.value}
                    </a>
                  ) : item.value?.match(/^\+?\d/) ? (
                    // if it's a phone number
                    <a
                      href={`tel:${item.value}`}
                      className=" font-bold text-xs sm:text-sm "
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className=" font-bold text-xs sm:text-sm">
                      {item.value}
                    </span>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
        {label == "CONTACT INFO" && (
          <div className="w-full space-y-2 ">
            <div className="flex gap-2 sm:gap-3 items-center font-bold text-xs sm:text-sm mb-5">
              <MdLocationOn className="text-lg sm:text-xl" />
              Domlur, Bangalore{" "}
            </div>{" "}
            <MapComponent />{" "}
          </div>
        )}
      </ul>
    </div>
  );
};

export default FooterLinks;
