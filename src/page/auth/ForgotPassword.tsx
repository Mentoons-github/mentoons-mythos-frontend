import { useFormik } from "formik";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetAuthState } from "../../features/auth/authSlice";
import { forgotPasswordSchema } from "../../validation/authValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { forgotPasswordThunk } from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   const dispatch = useAppDispatch();
    const { message, loading, error, success } = useAppSelector(
      (state) => state.auth
    );
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email:"",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema:forgotPasswordSchema,
    onSubmit: async (values) => {
       dispatch(forgotPasswordThunk({email:values.email,newPassword:values.newPassword }));
            console.log("object", values);
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
      console.log(error, "error");
      dispatch(resetAuthState());
    }
  }, [dispatch, error, message, navigate, success]);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#1A1D3B] hidden md:flex items-center justify-center">
        <AuthLayout />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-20">
        <form onSubmit={formik.handleSubmit} className="w-full p-8">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Forgot Password</h2>

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

          <Input
            className="mb-6"
            label="New Password"
            name="newPassword"
            type="password"
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

          <Input
            className="mb-6"
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                ? formik.errors.confirmNewPassword
                : undefined
            }
          />

          <button
            type="submit"
            className="w-full bg-[#1A1D3B] text-white py-2 px-4 rounded-lg hover:bg-[#0e1030] transition"
          >{loading?"Loading..":"Reset Password"}
            
          </button>
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
