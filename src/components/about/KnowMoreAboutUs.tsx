import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postAboutCommentThunk } from "../../features/about&newsletter/about&newsletterThunk";
import { resetAboutNewsletterState } from "../../features/about&newsletter/about&newsletterSlice";
import MythosLoginModal from "../modals/mythosLogin";

const KnowMoreAboutUs = () => {
  // const [formData, setFormData] = useState(() => {
  //   const savedFormData = localStorage.getItem("mythosFormData");
  //   return savedFormData
  //     ? JSON.parse(savedFormData)
  //     : {
  //         name: "",
  //         email: "",
  //         comment: "",
  //       };
  // });

  const dispatch = useAppDispatch();
  const { error, loading, success, message } = useAppSelector(
    (state) => state.about_newsletter
  );
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [singupModal, setSignupModal] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetAboutNewsletterState());
      setFormData({
        name: "",
        email: "",
        comment: "",
      });
    }
    if (error) {
      toast.warning(error);
      dispatch(resetAboutNewsletterState());
    }
  }, [dispatch, error, message, success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleBookCall = () => {
    if (!user) {
      setSignupModal(true);
    } else {
      navigate("/book-call");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // localStorage.setItem("mythosFormData", JSON.stringify(formData));
    dispatch(postAboutCommentThunk(formData));
  };

  return (
    <div className=" bg-[url('/assets/background/section/stars_background.png')] bg-center p-4 md:p-6 pb-12 md:pb-24 flex items-center">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-start justify-start gap-8 md:gap-12 pt-12">
        <motion.div
          className="w-full lg:w-[50%] flex flex-col items-start justify-center px-4 md:px-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl font-semibold text-start self-start md:text-5xl lg:text-6xl py-3 leading-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            KNOW MORE ABOUT US
          </motion.h2>
          <motion.p
            className="text-sm py-6 md:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your email address will not be published. Required fields are marked
            *
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <textarea
              placeholder="Your Comment"
              className="w-full p-4 pr-12 rounded-md active:ring-2 border border-muted-foreground text-foreground focus:ring-1 focus:ring-foreground focus:outline-none"
              rows={5}
              required
              name="comment"
              value={formData.comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            ></textarea>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 pr-12 rounded-md active:ring-2 border border-muted-foreground  text-foreground focus:ring-1 focus:ring-foreground focus:outline-none"
                />
                <FaRegUser className="absolute w-6 transform -translate-y-1/2 right-4 top-1/2 text-foreground" />
              </div>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 pr-12 rounded-md border border-muted-foreground text-foreground active:ring-2 focus:ring-1 focus:ring-foreground focus:outline-none"
                />
                <FaRegEnvelope className="absolute w-6 transform -translate-y-1/2 right-4 top-1/2 text-foreground" />
              </div>
            </div>
            {/* <div className="flex items-center gap-4 mt-8 mb-4 md:mt-12">
              <input
                type="checkbox"
                checked={formData.saveData}
                onChange={handleChange}
              />
              <p className="text-sm text-[#ede8e8d3]">
                Save my name, email, and website in this browser for the next
                time I comment
              </p>
            </div> */}
            <motion.button
              className="flex items-center justify-center mt-3 gap-4 rounded-md px-4 py-2 text-background bg-foreground md:px- w-fit"
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">✦</span>

              <p className="text-lg font-semibold">
                {loading ? "POSTING..." : "POST COMMENT"}
              </p>
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div
          className="w-full lg:w-[50%] flex flex-col gap-8 md:gap-10 items-center justify-between mt-10 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="w-[80%] md:w-[68%]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img src="/assets/about/mythos-book-call.png" className="w-full" />
          </motion.div>
          <motion.p
            className="text-2xl md:text-3xl font-semibold text-center w-full md:w-[30ch]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Book a one-on-one video call session with us now!
            <span className=" mt-2 block">(Coming Soon...)</span>
          </motion.p>
          <motion.button
            className="flex items-center justify-center gap-4 rounded-md px-4 py-2 text-background bg-foreground w-fit"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookCall}
          >
            <span className="text-2xl">✦</span>
            <p className="text-lg font-semibold">BOOK A CALL NOW</p>
          </motion.button>
        </motion.div>
      </div>

      {singupModal && (
        <MythosLoginModal onClose={() => setSignupModal(false)} />
      )}
    </div>
  );
};

export default KnowMoreAboutUs;
