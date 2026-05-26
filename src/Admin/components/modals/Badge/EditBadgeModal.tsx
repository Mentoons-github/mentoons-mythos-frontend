import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toast } from "sonner";
import { Badge } from "../../../../types/redux/blogInterface";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { MdDelete } from "react-icons/md";
import { editBadgeThunk } from "../../../../features/badge/badgeThunk";
import { resetBadgeSlice } from "../../../../features/badge/badgeSlice";

const EditBadgeModal = ({
  onClose,
  badge,
}: {
  onClose: () => void;
  badge: Badge | null;
}) => {
  const dispatch = useAppDispatch();

  const { editSuccess, editLoading, error, message } = useAppSelector(
    (state) => state.badge,
  );

  const [file, setFile] = useState<File | null>(null);
  const [animationFile, setAnimationFile] = useState<File | null>(null);

  const [badgeData, setBadgeData] = useState<Badge>({
    name: "",
    description: "",
    image: "",
    animation: "",
    criteria: {
      action: "",
    },
  });

  useEffect(() => {
    if (badge) {
      setBadgeData({
        name: badge.name,
        description: badge.description,
        image: badge.image,
        animation: badge.animation,
        criteria: badge.criteria,
      });
    }
  }, [badge]);

  useEffect(() => {
    if (editSuccess) {
      toast.success(message);
      dispatch(resetBadgeSlice());
      onClose();
    }

    if (error) {
      toast.error(error);
      dispatch(resetBadgeSlice());
    }
  }, [dispatch, editSuccess, error, message, onClose]);

  // Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file && !badgeData.image) {
      toast.error("Please upload badge image");
      return;
    }

    if (!animationFile && !badgeData.animation) {
      toast.error("Please upload animation");
      return;
    }

    let imageUrl = badgeData.image;
    let animationUrl = badgeData.animation;

    if (animationFile) {
      const uploadedAnimation = await dispatch(
        fileUploadThunk({
          file: animationFile,
          category: "badge-animation",
        }),
      ).unwrap();

      if (typeof uploadedAnimation === "string") {
        animationUrl = uploadedAnimation;
      } else {
        animationUrl = uploadedAnimation[0].url;
      }
    }

    // Upload image
    if (file) {
      const uploadedImage = await dispatch(
        fileUploadThunk({
          file,
          category: "badge",
        }),
      ).unwrap();

      if (typeof uploadedImage === "string") {
        imageUrl = uploadedImage;
      } else {
        imageUrl = uploadedImage[0].url;
      }
    }

    const formattedData = {
      ...badgeData,
      animation: animationUrl,
      image: imageUrl as string,
    };

    dispatch(
      editBadgeThunk({
        badgeData: formattedData,
        badgeId: badge?._id as string,
      }),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-secondary p-6 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg text-muted-foreground hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold">Create New Badge</h2>

          <p className="text-sm text-muted-foreground mt-1">
            Add badge details, image and Lottie animation JSON.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Badge Name</label>

            <input
              type="text"
              required
              placeholder="Enter badge name"
              value={badgeData.name}
              onChange={(e) =>
                setBadgeData({
                  ...badgeData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl bg-transparent p-3 outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Action Criteria</label>

            <input
              type="text"
              required
              placeholder="Enter action criteria"
              value={badgeData.criteria?.action}
              onChange={(e) =>
                setBadgeData({
                  ...badgeData,
                  criteria: {
                    ...badgeData.criteria,
                    action: e.target.value,
                  },
                })
              }
              className="w-full border rounded-xl bg-transparent p-3 outline-none focus:border-yellow-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">
              Badge Description
            </label>

            <textarea
              required
              rows={4}
              placeholder="Enter badge description"
              value={badgeData.description}
              onChange={(e) =>
                setBadgeData({
                  ...badgeData,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-xl bg-transparent p-3 outline-none focus:border-yellow-500 resize-none"
            />
          </div>

          {/* Badge Image */}
          <div>
            <label className="block mb-2 font-semibold">Badge Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-xl p-3 cursor-pointer"
            />

            {(file || badgeData.image) && (
              <div className="relative mt-4 w-36 h-36 rounded-xl overflow-hidden border">
                <img
                  src={file ? URL.createObjectURL(file) : badgeData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => {
                    setFile(null);

                    setBadgeData({
                      ...badgeData,
                      image: "",
                    });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>

          {/* Animation JSON */}
          <div>
            <label className="block mb-2 font-semibold">
              Badge Animation (Lottie JSON)
            </label>

            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-yellow-500/40 rounded-2xl p-6 cursor-pointer hover:border-yellow-500 transition bg-black/10">
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setAnimationFile(file);
                  }
                }}
              />

              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">✨</div>

                <p className="font-semibold text-lg">
                  {animationFile || badgeData.animation
                    ? "Change Animation"
                    : "Upload Lottie Animation"}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  Select a .json animation file
                </p>
              </div>
            </label>

            {(animationFile || badgeData.animation) && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-yellow-500/30 bg-black/20 px-4 py-3">
                <div>
                  <p className="font-medium text-sm truncate max-w-[240px]">
                    {animationFile
                      ? animationFile.name
                      : "Existing animation uploaded"}
                  </p>

                  {animationFile && (
                    <p className="text-xs text-muted-foreground">
                      {(animationFile.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAnimationFile(null);

                    setBadgeData({
                      ...badgeData,
                      animation: "",
                    });
                  }}
                  className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded-full"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editLoading}
              className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition disabled:opacity-60"
            >
              {editLoading ? "Editing Badge..." : "Edit Badge"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBadgeModal;
