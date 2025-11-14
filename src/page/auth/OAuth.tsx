import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const OAuthResult = () => {
  const [isProcessing, setIsProcessing] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  // const error = urlParams.get("error");
  const message = urlParams.get("message");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else if (status === "error") {
      toast.error(message || "Login failed");
      navigate("/login");
    }
  }, [message, navigate, status]);

  const getErrorMessage = (errorCode: string | null) => {
    const errorMessages: Record<string, string> = {
      auth_start_failed:
        "Authentication could not be started. Please try again.",
      auth_cancelled: "Authentication was cancelled by the user.",
      invalid_credentials: "Invalid credentials provided.",
      server_error: "Server error occurred. Please try again later.",
      network_error: "Network error. Please check your connection.",
      token_expired: "Authentication token has expired. Please try again.",
      access_denied: "Access was denied. Please check your permissions.",
      account_suspended: "Your account has been suspended. Contact support.",
      email_not_verified: "Please verify your email address first.",
      default: "An unexpected error occurred. Please try again.",
    };

    return errorMessages[errorCode || "default"] || errorMessages.default;
  };

  const handleRetry = () => {
    window.location.href = "/login";
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Processing Authentication
          </h2>
          <p className="text-gray-600">
            Please wait while we complete your sign-in...
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              You have been successfully signed in. Redirecting you to your
              dashboard...
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Authentication Failed
          </h1>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-800 mb-1">
                  Error Details:
                </p>
                <p className="text-sm text-red-700">
                  {getErrorMessage(message)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If this problem persists, please contact our support team with
              error code:{" "}
              <span className="font-mono bg-gray-100 px-1 rounded">
                {message || "unknown"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthResult;
