import { CONTACT_INFO } from "../../constants";
import FooterLinks from "./footerLinks";
import { ABOUT, QUICKLINKS } from "../../constants/footer";
import NewsLetter from "../footer/NewsLetter";

const MythosFooter = () => {
  return (
    <footer className="w-full  border-t ">
      <div className="py-10 px-5 flex justify-center items-center">
        <div className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-10 w-full gap-8">
          <div className="block md:hidden">
            <NewsLetter />
          </div>

          {[CONTACT_INFO, ABOUT, QUICKLINKS].map((items, index) => (
            <FooterLinks
              key={index}
              Links={items}
              label={
                index === 0
                  ? "CONTACT INFO"
                  : index === 1
                  ? "ABOUT"
                  : "QUICK LINKS"
              }
            />
          ))}

          <div className="hidden md:block">
            <NewsLetter />
          </div>

        </div>
      </div>

      <div className="border-t border-t-muted-foreground px-5 py-4 flex flex-col sm:flex-row justify-center items-center text-xs sm:text-sm ">
        <p>© {new Date().getFullYear()} Mentoons Mythos. All rights reserved.</p>
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
