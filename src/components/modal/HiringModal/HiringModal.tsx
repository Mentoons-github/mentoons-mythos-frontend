import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fileUploadThunk } from "../../../features/upload/fileUploadThunk";
import { applyCareerThunk } from "../../../features/career/careerThunk";
import { resetCareerSlice } from "../../../features/career/careerSlice";
import { toast } from "sonner";
import { City } from "country-state-city";

type HiringModalProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  jobId: string;
};

const genders = ["Male", "Female", "Other", "Prefer not to say"];

const HiringModal = ({ setModalOpen, title, jobId }: HiringModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    gender: "",
    coverNote: "",
    cLocation: "",
    resume: null as File | null,
  });
  const [fileName, setFileName] = useState<string>("");

  // ✅ Fetch Indian cities from country-state-city
  const cities = City.getCitiesOfCountry("IN") || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    } else {
      setFileName("");
      setFormData((prev) => ({ ...prev, resume: null }));
    }
  };

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, mobileNumber, resume, gender, coverNote, cLocation } =
      formData;

    if (
      !name ||
      !email ||
      !mobileNumber ||
      !resume ||
      !gender ||
      coverNote ||
      !cLocation
    ) {
      toast.error("Please fill in all fields ");
      return;
    }

     if (!cities.some((city) => city.name === cLocation)) {
      toast.error("Please select a valid city.");
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

    const data = {
      ...formData,
      mobileNumber: Number(mobileNumber),
      resume: fileUrl,
      position,
    };

    dispatch(applyCareerThunk({ data, jobId }));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-mulish"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="bg-gradient-to-t from-[#b6b4b4] to-[#f2f2f6] rounded-2xl shadow-xl w-[90%] max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-extrabold mb-1">{title}</h2>
          <p className="mb-4 text-gray-600">
            Fill in the details below and we'll contact you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border h-11 border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black"
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border h-11 border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Mobile + Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setFormData((prev) => ({ ...prev, mobileNumber: value }));
                  }
                }}
                className="mt-1 block w-full rounded-lg border h-11 border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="10 digit number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border h-11 border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Note
            </label>
            <textarea
              name="coverNote"
              rows={3}
              value={formData.coverNote}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black hide-scrollbar"
              placeholder="Write a short cover note"
              maxLength={600}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.coverNote.length}/600 characters
            </p>
          </div>

          {/* Resume + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume
              </label>
              <label
                className="flex items-center justify-between h-11 mt-1
                   w-full border rounded-lg cursor-pointer 
                   bg-black text-white hover:bg-black/80 px-4 text-sm"
              >
                {fileName ? fileName : "Choose File"}
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Searchable City (datalist) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                list="cityOptions"
                name="cLocation"
                value={formData.cLocation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border h-11 border-gray-600 px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="Type or select city"
                required
              />
              <datalist id="cityOptions">
                {cities.map((city) => (
                  <option key={`${city.name}-${city.stateCode}-${city.countryCode}`} value={city.name} />
                ))}
              </datalist>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block w-full text-center bg-black text-white py-3 rounded-lg shadow hover:bg-black/80 disabled:opacity-50"
          >
            {loading ? "Applying..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HiringModal;
