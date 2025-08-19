import { Lock, Save, X, Shield, Eye, EyeOff, Sparkles } from "lucide-react";
import FloatingLabel from "../../common/floatingLabel";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  handleSubmit,
  validationSchema,
} from "../../../validation/changePassword";

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
  success: (heading: string, description: string) => void;
}

const ChangePassword = ({ setActiveTab, success }: ChangePasswordProps) => {
  const user = useAppSelector((state) => state.user.user);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    const checks = [
      password.length >= 6,
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];
    strength = checks.filter(Boolean).length;
    return strength;
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      default:
        return "";
    }
  };

  if (user?.isGoogleUser) {
    return (
      <motion.div
        className="w-full max-w-4xl mx-auto min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-600 p-8 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4"
            variants={floatingVariants}
            animate="float"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
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
      className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen"
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
          className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-800 rounded-xl flex items-center justify-center shadow-lg"
          variants={floatingVariants}
          animate="float"
        >
          <Lock className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            Change Password
            <Sparkles className="w-6 h-6 text-gray-400" />
          </h1>
          <p className="text-gray-400">Secure your cosmic journey</p>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-800"></div>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, formikHelpers) => {
            const result = await handleSubmit(values, formikHelpers);
            if (result.status) {
              success(
                "Password Changed!",
                "Your password has been updated successfully."
              );
              setActiveTab("password");
            } else {
              formikHelpers.setErrors({ confirmPassword: result.message });
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue, dirty }) => (
            <Form className="p-8 space-y-8">
              <motion.div className="space-y-6" variants={cardVariants}>
                <h3 className="text-gray-100 text-xl font-semibold border-b border-gray-600 pb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-400" />
                  Security Settings
                </h3>

                {/* Current Password */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Field
                      name="currentPassword"
                      render={({ field }: any) => (
                        <FloatingLabel
                          label="Current Password"
                          type={showPasswords.current ? "text" : "password"}
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(e);
                            setFieldValue("currentPassword", e.target.value);
                          }}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </motion.div>

                {/* New Password */}
                <motion.div
                  className="relative space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Field
                      name="newPassword"
                      render={({ field }: any) => (
                        <FloatingLabel
                          label="New Password"
                          type={showPasswords.new ? "text" : "password"}
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(e);
                            setFieldValue("newPassword", e.target.value);
                            setPasswordStrength(
                              calculatePasswordStrength(e.target.value)
                            );
                          }}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />

                  {/* Password Strength Indicator */}
                  {values.newPassword && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
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
                        <motion.div
                          className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(passwordStrength / 3) * 100}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      render={({ field }: any) => (
                        <FloatingLabel
                          label="Confirm New Password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={field.value}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(e);
                            setFieldValue("confirmPassword", e.target.value);
                          }}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </motion.div>

                {/* Password Requirements */}
                <motion.div
                  className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-gray-100 text-sm font-medium mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    Password Requirements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        text: "At least 6 characters",
                        met: values.newPassword.length >= 6,
                      },
                      {
                        text: "One number",
                        met: /\d/.test(values.newPassword),
                      },
                      {
                        text: "One special character",
                        met: /[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword),
                      },
                    ].map((req, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            req.met ? "bg-green-400" : "bg-gray-500"
                          }`}
                        />
                        <span
                          className={
                            req.met ? "text-green-400" : "text-gray-400"
                          }
                        >
                          {req.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex justify-end gap-4 pt-6 border-t border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="button"
                  className="px-8 py-3 text-gray-100 border-2 border-gray-500 rounded-xl hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (dirty && !isSubmitting) {
                      if (
                        window.confirm(
                          "Are you sure you want to discard changes?"
                        )
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
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700"
                  } text-white rounded-xl transition-all duration-300 font-medium shadow-lg flex items-center gap-2`}
                  whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Password
                    </>
                  )}
                </motion.button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>

      {/* Account Security Info */}
      <motion.div
        className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-gray-600 rounded-xl p-6 mt-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className="text-gray-100 text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gray-400" />
          Security Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <motion.div
            className="space-y-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-400">Last Password Change:</span>
            <p className="text-gray-100 font-medium">Never changed</p>
          </motion.div>
          <motion.div
            className="space-y-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-400">Account Security:</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-gray-100 font-medium">Protected</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChangePassword;
