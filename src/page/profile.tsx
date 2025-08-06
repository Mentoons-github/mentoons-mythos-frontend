import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Star, BookOpen } from "lucide-react";
import AstroForm from "../components/profile/astroForm";
import AstroData from "../components/profile/astroData";
import ProfileBlogs from "../components/profile/blogs";
import { IUser } from "../types";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { fetchMoonAndSunSign } from "../features/astrology/astroThunk";
import {
  fetchUserData,
  userLogout,
} from "../features/user/userThunk";
import { fetchCurrentUserBlog } from "../features/blog/blogThunk";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";
import ProfileUpload from "../components/modal/profileUpload";

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

  const [activeTab, setActiveTab] = useState<"profile" | "blogs">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

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
   
    if ( !user && !userLoading) {
      console.log("Fetching user data...");
      debouncedFetchUserData();
    }
    return () => {
      debouncedFetchUserData.cancel();
    };
  }, [ user, userLoading]);

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

      await dispatch(fetchMoonAndSunSign({ user: updatedProfile })).unwrap();
      await dispatch(fetchUserData()).unwrap();
      setIsEditing(false);
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      if (err === "Token expired" || err === "Unauthorized") {
        dispatch(userLogout());
      }
    }
  };

  const onClose = async () => {
    setShowUpload(false);
    await dispatch(fetchUserData());
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
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-500">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-300" />
                )}
                <motion.button
                  whileHover={{ y: 3 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  onClick={() => setShowUpload(true)}
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-gray-500 to-gray-900 cursor-pointer rounded-full w-5 h-5 flex justify-center items-center"
                >
                  <FaPlus className=" text-sm" />
                </motion.button>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star size={12} className="text-black" />
              </motion.div>
            </div>

            <div>
              <motion.h2
                className="text-2xl font-semibold text-white"
                variants={itemVariants}
              >
                {`${user.firstName} ${user.lastName}`}
              </motion.h2>
              <motion.p className="text-gray-400" variants={itemVariants}>
                {user.email}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex space-x-4 mb-8" variants={itemVariants}>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span>Profile</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "blogs"
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen size={20} />
              <span>My Blogs</span>
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
        </AnimatePresence>
      </div>
      {showUpload && <ProfileUpload onClose={onClose} />}
    </motion.div>
  );
};

export default Profile;
