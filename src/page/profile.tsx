import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Star,
  BookOpen,
  Edit,
  Globe,
  Info,
  Mail,
  Shield,
} from "lucide-react";
import AstroForm from "../components/profile/astroForm";
import AstroData from "../components/profile/astroData";
import ProfileBlogs from "../components/profile/blogs";
import { IUser } from "../types";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import {
  fetchUserData,
  updateUserData,
  userLogout,
} from "../features/user/userThunk";
import { fetchCurrentUserBlog } from "../features/blog/blogThunk";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";
import ProfileUpload from "../components/modal/profileUpload";
import SuccessLoader from "../components/loader/successLoader";
import EditProfile from "../components/profile/edit/editProfile";
import ChangePassword from "../components/profile/edit/password";
import { CgPassword } from "react-icons/cg";
import { getFullCountryName } from "../utils";

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    user,
    error: userError,
    loading: userLoading,
  } = useAppSelector((state) => state.user);
  const {
    result: astrologyDetail,
    error: astroError,
    loading: astroLoading,
  } = useAppSelector((state) => state.astro);
  const {
    data: userBlogs,
    error: blogError,
    loading: blogsLoading,
  } = useAppSelector((state) => state.blog);

  const [activeTab, setActiveTab] = useState<
    "profile" | "blogs" | "edit" | "password"
  >("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    heading: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    birthDate: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    birthTime: user?.timeOfBirth || "",
    longitude: user?.longitude || "",
    latitude: user?.latitude || "",
  });

  const debouncedFetchUserData = useRef(
    debounce(() => {
      dispatch(fetchUserData());
    }, 1000)
  ).current;

  const debouncedFetchUserBlogs = useRef(
    debounce(() => {
      dispatch(fetchCurrentUserBlog());
    }, 1000)
  ).current;

  useEffect(() => {
    if (user) {
      setFormData({
        birthDate: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        birthTime: user.timeOfBirth || "",
        longitude: user.longitude || "",
        latitude: user.latitude || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user && !userLoading) {
      console.log("Fetching user data...");
      debouncedFetchUserData();
    }
    return () => {
      debouncedFetchUserData.cancel();
    };
  }, [user, userLoading]);

  useEffect(() => {
    if (
      (userError &&
        (userError.includes("Token expired") ||
          userError.includes("Unauthorized"))) ||
      (blogError &&
        (blogError.includes("Token expired") ||
          blogError.includes("Unauthorized")))
    ) {
      dispatch(userLogout());
    }
  }, [userError, blogError, dispatch]);

  const hasFetchedBlogs = useRef(false);

  useEffect(() => {
    if (
      user &&
      activeTab === "blogs" &&
      !blogsLoading &&
      userBlogs.length === 0 &&
      !blogError &&
      !hasFetchedBlogs.current
    ) {
      console.log("Fetching user blogs...");
      hasFetchedBlogs.current = true;
      debouncedFetchUserBlogs();
    }

    return () => {
      debouncedFetchUserBlogs.cancel();
    };
  }, [user, activeTab, blogsLoading, userBlogs.length, blogError]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedProfile: IUser = {
        ...user,
        dateOfBirth: new Date(formData.birthDate),
        timeOfBirth: formData.birthTime,
        longitude: formData.longitude,
        latitude: formData.latitude,
        astrologyDetail: user.astrologyDetail || {},
      };

      await dispatch(updateUserData({ user: updatedProfile })).unwrap();
      await dispatch(fetchUserData()).unwrap();
      setSuccessMessage({
        heading: "Upload Successful!",
        description: "Your profile picture has been updated",
      });
      setIsEditing(false);
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      if (err === "Token expired" || err === "Unauthorized") {
        dispatch(userLogout());
      }
    }
  };

  const onClose = async (success: boolean = false) => {
    if (success) {
      setUploadSuccess(true);
      setTimeout(() => {
        setShowUpload(false);
        setUploadSuccess(false);
        dispatch(fetchUserData());
      }, 2000);
    } else {
      setShowUpload(false);
      await dispatch(fetchUserData());
    }
  };

  const handleSuccessModalClose = () => {
    setUploadSuccess(false);
    setShowUpload(false);
    dispatch(fetchUserData());
    setActiveTab("profile");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  if (userLoading || !user) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {userLoading ? "Loading Profile..." : "Please log in"}
          </motion.h1>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
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

        {(userError || astroError || blogError) && (
          <motion.div
            className="bg-red-600 bg-opacity-50 rounded-lg p-4 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>
              {userError || astroError || blogError}
              {(userError === "Token expired" ||
                userError === "Unauthorized" ||
                blogError === "Token expired" ||
                blogError === "Unauthorized") &&
                " Please log in again."}
            </p>
          </motion.div>
        )}

        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="relative w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-500">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-gray-300" />
                )}
                <motion.button
                  whileHover={{ y: 3 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  onClick={() => setShowUpload(true)}
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-gray-500 to-gray-900 cursor-pointer rounded-full w-6 h-6 flex justify-center items-center border-2 border-gray-800"
                >
                  <FaPlus className="text-xs text-white" />
                </motion.button>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star size={14} className="text-gray-900" />
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.h2
                className="text-3xl font-bold text-white mb-1"
                variants={itemVariants}
              >
                {`${user.firstName} ${user.lastName}`}
              </motion.h2>
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                variants={itemVariants}
              >
                <Mail size={16} />
                <span>{user.email}</span>
              </motion.div>
              {user.role && user.role !== "user" && (
                <motion.div
                  className="inline-flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-purple-800 px-3 py-1 rounded-full text-sm mt-2"
                  variants={itemVariants}
                >
                  <Shield size={14} />
                  <span className="capitalize font-medium">{user.role}</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          variants={itemVariants}
        >
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-white text-black shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span>Profile</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "edit"
                ? "bg-white text-black shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Edit size={20} />
              <span>Edit</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "blogs"
                ? "bg-white text-black shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen size={20} />
              <span>My Blogs</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "password"
                ? "bg-white text-black shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-2">
              <CgPassword size={20} />
              <span>Change Password</span>
            </div>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced User Details Section */}
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <User size={24} className="text-blue-400" />
                  <span>Personal Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Email */}
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-700 to-gray-600 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">
                        Email Address
                      </p>
                      <p className="text-white font-semibold">{user.email}</p>
                    </div>
                  </motion.div>

                  {/* Country */}
                  {user.country && (
                    <motion.div
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-700 to-green-600 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Globe size={20} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">
                          Country
                        </p>
                        <p className="text-white font-semibold">
                          {getFullCountryName(user.country)}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Account Type */}
                  {user.isGoogleUser && (
                    <motion.div
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-700 to-red-600 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Shield size={20} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">
                          Account Type
                        </p>
                        <p className="text-white font-semibold">
                          Google Account
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* About Section */}
                {user.about && (
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-gray-700 to-gray-600 bg-opacity-30 rounded-xl border border-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-gray-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Info size={18} className="text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">
                        About Me
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base">
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
                      userProfile={{
                        ...user,
                        astrologyDetail:
                          user.astrologyDetail || astrologyDetail!,
                      }}
                      setIsEditing={setIsEditing}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {activeTab === "blogs" && (
            <ProfileBlogs
              userBlogs={userBlogs}
              blogsLoading={blogsLoading}
              blogError={blogError}
            />
          )}
          {activeTab === "edit" && (
            <EditProfile
              success={() => {
                setUploadSuccess(true);
                setSuccessMessage({
                  heading: "Profile updated successfully",
                  description:
                    "Your changes have been saved and are now visible on your profile.",
                });
              }}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "password" && (
            <ChangePassword
              setActiveTab={() => setActiveTab("password")}
              success={() => {
                setUploadSuccess(true);
                setSuccessMessage({
                  heading: "Profile updated successfully",
                  description:
                    "Your changes have been saved and are now visible on your profile.",
                });
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {uploadSuccess && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-green-500 max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 text-center">
              <h2 className="text-xl font-bold tracking-wide">SUCCESS!</h2>
            </div>
            <SuccessLoader
              heading={successMessage.heading}
              description={successMessage.description}
              handleClose={() => handleSuccessModalClose()}
            />
          </div>
        </div>
      )}

      {showUpload && !uploadSuccess && (
        <ProfileUpload onClose={onClose} setUploadSuccess={setUploadSuccess} />
      )}
    </motion.div>
  );
};

export default Profile;
