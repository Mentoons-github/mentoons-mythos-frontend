import { motion } from "framer-motion";

const ChatRightSide = () => {
  return (
    <motion.div
      className="w-full h-[660px]  border-l flex flex-col  items-center justify-around "
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img src="/assets/groups/contactUs.png" className="w-full " />
      </motion.div>
      <motion.p
        className="text-2xl md:text-3xl font-semibold text-center text-[#E39712] w-full md:w-[20ch]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Book a one-on-one video call session with us now!
        <span className="block text-foreground">(Coming Soon...)</span>
      </motion.p>
      <motion.button
        className="flex items-center rounded-2xl mb-2 justify-center gap-2 px-5 py-4 text-black bg-[#E39712]  w-fit"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // onClick={() => {
        //   navigate("/bookings");
        // }}
      >
        <span className="text-white">✦</span>
        <p>BOOK A CALL NOW</p>
      </motion.button>
    </motion.div>
  );
};

export default ChatRightSide;
