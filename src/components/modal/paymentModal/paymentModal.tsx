import { useState, useEffect } from "react";
import { initiatePayment } from "../../../features/payment/api";
import { AxiosError } from "axios";

interface PaymentModalProps {
  heading: string;
  price: number;
  description: string;
  closeModal: () => void;
  itemType: string;
  itemName: string;
  paymentDone: boolean;
}

const PaymentModal = ({
  heading,
  price,
  description,
  closeModal,
  itemType,
  itemName,
  paymentDone,
}: PaymentModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Trigger success animation when payment is done
  useEffect(() => {
    if (paymentDone) {
      setShowSuccess(true);
    }
  }, [paymentDone]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await initiatePayment({ price, itemType, itemName });

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = response.data;

      const form = tempDiv.querySelector("form");
      if (form) {
        document.body.appendChild(form);
        form.submit();
      } else {
        setError("Payment gateway form could not be rendered.");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to initiate payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm">
      {paymentDone ? (
        <div
          className={`w-full max-w-md mx-4 bg-white border-2 border-gray-200 shadow-2xl rounded-lg overflow-hidden transform transition-all duration-700 ${
            showSuccess ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Success Header with Animation */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center border-b relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full animate-ping animation-delay-200"></div>
              <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white rounded-full animate-ping animation-delay-400"></div>
              <div className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-600"></div>
            </div>

            <div
              className={`mb-4 transform transition-all duration-1000 ${
                showSuccess
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Success Icon with Bounce Animation */}
                <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center animate-bounce">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-white rounded-full animate-ping opacity-50"></div>
              </div>
            </div>

            <h1
              className={`text-2xl font-bold text-white mb-2 transform transition-all duration-1000 delay-300 ${
                showSuccess
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Payment Successful!
            </h1>
            <p
              className={`text-green-100 transform transition-all duration-1000 delay-500 ${
                showSuccess
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Your payment has been processed successfully
            </p>
          </div>

          <div className="p-8 bg-white">
            <div className="text-center space-y-4">
              {/* Animated Success Card */}
              <div
                className={`bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200 transform transition-all duration-1000 delay-700 ${
                  showSuccess
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Thank you for your payment!
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Your transaction was successful. We've received your payment.
                </p>

                {/* Animated Price with Counter Effect */}
                <div
                  className={`text-3xl font-bold text-green-600 transform transition-all duration-1000 delay-1000 ${
                    showSuccess ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                >
                  <span className="inline-block animate-pulse">₹</span>
                  <span className="inline-block">{price}</span>
                  <span className="text-lg ml-2 animate-bounce">Paid ✨</span>
                </div>
              </div>

              {/* Item Details with Stagger Animation */}
              <div
                className={`space-y-2 text-sm text-gray-600 transform transition-all duration-700 delay-1200 ${
                  showSuccess
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                <p className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium text-black">Item:</span>
                  <span className="font-semibold">{itemName}</span>
                </p>
                <p className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium text-black">Type:</span>
                  <span className="font-semibold">{itemType}</span>
                </p>
              </div>

              {/* Celebration Message */}
              <div
                className={`bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mt-6 transform transition-all duration-1000 delay-1400 ${
                  showSuccess
                    ? "translate-y-0 opacity-100 rotate-0"
                    : "translate-y-4 opacity-0 rotate-1"
                }`}
              >
                <p className="text-green-800 text-sm flex items-center justify-center gap-2">
                  <span className="text-xl animate-bounce">🎉</span>
                  You can now continue with your assessment. Thank you for your
                  payment!
                  <span className="text-xl animate-bounce animation-delay-200">
                    🚀
                  </span>
                </p>
              </div>
            </div>

            {/* Animated Continue Button */}
            <div
              className={`mt-8 transform transition-all duration-1000 delay-1600 ${
                showSuccess
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 font-semibold border-2 border-green-600 hover:border-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Continue to Assessment</span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-4 bg-white border-2 border-black shadow-2xl transform transition-all duration-500 scale-100 opacity-100">
          <div
            className={`p-6 text-center ${
              error ? "bg-red-600" : "bg-black"
            } text-white transition-colors duration-300`}
          >
            <h1 className="text-2xl font-bold">
              {error ? "Payment Failed" : "Payment Required"}
            </h1>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">
                {heading}
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="text-center py-4 border-t border-b border-gray-200">
              <span className="text-3xl font-bold text-black">₹{price}</span>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center animate-shake">
                {error}
              </div>
            )}

            <p className="text-sm text-gray-600 text-center">
              {error
                ? "Please check the error above and try again."
                : "Complete your payment to continue the assessment seamlessly."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`flex-1 py-3 px-6 font-semibold border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  loading ? "animate-pulse" : ""
                } ${
                  error
                    ? "bg-red-600 text-white hover:bg-white hover:text-red-600 border-red-600"
                    : "bg-black text-white hover:bg-white hover:text-black border-black"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${price}`
                )}
              </button>
              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 bg-white text-black py-3 px-6 font-semibold border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
