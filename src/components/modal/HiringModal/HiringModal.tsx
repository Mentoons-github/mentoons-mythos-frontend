import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fileUploadThunk } from "../../../features/upload/fileUploadThunk";
import { applyCareerThunk } from "../../../features/career/careerThunk";
import { resetCareerSlice } from "../../../features/career/careerSlice";
import { toast } from "sonner";

type HiringModalProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const HiringModal = ({ setModalOpen, title }: HiringModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const { file: uploadedFile } = useAppSelector((state) => state.upload);
  const { message, error, loading, success } = useAppSelector(
    (state) => state.career
  );

  const position = title;

  useEffect(() => {
    if (success) {
      toast.success(message || "Application submitted successfully!");
      dispatch(resetCareerSlice());
      setModalOpen(false); 
    } else if (error) {
      toast.error(error);
      dispatch(resetCareerSlice());
    }
  }, [error, message, success, dispatch, setModalOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !resume || !mobileNumber) {
      toast.error("Please fill in all fields and upload your resume.");
      return;
    }

    let fileUrl: string = uploadedFile ?? "";

    try {
      fileUrl = await dispatch(
        fileUploadThunk({ file: resume, category: "career" }) 
      ).unwrap();
    } catch (err) {
      toast.error("File upload failed. Please try again." + err);
      return;
    }

    dispatch(
      applyCareerThunk({
        name,
        email,
        mobileNumber: Number(mobileNumber), 
        resume: fileUrl,
        position,
      })
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">
          We’re looking for passionate people to join our company. Apply now and
          grow with us!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black"
              value={mobileNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setMobileNumber(value);
                }
              }}
              maxLength={10}
              pattern="\d{10}"
              placeholder="Enter 10 digit number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
              onChange={(e) =>
                setResume(e.target.files ? e.target.files[0] : null)
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block w-full text-center bg-black text-white py-2 rounded-lg shadow hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Applying..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HiringModal;
