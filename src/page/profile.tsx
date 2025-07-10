import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Star } from "lucide-react";
import AstroForm from "../components/profile/astroForm";
import AstroData from "../components/profile/astroData";
import { useAuth } from "../hooks/auth/useAuth";

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
  birthDate: string;
  birthTime: string;
  longitude: string;
  latitude: string;
  hasAstroData: boolean;
}

const Profile = () => {
  const { user } = useAuth();

  console.log("user data recieved :", user);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Devan PS",
    email: "devanps212@gmail.com",
    avatar: null,
    birthDate: "2000-08-22",
    birthTime: "14:30",
    longitude: "-74.0060",
    latitude: "40.7128",
    hasAstroData: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    birthDate: userProfile.birthDate,
    birthTime: userProfile.birthTime,
    longitude: userProfile.longitude,
    latitude: userProfile.latitude,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserProfile((prev: UserProfile) => ({
      ...prev,
      ...formData,
      hasAstroData: true,
    }));
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Cosmic Profile
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-6 mb-6">
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-500">
                <User size={32} className="text-gray-300" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star size={12} className="text-black" />
              </motion.div>
            </motion.div>

            <div>
              <motion.h2
                className="text-2xl font-semibold text-white"
                variants={itemVariants}
              >
                {userProfile.name}
              </motion.h2>
              <motion.p className="text-gray-400" variants={itemVariants}>
                {userProfile.email}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Conditional Content */}
        <AnimatePresence mode="wait">
          {!userProfile.hasAstroData || isEditing ? (
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
                onSubmit={handleFormSubmit}
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
                userProfile={userProfile}
                setIsEditing={setIsEditing}
                setUserProfile={setUserProfile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;
