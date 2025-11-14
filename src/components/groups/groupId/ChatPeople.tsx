import { motion } from "framer-motion";
// import { CHAT_PEOPLE } from "../../../constants/sunshine";
import MythosButton from "../../home/button";
import { Intelligence, Sunshine } from "../../../types/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUser } from "../../../types";
import { FaUser } from "react-icons/fa";

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

const ChatPeople = ({
  users,
  userId,
  isIntelligence,
  details,
}: {
  users: IUser[];
  userId?: string;
  isIntelligence: boolean;
  details: Sunshine | Intelligence;
}) => {

  const navigate = useNavigate();
  const handleStartChat = () => {
    const isMember = users.some((user) => user._id === userId);
    if (!userId) {
      toast.warning("Please Login to continue chatting");
      return;
    }
    if (!isMember) {
      toast.warning("You are not member of this group");
      return;
    }
    navigate(`chat`, { state: { details } });
  };

  return (
    <motion.div
      className="px-6 py-10 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div className="text-center mb-10" variants={fadeInUp}>
        <motion.h1
          className="text-2xl sm:text-3xl font-bold tracking-wider   max-w-xl mx-auto"
          variants={fadeInUp}
        >
          CHAT WITH PEOPLE HAVING THE SAME{" "}
          {isIntelligence ? "INTELLIGENCE" : "RASHI"} AS YOU!
        </motion.h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6"
        variants={fadeInUp}
      >
        {users.length === 0 ? (
          <div className="col-span-full text-center py-10">
            No users found in this group
          </div>
        ) : (
          users.map((data, ind) => (
            <motion.div
              key={data._id}
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: ind * 0.2 }}
            >
              {data.profilePicture ? (
                <motion.img
                  src={data.profilePicture}
                  alt={data.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                  // variants={floatImage}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-foreground text-background rounded-full">
                  <FaUser className="text-sm sm:text-lg" />
                </div>
              )}
              <div className="max-w-[220px] md:max-w-full">
                <motion.h3
                  className="text-lg font-semibold "
                  // variants={fadeInUp}
                >
                  {data._id === userId
                    ? "You"
                    : `${data.firstName} ${data.lastName}`}
                </motion.h3>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <div className="mt-10 flex justify-center ">
        <MythosButton
          label="START CHATTING"
          onClick={handleStartChat}
        />
      </div>
      {/* <GroupChat groupId={details?.id} groupName = {details.name}/> */}
    </motion.div>
  );
};

export default ChatPeople;
