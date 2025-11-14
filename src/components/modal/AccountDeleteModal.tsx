import React from "react";

interface AccountDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="bg-black/80 inset-0 fixed z-50 flex items-center justify-center">
      <div className="bg-[#171717] rounded-2xl shadow-lg p-6 w-96 text-center">
        <h2 className="text-xl font-semibold text-ehite">Delete Account</h2>
        <p className="text-[#d0d5cf] mt-3">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
