import { useFormik } from "formik";
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
import { useEffect, useMemo, useState } from "react";
import GoogleAuth from "../../components/button/googleAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Country, getCountries } from "../../services/countryData";

const Register = () => {
  const [form, setForm] = useState({});
  const dispatch = useAppDispatch();
  const { message, loading, error, success } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

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

  const countryOptions = useMemo(
    () =>
      countries?.map((country) => ({
        value: country.code,
        label: country.name,
        flag: country.flag,
      })) ?? [],
    [countries]
  );

  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 hidden lg:flex bg-foreground items-center justify-center">
        <AuthLayout />
      </div>
      <div className="w-full lg:w-1/2 md:px-5 lg:px-20 py-4 overflow-y-auto hide-scrollbar max-h-screen">
        <form onSubmit={formik.handleSubmit} className="w-full pt-4 px-8 p-10">
          <h1 className="text-4xl font-bold mb-5">Register</h1>

          {/* Google Sign-up Button */}
          <div className="mb-6">
            <GoogleAuth text="Sign Up" />
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center">
            <div className="flex-1 border-t border-muted-foreground"></div>
            <span className="px-4 text-sm">OR</span>
            <div className="flex-1 border-t border-muted-foreground"></div>
          </div>

          <div className="md:flex gap-3 w-full">
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

          <div className="md:flex gap-4 w-full ">
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
              <label className="block text-sm font-bold mb-1 text-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full p-2 border-2 rounded-xl bg-background text-foreground
                            [color-scheme:light] dark:[color-scheme:dark]
                            focus:outline-none focus:ring-2 focus:ring-ring
                            ${
                              formik.touched.dateOfBirth &&
                              formik.errors.dateOfBirth
                                ? "border-destructive"
                                : "border-border"
                            }`}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="text-destructive text-xs mt-1">
                  {formik.errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          <SelectInput
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : undefined
            }
            options={countryOptions}
          />

          <div className="md:flex gap-4 w-full ">
            <div className="relative w-full">
              <Input
                className="flex-1"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative w-full">
              <Input
                className="flex-1"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
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
          </div>

          <div className="mb-3">
            <label
              htmlFor="about"
              className="block mb-1 text-primary text-sm font-bold"
            >
              Tell us about yourself
            </label>
            <textarea
              id="about"
              name="about"
              placeholder="Tell us something about yourself..."
              rows={4}
              className={`w-full p-2 border-2 border-border rounded-xl ${
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

            <label htmlFor="terms" className="text-sm text-muted-foreground">
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
            {loading ? "Sending otp to email" : "Register"}
          </AuthButton>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
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
