import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  registerThunk,
  sendOtpThunk,
  verifyOtpThunk,
} from "../../features/auth/authThunk";
import { resetAuthState } from "../../features/auth/authSlice";
import AuthLayout from "./AuthLayout";
import AuthButton from "../../components/ui/AuthButton";
import { toast } from "sonner";

const OTPInputPage = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, otpSuccess, message, otpError } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();
  const { userData } = location.state || {};

  useEffect(() => {
    if (!userData) {
      navigate("/register", { replace: true });
    }
  }, [userData, navigate]);

  useEffect(() => {
    const handleOtpSuccess = async () => {
      if (otpSuccess && userData) {
        try {
          await dispatch(registerThunk(userData)).unwrap();

          await new Promise((res) => setTimeout(res, 1000));
          toast.success(message);
          await dispatch(resetAuthState());

          navigate("/");
        } catch (err) {
          console.error("Registration failed:", err);
        } finally {
          dispatch(resetAuthState());
        }
      }

      if (otpError) {
        console.log(otpError, "error");
        dispatch(resetAuthState());
      }
    };

    handleOtpSuccess();
  }, [dispatch, message, navigate, otpError, otpSuccess, userData]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.slice(0, 6).split("");

    if (pasteArray.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pasteArray.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pasteArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      return;
    }
    await dispatch(verifyOtpThunk({ otp: otpString, email: userData.email }));
  };

  const handleResend = async () => {
    setResendCooldown(60);
    setOtp(["", "", "", "", "", ""]);

    dispatch(sendOtpThunk({ email: userData.email }));
    await new Promise((res) => setTimeout(res, 1000));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-foreground hidden lg:flex items-center justify-center">
        <AuthLayout />
      </div>
      <div className="w-full lg:w-1/2  rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold  mb-2">
            Verify Your Account
          </h1>
          <p className="text-muted-foreground">
            We've sent a 6-digit verification code to your email address
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg transition-all duration-200 ${
                  otpError
                    ? "border-red-300 focus:border-red-500"
                    : "border-border focus:border-muted-foreground"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                disabled={loading}
              />
            ))}
          </div>

          {otpError && (
            <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-lg">
              {otpError}
            </div>
          )}

          <AuthButton
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              loading || otp.join("").length < 6
                ? "bg-muted-foreground text- cursor-not-allowed"
                : "bg-foreground text-background hover:bg-[#1A1D3C] active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify Code"
            )}
          </AuthButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`text-sm font-semibold transition-colors ${
              resendCooldown > 0
                ? "text-muted-foreground cursor-not-allowed"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInputPage;
