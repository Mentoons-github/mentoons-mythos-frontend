import { Globe, Info, Mail, Shield, User } from "lucide-react";
import AstroData from "./astroData";
import { motion, AnimatePresence } from "framer-motion";
import AstroForm from "./astroForm";
import { IAstrologyDetail, IUser } from "../../types";
import { FormEvent } from "react";

interface ProfileDataProps {
  user: IUser;
  formData: {
    birthDate: string;
    birthTime: string;
    longitude: string;
    latitude: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      birthDate: string;
      birthTime: string;
      longitude: string;
      latitude: string;
    }>
  >;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  astroLoading: boolean;
  astrologyDetail?: IAstrologyDetail;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const ProfileData = ({
  user,
  formData,
  isEditing,
  onSubmit,
  setFormData,
  setIsEditing,
  astroLoading,
  astrologyDetail,
}: ProfileDataProps) => {
  return (
    <motion.div
      key="profile-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className=" bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 md:p-8 mb-8 border border-muted-foreground"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className="text-2xl font-semibold-white mb-6 flex items-center space-x-2">
          <User size={24} className="" />
          <span>Personal Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="flex items-center space-x-3 p-4 border border-muted-foreground bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex-shrink-0 w-10 h-10  border border-muted-foreground rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Email Address
              </p>
              <p className="t font-semibold">{user.email}</p>
            </div>
          </motion.div>

          {user.country && (
            <motion.div
              className="flex items-center space-x-3 p-4 border border-muted-foreground rounded-xl hover:bg-opacity-70 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-10 h-10  border border-muted-foreground rounded-lg flex items-center justify-center">
                <Globe size={20} className="" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Country
                </p>
                <p className=" font-semibold">{user.country}</p>
              </div>
            </motion.div>
          )}

          {/* Account Type */}
          {user.isGoogleUser && (
            <motion.div
              className="flex items-center space-x-3 p-4 border border-muted-foreground rounded-xl hover:bg-opacity-70 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-10 h-10 border border-muted-foreground rounded-lg flex items-center justify-center">
                <Shield size={20} className="" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Account Type
                </p>
                <p className=" font-semibold">Google Account</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* About Section */}
        {user.about && (
          <motion.div
            className="mt-8 p-6  rounded-xl border border-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Info size={18} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold ">About Me</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              {user.about}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Astrology Section */}
      <AnimatePresence mode="wait">
        {(!user.astrologyDetail || isEditing) && !astroLoading ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AstroForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AstroData
              userProfile={{
                ...user,
                astrologyDetail: user.astrologyDetail || astrologyDetail!,
              }}
              setIsEditing={setIsEditing}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileData;
