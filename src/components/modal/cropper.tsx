import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fileUploadThunk } from "../../features/upload/fileUploadThunk";
import { updateUserData } from "../../features/user/userThunk";
import FileUploadLoader from "../loader/fileUploader";

interface ImageCropperModalProps {
  imageSrc: string;
  onClose: (success?: boolean) => void;
  setUploadSuccess: (value: boolean) => void;
  aspectRatio?: number;
}

const ImageCropperModal = ({
  imageSrc,
  onClose,
  setUploadSuccess,
  aspectRatio = 1,
}: ImageCropperModalProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 20,
    y: 20,
    width: 60,
    height: 60,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const getCroppedImage = useCallback(
    async (image: HTMLImageElement, crop: PixelCrop): Promise<File> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File([blob], "cropped-image.jpg", { type: "image/jpeg" })
              );
            } else {
              throw new Error("Failed to create blob");
            }
          },
          "image/jpeg",
          0.9
        );
      });
    },
    []
  );

  const handleCrop = useCallback(async () => {
    if (imgRef.current && completedCrop) {
      try {
        setUploading(true);
        setError(null);
        const croppedFile = await getCroppedImage(
          imgRef.current,
          completedCrop
        );
        const imageUrl = (await dispatch(
          fileUploadThunk({ file: croppedFile, category: "userProfile" })
        ).unwrap()) as string;

        if (imageUrl) {
          await dispatch(
            updateUserData({ user: { profilePicture: imageUrl } })
          ).unwrap();
          setUploadSuccess(true);
          onClose(true);
        }
      } catch (error: any) {
        console.error("Error during crop and upload:", error);
        setError(
          error.payload ||
            error.message ||
            "Failed to upload image. Please try again."
        );
        setUploading(false);
      }
    }
  }, [completedCrop, getCroppedImage, dispatch, setUploadSuccess, onClose]);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgRef.current = e.currentTarget;
    },
    []
  );

  const handleCancel = () => {
    setError(null);
    onClose(false);
  };

  if (uploading || loading) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white border-4 border-black max-w-md w-full">
        <div className="bg-black text-white p-4 text-center">
          <h2 className="text-xl font-bold tracking-wide">CROP IMAGE</h2>
        </div>
        <div className="p-8">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}
          <div className="relative">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minWidth={100}
              minHeight={100}
              keepSelection={true}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Image to crop"
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <div className="border-t-2 border-dashed border-gray-300 mt-6"></div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-black text-black font-bold tracking-wide hover:bg-black hover:text-white transition-all duration-200"
            >
              CANCEL
            </button>
            <button
              onClick={handleCrop}
              disabled={!completedCrop}
              className={`px-6 py-3 font-bold tracking-wide transition-all duration-200 ${
                completedCrop
                  ? "bg-black text-white hover:bg-gray-800 active:bg-gray-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              CROP & UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
