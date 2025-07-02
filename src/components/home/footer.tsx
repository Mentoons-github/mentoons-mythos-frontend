import { CAREER, CONTACT_INFO, PLANET } from "../../constants";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import FooterLinks from "./footerLinks";

const MythosFooter = () => {
  return (
    <footer className="w-full py-10 px-5 md:px-20 flex justify-center items-center bg-black border-t border-t-[#FEE898]">
      <div className="flex flex-col-reverse md:grid md:grid-cols-4 md:gap-16 w-full max-w-7xl gap-8">

        {[CONTACT_INFO, CAREER, PLANET].map((items, index) => (
          <FooterLinks
            key={index}
            Links={items}
            label={
              index === 0 ? "CONTACT INFO" : index === 1 ? "CAREER" : "PLANET"
            }
          />
        ))}
        <div className="w-full space-y-6 text-center sm:text-left">
          <h1 className="font-forum text-[18px] sm:text-[20px] md:text-[24px] text-[#FEE898] tracking-wide">
            SIGN-UP FOR OUR NEWSLETTER
          </h1>
          <div className="flex flex-col items-center w-full gap-2 sm:items-start">
            <div className="flex w-full max-w-xs sm:max-w-sm">
              <input
                type="text"
                placeholder="Email..."
                className="w-full p-3 border border-[#FEE898] outline-none text-[#FEE898]"
              />
              <button className="flex items-center gap-2 px-4 py-3 bg-[#9FE9FF] border border-[#FEE898] border-l-0">
                <span className="text-[#FEE898]">✦</span>
                <span className="font-medium font-mulish text-[13px]">
                  SUBMIT
                </span>
              </button>
            </div>
            <span className="text-xs text-[#FEE898] sm:text-sm">
              We promise not to spam you
            </span>
          </div>
          <div className="mt-10 md:mt-0">
            <h1 className="font-forum text-[18px] sm:text-[20px] md:text-[24px] text-[#FEE898] tracking-wide ">
              SOCIAL MEDIA
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, BiLogoInstagramAlt].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9FE9FF]"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MythosFooter;
