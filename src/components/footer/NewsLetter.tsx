import { useState } from "react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { subscribeNewsletterThunk } from "../../features/about&newsletter/about&newsletterThunk";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.about_newsletter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(subscribeNewsletterThunk(email)).unwrap();
      toast.success(result);
      setEmail("");
    } catch (error) {
      toast.warning(error as string);
    }
  };

  return (
    <div className="w-full space-y-6 text-center sm:text-left">
      <h1 className="font-forum text-[18px] sm:text-[20px]  tracking-wide">
        SIGN-UP FOR OUR NEWSLETTER
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full gap-2 sm:items-start"
      >
        <div className="flex w-full max-w-xs sm:max-w-sm ">
          <input
            value={email}
            name="email"
            type="email"
            placeholder="Your email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-foreground outline-none  text-sm rounded-l-sm"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-foreground text-background px-4 py-3  border border-foreground border-l-0 rounded-r-sm"
          >
            <span>✦</span>
            <span className="font-medium font-mulish text-[14px]">
              {loading ? "SUBMITTING" : "SUBMIT"}
            </span>
          </button>
        </div>
        <span className="text-xs sm:text-sm">*We promise not to spam you</span>
      </form>

      <div className="mt-10 md:mt-0">
        <h1 className="font-forum text-[18px] sm:text-[20px] md:text-[24px] tracking-wide">
          SOCIAL MEDIA
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {[FaFacebookF, FaTwitter, FaLinkedinIn, BiLogoInstagramAlt].map(
            (Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground hover:scale-110 transition-all duration-300"
              >
                <Icon className="text-card" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
