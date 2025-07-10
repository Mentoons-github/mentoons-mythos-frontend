import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/ui/AuthButton";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";
import { loginSchema } from "../../validation/authValidation";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginThunk } from "../../features/auth/authThunk";
import { useEffect } from "react";
import { resetAuthState } from "../../features/auth/authSlice";
import GoogleAuth from "../../components/button/googleAuth";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { error, loading, message, success, accessToken, userId } =
    useAppSelector((state) => state.auth);

  console.log(accessToken, userId);
  useEffect(() => {
    if (success) {
      alert(message);
      navigate("/");
      dispatch(resetAuthState());
    }
    if (error) {
      alert(error);
      console.log(error, "errror");
      dispatch(resetAuthState());
    }
  }, [dispatch, error, message, navigate, success]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
  });

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 bg-[#1A1D3B] hidden md:flex items-center justify-center">
        <AuthLayout />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-20">
        <form onSubmit={formik.handleSubmit} className="w-full p-8">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Login</h2>

          <div className="mb-6">
            <GoogleAuth text="Sign In" />
          </div>

          <div className="mb-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

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
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />

          <AuthButton type="submit" className="w-full mt-4">
            {loading ? "Loading" : "Login"}
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

export default Login;
