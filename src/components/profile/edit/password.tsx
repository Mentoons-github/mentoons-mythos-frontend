import { Lock, Save, X, Shield, Eye, EyeOff, Sparkles } from "lucide-react";
import FloatingLabel from "../../common/floatingLabel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { resetAuthState } from "../../../features/auth/authSlice";
import { toast } from "sonner";
import { changePasswordThunk } from "../../../features/auth/authThunk";
import { changePasswordSchema } from "../../../validation/authValidation";

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.2 },
  },
};

const floatingVariants = {
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface ChangePasswordProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<"profile" | "blogs" | "edit" | "password">
  >;
}

const ChangePassword = ({ setActiveTab }: ChangePasswordProps) => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const {
    message,
    loading,
    error,
    success: authSuccess,
  } = useAppSelector((state) => state.auth);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // const [passwordStrength, setPasswordStrength] = useState(0);

  // const calculatePasswordStrength = (password: string) => {
  //   let strength = 0;
  //   const checks = [
  //     password.length >= 6,
  //     /\d/.test(password),
  //     /[!@#$%^&*(),.?":{}|<>_]/.test(password),
  //   ];
  //   strength = checks.filter(Boolean).length;
  //   return strength;
  // };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // const getPasswordStrengthColor = () => {
  //   switch (passwordStrength) {
  //     case 0:
  //     case 1:
  //       return "bg-red-500";
  //     case 2:
  //       return "bg-yellow-500";
  //     case 3:
  //       return "bg-green-500";
  //     default:
  //       return "bg-gray-500";
  //   }
  // };

  // const getPasswordStrengthText = () => {
  //   switch (passwordStrength) {
  //     case 0:
  //     case 1:
  //       return "Weak";
  //     case 2:
  //       return "Fair";
  //     case 3:
  //       return "Strong";
  //     default:
  //       return "";
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,

    onSubmit: async (values) => {
      dispatch(
        changePasswordThunk({
          passwords: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          userId: user?._id as string,
        })
      );
      console.log("object", values);
    },
  });

  useEffect(() => {
    if (authSuccess) {
      toast.success(message);
      setActiveTab("profile");
      setTimeout(() => {
        dispatch(resetAuthState());
      }, 100);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [dispatch, error, message, authSuccess, setActiveTab]);

  if (user?.isGoogleUser) {
    return (
      <motion.div
        className="w-full max-w-4xl mx-auto min-h-screen flex items-center justify-center border border-muted-foreground rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className=" rounded-xl shadow-lg border border-gray-600 p-8 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4"
            variants={floatingVariants}
            animate="float"
          >
            <Shield className="w-8 h-8 " />
          </motion.div>
          <h2 className="text-2xl font-bold  mb-2">
            Google Account
          </h2>
          <p className="text-gray-400">
            Password changes are managed through your Google account settings.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6 border border-foreground rounded-xl min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        variants={cardVariants}
      >
        <motion.div
          className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center shadow-lg"
          variants={floatingVariants}
          animate="float"
        >
          <Lock className="w-8 h-8 text-background" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Change Password
            <Sparkles className="w-6 h-6 text-muted-foreground" />
          </h1>
          <p className="text-muted-foreground">Secure your cosmic journey</p>
        </div>
      </motion.div>

      {/* Main Form */}
      <motion.form
        onSubmit={formik.handleSubmit}
        className="rounded-xl shadow-lg border border-muted-foreground hover:shadow-xl transition-shadow duration-300 relative overflow-hidden p-8 space-y-8"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className=" text-xl font-semibold border-b border-muted-foreground pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-muted-foreground" />
          Security Settings
        </h3>

        {/* Current Password */}
        <div className="relative">
          <FloatingLabel
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            value={formik.values.currentPassword}
            onChange={(e) =>
              formik.setFieldValue("currentPassword", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-300"
          >
            {showPasswords.current ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative space-y-3">
          <FloatingLabel
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            value={formik.values.newPassword}
            onChange={(e) => {
              formik.setFieldValue("newPassword", e.target.value);
              // setPasswordStrength(calculatePasswordStrength(e.target.value));
            }}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-300"
          >
            {showPasswords.new ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.newPassword}
            </p>
          )}

          {/* Password strength */}
          {/* {formik.values.newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  Password Strength:
                </span>
                <span
                  className={`text-sm font-medium ${
                    passwordStrength === 3
                      ? "text-green-400"
                      : passwordStrength === 2
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 3) * 100}%` }}
                />
              </div>
            </div>
          )} */}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <FloatingLabel
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={(e) =>
              formik.setFieldValue("confirmPassword", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-300"
          >
            {showPasswords.confirm ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-600">
          <button
            type="button"
            className="px-8 py-3  border-2 border-foreground hover:text-background hover:bg-foreground rounded-xl transition-colors font-medium flex items-center gap-2"
            onClick={() => {
              if (formik.dirty && !formik.isSubmitting) {
                if (
                  window.confirm("Are you sure you want to discard changes?")
                ) {
                  setActiveTab("profile");
                }
              } else {
                setActiveTab("profile");
              }
            }}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`px-8 py-3 ${
              formik.isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700"
            } text-white rounded-xl transition-all duration-300 font-medium shadow-lg flex items-center gap-2`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ChangePassword;
