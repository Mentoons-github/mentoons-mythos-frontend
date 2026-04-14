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

  // ✅ Format price (Indian format)
  const formattedPrice = (price || 0).toLocaleString("en-IN");

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      {paymentDone ? (
        // ✅ SUCCESS UI
        <div
          className={`w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
            showSuccess ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center text-white">
            <div className="mb-4">
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
            </div>

            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="text-green-100 text-sm mt-1">
              Your payment was completed successfully
            </p>
          </div>

          <div className="p-6 text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-green-800 font-semibold mb-2">
                Thank you for your payment!
              </p>

              <div className="text-3xl font-bold text-green-600">
                ₹{formattedPrice}
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex justify-between bg-gray-50 p-2 rounded">
                <span>Item:</span>
                <span className="font-medium">{itemName}</span>
              </p>
              <p className="flex justify-between bg-gray-50 p-2 rounded">
                <span>Type:</span>
                <span className="font-medium">{itemType}</span>
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        // ✅ PAYMENT UI
        <div className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className={`p-6 text-center ${
              error ? "bg-red-500" : "bg-gradient-to-r from-black to-gray-800"
            } text-white`}
          >
            <h1 className="text-2xl font-bold">
              {error ? "Payment Failed" : "Secure Payment"}
            </h1>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{heading}</h2>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* Price */}
            <div className="text-center py-5 border-y border-gray-200">
              <span className="text-4xl font-extrabold">₹{formattedPrice}</span>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-700 text-sm p-3 rounded text-center">
                {error}
              </div>
            )}

            {/* Info */}
            <p className="text-sm text-gray-500 text-center">
              {error
                ? "Please try again."
                : "Complete your payment to continue."}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  error
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-black hover:bg-gray-900 text-white"
                } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : `Pay ₹${formattedPrice}`}
              </button>

              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all duration-300"
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
