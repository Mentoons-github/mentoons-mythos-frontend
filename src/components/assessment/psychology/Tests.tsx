import { motion } from "framer-motion";
import { INTELLIGENCE } from "../../../constants/intelligence";
import { useNavigate } from "react-router-dom";
import useSignInSignUp from "../../../hooks/useSignInSignUpModal";
import { IUser } from "../../../types";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatImage = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Tests = ({ user }: { user?: IUser | null }) => {
  const { showModal } = useSignInSignUp();

  const navigate = useNavigate();
  const handleStart = (name: string) => {
    if (!user?._id) {
      showModal("Assessment");
      return;
    }
    navigate(`${name}`);
  };
  return (
    <motion.div
      className=" lg:py-16 md:py-8 py-2 px-2  md:px-12 bg-[url('/assets/background/section/stars_background.png')] bg-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl md:text-5xl font-bold text-foreground/80 mb-6 md:mb-6 lg:mb-12 leading-tight tracking-wider"
        variants={fadeInUp}
      >
        Take Our Assessment
      </motion.h1>

      <motion.div variants={fadeInUp} className="mb-10">
        {user?.takeInitialAssessment ? (
          <div className="border border-border rounded-2xl p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Your Intelligence Profile
            </h2>

            <p className="text-muted-foreground mb-4">
              Based on your initial assessment, here are your top intelligence
              areas:
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-3">
                {user.intelligenceTypes.map((type, index) => {
                  const matched = INTELLIGENCE.find(
                    (item) => item.intelligence === type,
                  );

                  return (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium shadow-sm"
                    >
                      {matched?.name || type}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className=" border border-dashed border-border rounded-2xl p-6 text-center">
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Discover Your Intelligence Type
            </h2>

            <p className="text-muted-foreground mb-4">
              Take the initial assessment to unlock your personalized
              intelligence profile.
            </p>

            <button
              onClick={() => handleStart("/initialassessment")}
              className="bg-foreground text-background px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              Take Initial Assessment
            </button>
          </div>
        )}
      </motion.div>

      <motion.div className="grid grid-cols-2  lg:grid-cols-3 gap-2 md:gap-12 ">
        {INTELLIGENCE.map((data, ind) => (
          <motion.div
            key={ind}
            className="border border-muted-foreground shadow-xl flex flex-col justify-between rounded-xl p-2 md:p-8 space-y-4 transition-transform duration-300 hover:scale-[1.01] md:min-h-[580px]"
            variants={containerVariants}
            onClick={() => handleStart(data.intelligence)}
          >
            <motion.div className="space-y-2 sm:space-y-5">
              <motion.div
                className="flex items-center justify-center rounded-2xl"
                // style={{ backgroundColor: data.color }}
              >
                <motion.img
                  variants={floatImage}
                  src={data.imageUrl}
                  alt="career"
                  className="w-36 h-36 bg-white sm:w-96 sm:h-72 object-cover rounded-lg"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.h2
                  // variants={fadeInUp}
                  className="md:text-2xl font-bold tracking-wider lg:flex gap-2"
                >
                  {data.name}{" "}
                </motion.h2>
                <p className="text-sm md:text-lg font-medium text-muted-foreground">
                  {data.sub}
                </p>
              </motion.div>

              <motion.p variants={fadeInUp} className="md:text-lg ">
                🕒 <span className="font-semibold">Time:</span> Approximately 10
                minutes
              </motion.p>

              {/* <motion.p variants={fadeInUp} className="md:text-lg ">
                🎯 <span className="font-semibold">Ages:</span> 20+
              </motion.p> */}
            </motion.div>

            <div className="sm:flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground px-6 py-2 rounded-2xl text-background font-semibold text-lg"
              >
                START TEST
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Tests;
