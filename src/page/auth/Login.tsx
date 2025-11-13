import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/ui/AuthButton";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";
import { loginSchema } from "../../validation/authValidation";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginThunk } from "../../features/auth/authThunk";
import { useEffect, useState } from "react";
import { resetAuthState } from "../../features/auth/authSlice";
import GoogleAuth from "../../components/button/googleAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { error, loading, message, success, role } = useAppSelector(
    (state) => state.auth
  );

  console.log(role,'roleeee')

  // console.log(accessToken, userId);
  useEffect(() => {
    if (success) {
      toast.success(message);

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "employee") {
        navigate("/employee", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      dispatch(resetAuthState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [success, error, dispatch, navigate, message, role]);

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
      <div className="w-1/2 bg-foreground hidden lg:flex items-center justify-center">
        <AuthLayout />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center md:px-5 lg:px-20">
        <form onSubmit={formik.handleSubmit} className="w-full p-8">
          <h2 className="text-4xl font-bold mb-8 ">Login</h2>

          <div className="mb-6">
            <GoogleAuth text="Sign In" />
          </div>

          <div className="mb-6 flex items-center">
            <div className="flex-1 border-t border-muted-foreground"></div>
            <span className="px-4 text-sm">OR</span>
            <div className="flex-1 border-t border-muted-foreground"></div>
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

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-primary font-medium">Password</label>
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline text-sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </span>
            </div>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <AuthButton type="submit" className="w-full mt-4">
            {loading ? "Loading" : "Login"}
          </AuthButton>

          <p className="text-center text-sm mt-4 text-muted-foreground">
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
