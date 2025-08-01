import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { signupSchema } from "../../validation/authValidation";
import Input from "../../components/ui/Input";
import AuthButton from "../../components/ui/AuthButton";
import SelectInput from "../../components/ui/selectInput";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { sendOtpThunk } from "../../features/auth/authThunk";
import { resetAuthState } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import GoogleAuth from "../../components/button/googleAuth";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({});
  const dispatch = useAppDispatch();
  const { message, loading, error, success } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const today = new Date();
  const thirteenYearsAgo = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );

  useEffect(() => {
    if (success) {
      toast.success(message);
      navigate("/verify-otp", { state: { userData: form } });
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "error");
      dispatch(resetAuthState());
    }
  }, [dispatch, error, form, message, navigate, success]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      country: "",
      confirmPassword: "",
      about: "",
      terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(sendOtpThunk({ email: values.email }));
      setForm(values);
      console.log("object", values);
    },
  });

  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 hidden md:flex bg-[#1A1D3B] items-center justify-center">
        <AuthLayout />
      </div>
      <div className="w-full md:w-1/2 px-20 py-4 overflow-y-auto max-h-screen">
        <form onSubmit={formik.handleSubmit} className="w-full pt-4 px-8 p-10">
          <h1 className="text-4xl font-bold mb-5">Register</h1>

          {/* Google Sign-up Button */}
          <div className="mb-6">
            <GoogleAuth text="Sign Up" />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Input
              className="flex-1"
              label="First Name"
              name="firstName"
              placeholder="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : undefined
              }
            />

            <Input
              className="flex-1"
              label="Last Name"
              name="lastName"
              placeholder="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : undefined
              }
            />
          </div>

          <div className="flex gap-4 w-full ">
            <Input
              className="flex-1"
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

            <div className="flex-1">
              <label className="block text-sm font-bold mb-1 text-[#3B3D41]">
                Your Date Of Birth
              </label>
              <DatePicker
                selected={
                  formik.values.dateOfBirth
                    ? new Date(formik.values.dateOfBirth)
                    : null
                }
                onChange={(date: Date | null) => {
                  formik.setFieldValue(
                    "dateOfBirth",
                    date?.toISOString().split("T")[0]
                  );
                }}
                maxDate={thirteenYearsAgo}
                showYearDropdown
                scrollableYearDropdown
                wrapperClassName="w-full"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select your date of birth "
                className={`w-full p-2 border-2 rounded-xl ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          <SelectInput
            label="Your Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : undefined
            }
            options={["India", "USA", "UK", "Canada", "Australia"]}
          />

          <div className="flex gap-4 w-full">
            <Input
              className="flex-1"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />
            <Input
              className="flex-1"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="about"
              className="block mb-1 text-[#3B3D41] text-sm font-bold"
            >
              Tell us about yourself
            </label>
            <textarea
              id="about"
              name="about"
              placeholder="Tell us something about yourself..."
              rows={4}
              className={`w-full p-2 border-2 border-gray-300 rounded-xl ${
                formik.touched.about && formik.errors.about
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.about && formik.errors.about && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.about}</p>
            )}
          </div>

          <div className="flex items-start gap-2 mb-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="mt-1"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="terms" className="text-sm text-gray-700">
              By creating an account, you agree to our{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Terms & Conditions
              </span>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.terms}
                </p>
              )}
            </label>
          </div>

          <AuthButton type="submit" className="w-full ">
            {loading ? "Loading" : "Register"}
          </AuthButton>
          <p className="text-center  text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
