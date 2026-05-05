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
    (state) => state.about_newsletter,
  );
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
    email: user?.email ?? "",
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
    <div className="bg-[url('/assets/background/section/stars_background.png')] bg-center py-16 lg:py-24 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Know More About Us
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-xl mb-6">
            Have questions about our assessments or workshops? Drop your message
            and our team will get back to you with the right guidance.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* TEXTAREA */}
            <textarea
              placeholder="Write your message..."
              name="comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full p-4 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-1 focus:ring-foreground outline-none"
              rows={5}
              required
            />

            {/* INPUT ROW */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-1 focus:foreground-white outline-none"
                />
                <FaRegUser className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-1 focus:ring-foreground outline-none"
                />
                <FaRegEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-background bg-foreground font-semibold w-fit"
            >
              ✦ {loading ? "Posting..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src="/assets/about/mythos-book-call.png"
            className="w-[70%] md:w-[60%]"
            alt="Book call"
          />

          <h3 className="text-2xl md:text-3xl font-semibold max-w-md">
            Talk to our experts directly
          </h3>

          <p className="text-gray-400 max-w-md">
            Get personalized guidance through a one-on-one video session
            designed to help you make the right decisions.
          </p>

          <motion.button
            onClick={handleBookCall}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-foreground text-background font-semibold"
          >
            ✦ Book a Call
          </motion.button>

          <span className="text-sm text-gray-500">(Coming Soon)</span>
        </motion.div>
      </div>

      {singupModal && (
        <MythosLoginModal onClose={() => setSignupModal(false)} />
      )}
    </div>
  );
};

export default KnowMoreAboutUs;
