import { useFormik } from "formik";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resetAuthState } from "../../features/auth/authSlice";
import { forgotPasswordSchema } from "../../validation/authValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { forgotPasswordThunk } from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import AuthButton from "../../components/ui/AuthButton";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { message, loading, error, success } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      dispatch(
        forgotPasswordThunk({
          email: values.email,
          newPassword: values.newPassword,
        })
      );
    },
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      navigate("/login");
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [dispatch, error, message, navigate, success]);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-foreground hidden lg:flex items-center justify-center">
        <AuthLayout />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center md:px-5 lg:px-20 ">
        <form onSubmit={formik.handleSubmit} className="w-full p-8">
          <h2 className="text-4xl font-bold mb-8 ">
            Forgot Password
          </h2>

          <Input
            className="mb-6"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />

          {/* New Password with eye */}
          <div className="relative mb-6">
            <Input
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm New Password with eye */}
          <div className="relative mb-6">
            <Input
              label="Confirm New Password"
              name="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword
                  ? formik.errors.confirmNewPassword
                  : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

            <AuthButton type="submit" className="w-full mt-4">
            {loading ? "Loading" : "Reset Password"}
          </AuthButton>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Register Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
