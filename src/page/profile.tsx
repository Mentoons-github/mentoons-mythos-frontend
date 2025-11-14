import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Star, BookOpen, Edit, Mail, Shield, Trash2 } from "lucide-react";

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
import { deleteAccountThunk } from "../features/auth/authThunk";
import AccountDeleteModal from "../components/modal/AccountDeleteModal";
import { toast } from "sonner";
import ProfileData from "../components/profile/ProfileData";
// import { getFullCountryName } from "../utils";

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
  const [deleteModal, setDeleteModal] = useState(false);

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
  }, [debouncedFetchUserData, user, userLoading]);

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
  }, [
    user,
    activeTab,
    blogsLoading,
    userBlogs.length,
    blogError,
    debouncedFetchUserBlogs,
  ]);

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

  const handleDeleteAccount = () => {
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAccountThunk())
      .unwrap()
      .then((message) => {
        sessionStorage.clear();
        toast.success(message);
        window.location.replace("/");
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
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
        className="min-h-screen p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold mb-2  bg-clip-text text-transparent"
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
      className="min-h-screen p-3 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1
            className="text-2xl md:text-4xl font-bold mb-2 "
            whileHover={{ scale: 1.05 }}
          >
            Cosmic Profile
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-muted-foreground mx-auto"
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
          className="bg- bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 md:p-8 mb-8 border border-muted-foreground"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 border-muted-foreground">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={36} className="" />
                )}
                <motion.button
                  whileHover={{ y: 3 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  onClick={() => setShowUpload(true)}
                  className="absolute bottom-0 right-0 bg-background cursor-pointer rounded-full w-6 h-6 flex justify-center items-center border border-muted-foreground"
                >
                  <FaPlus className="text-xs text-" />
                </motion.button>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star size={14} className="text-background" />
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.h2
                className="text-xl md:ext-3xl font-bold mb-1"
                variants={itemVariants}
              >
                {`${user.firstName} ${user.lastName}`}
              </motion.h2>
              <motion.div
                className="flex items-center text-sm md:text-base space-x-1 md:space-x-2 text-muted-foreground"
                variants={itemVariants}
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 " />
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
          className="flex flex-wrap gap-2 md:gap-3 mb-8"
          variants={itemVariants}
        >
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-2 md:px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-sm md:text-base font-semibold md:font-medium transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-foreground text-background shadow-lg "
                : "bg-background text-foreground border border-foreground hover:bg-foreground/80 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 md:w-5 md:h-5  lg:w-6 lg:h-6" />
              <span>Profile</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-2 md:px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-sm md:text-base font-semibold md:font-medium transition-all duration-300 ${
              activeTab === "edit"
                ? "bg-foreground text-background shadow-lg"
                : "bg-background text-foreground hover:bg-foreground/80 hover:scale-105 border border-foreground"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Edit className="w-4 h-4 md:w-5 md:h-5  lg:w-6 lg:h-6" />
              <span>Edit</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-2 md:px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-sm md:text-base font-semibold md:font-medium transition-all duration-300 ${
              activeTab === "blogs"
                ? "bg-foreground text-background shadow-lg"
                : "bg-background text-foreground hover:bg-foreground/80 hover:scale-105 border border-foreground"
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5  lg:w-6 lg:h-6" />
              <span>My Blogs</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-2 md:px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-sm md:text-base font-semibold md:font-medium transition-all duration-300 ${
              activeTab === "password"
                ? "bg-foreground text-background shadow-lg"
                : "bg-background text-foreground hover:bg-foreground/80 hover:scale-105 border border-foreground"
            }`}
          >
            <div className="flex items-center space-x-2">
              <CgPassword className="w-4 h-4 md:w-5 md:h-5  lg:w-6 lg:h-6" />
              <span>Change Password</span>
            </div>
          </button>
          <button
            onClick={handleDeleteAccount}
            className={`px-2 md:px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-sm md:text-base font-semibold md:font-medium transition-all duration-300 bg-red-600 hover:bg-red-700`}
          >
            <div className="flex items-center space-x-2">
              <Trash2 className="w-4 h-4 md:w-5 md:h-5  lg:w-6 lg:h-6" />
              <span>Delete Account</span>
            </div>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <ProfileData
              astroLoading={astroLoading}
              astrologyDetail={astrologyDetail ?? undefined}
              formData={formData}
              isEditing={isEditing}
              onSubmit={handleFormSubmit}
              setFormData={setFormData}
              setIsEditing={setIsEditing}
              user={user}
            />
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
              }}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "password" && (
            <ChangePassword setActiveTab={setActiveTab} />
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
        <ProfileUpload
          onClose={onClose}
          setUploadSuccess={setUploadSuccess}
          haveProfilePicture={user?.profilePicture ? true : false}
        />
      )}

      {deleteModal && (
        <AccountDeleteModal
          onClose={() => setDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </motion.div>
  );
};

export default Profile;
