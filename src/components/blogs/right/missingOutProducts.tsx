import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const MissingOutProducts = () => {
  return (
    <motion.div
      className="p-10 w-full border border-muted-foreground space-y-10"
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.h1
        className="font-mulish font-bold text-4xl md:w-96"
        variants={itemVariant}
      >
        Products You are missing out on!
      </motion.h1>

      <motion.div
        className="flex justify-center items-center mt-5"
        variants={itemVariant}
      >
        <img
          src="/assets/productv2/conversation-starter-cards-13-16.png"
          alt="conversation-starter"
          className="w-96"
        />
      </motion.div>

      <motion.p
        className="font-inter font-semibold text-xl mt-5 text-center"
        variants={itemVariant}
      >
        Conversation Starter Cards
      </motion.p>
    </motion.div>
  );
};

export default MissingOutProducts;
