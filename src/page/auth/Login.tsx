import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/ui/AuthButton";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";
import { loginSchema } from "../../validation/authValidation";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex w-full h-screen">
      {/* Left side layout or image */}
      <div className="w-1/2 bg-[#1A1D3B] flex items-center justify-center">
        <AuthLayout />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex items-center justify-center px-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full  p-8 "
        >
          <h2 className="text-4xl font-bold mb-8  text-gray-800">Login</h2>

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
            Login
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
