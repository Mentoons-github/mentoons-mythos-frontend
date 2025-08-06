import { useState, memo } from "react";
import { Plus, Upload, X } from "lucide-react";
import { fileUploadThunk } from "../../features/upload/fileUploadThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateUserData } from "../../features/user/userThunk";
import FileUploadLoader from "../loader/fileUploader";

const ProfileUpload = ({
  onClose,
  setUploadSuccess,
}: {
  onClose: (success?: boolean) => void;
  setUploadSuccess: (value: boolean) => void;
}) => {
  const [profile, setProfile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [picUploading, setPicUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { error: reduxError, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const MAX_FILE_SIZE = 3 * 1024 * 1024;

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setValidationError(
        "File size exceeds 3MB limit. Please choose a smaller file."
      );
      return false;
    }
    if (!file.type.startsWith("image/")) {
      setValidationError("Only image files (JPG, PNG, GIF) are allowed.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setProfile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setProfile(null);
      setPreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setProfile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setProfile(null);
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setProfile(null);
    setPreview(null);
    setValidationError(null);
  };

  const handleUpload = async () => {
    if (profile) {
      setPicUploading(true);
      setValidationError(null);
      try {
        const imageUrl = (await dispatch(
          fileUploadThunk({ file: profile, category: "userProfile" })
        ).unwrap()) as string;
        console.log("Image URL received:", imageUrl);

        if (imageUrl) {
          console.log("Updating user data with image URL:", imageUrl);
          await dispatch(
            updateUserData({ user: { profilePicture: imageUrl } })
          ).unwrap();
          console.log("User data updated successfully");
        }

        console.log(
          "Upload successful, setting uploadSuccess to true in parent"
        );
        setPicUploading(false);
        setUploadSuccess(true);
      } catch (err: any) {
        console.error("Upload failed:", err.message || err);
        setPicUploading(false);
        setValidationError(
          err.message || "Failed to upload profile picture. Please try again."
        );
      }
    }
  };

  const handleClose = () => {
    setProfile(null);
    setPreview(null);
    setValidationError(null);
    onClose(false); // Indicate no success
  };

  if (picUploading || loading) {
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center p-4 z-50">
        <div className="bg-white border-4 border-black max-w-md w-full">
          <div className="bg-black text-white p-4 text-center">
            <h2 className="text-xl font-bold tracking-wide">
              UPLOADING PROFILE
            </h2>
          </div>
          <FileUploadLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black max-w-md w-full">
        <div className="bg-black text-white p-4 text-center">
          <h2 className="text-xl font-bold tracking-wide">PROFILE UPLOAD</h2>
        </div>

        <div className="p-8 space-y-6">
          {(reduxError || validationError) && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p className="font-semibold">Error</p>
              <p>{reduxError || validationError}</p>
            </div>
          )}

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div
              className={`relative w-40 h-40 border-4 border-dashed transition-all duration-200 cursor-pointer
                ${
                  isDragging
                    ? "border-black bg-gray-100"
                    : "border-gray-400 hover:border-black hover:bg-gray-50"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("upload")?.click()}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <Plus size={32} className="mb-2" />
                  <span className="text-sm font-bold">ADD PHOTO</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="font-semibold text-black mb-1">
                {profile ? profile.name : "Upload your image"}
              </p>
              <p className="text-sm text-gray-600">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, GIF up to 3MB
              </p>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300"></div>

          <div className="flex space-x-4">
            <button
              onClick={handleUpload}
              disabled={!profile}
              className={`flex-1 py-3 px-6 font-bold tracking-wide transition-all duration-200 flex items-center justify-center space-x-2
                ${
                  profile
                    ? "bg-black text-white hover:bg-gray-800 active:bg-gray-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <Upload size={18} />
              <span>UPLOAD</span>
            </button>

            <button
              onClick={handleClose}
              className="px-6 py-3 border-2 border-black text-black font-bold tracking-wide hover:bg-black hover:text-white transition-all duration-200"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileUpload);
