import { CONTACT_INFO } from "../../constants";
import FooterLinks from "./footerLinks";
import NewsLetter from "../footer/NewsLetter";
import { ABOUT, EXPLORE } from "../../constants/footer";

const MythosFooter = () => {
  return (
    <footer className="w-full  border-t ">
      <div className="py-10 md:py-20 px-5 md:px-14 flex justify-center ">
        <div className="flex flex-col-reverse md:flex-row flex-wrap justify-between md:gap-10 w-full gap-8">
          <div className="block md:hidden">
            <NewsLetter />
          </div>

          {[CONTACT_INFO, ABOUT, EXPLORE].map((items, index) => (
            <FooterLinks
              key={index}
              Links={items}
              label={
                index === 0
                  ? "CONTACT INFO"
                  : index === 1
                    ? "ABOUT"
                    : "EXPLORE"
              }
            />
          ))}

          <div className="hidden md:block ">
            <NewsLetter />
          </div>
        </div>
      </div>

      <div className="border-t border-t-muted-foreground px-5 py-4 flex flex-col sm:flex-row justify-center items-center text-xs sm:text-sm ">
        <p>
          © {new Date().getFullYear()} Mentoons Mythos. All rights reserved.
        </p>
        {/* <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms & Conditions
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default MythosFooter;
