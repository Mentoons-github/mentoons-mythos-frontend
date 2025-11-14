import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fileUploadThunk } from "../../features/upload/fileUploadThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { submitMentorFormThunk } from "../../features/mentor/mentorThunk";
import { resetMentorSlice } from "../../features/mentor/mentorSlice";

const genders = ["Male", "Female", "Other", "Prefer not to say"];
const mentorTypes = ["Spiritual Mentor", "Astrology Mentor"];

const BusinessForm = () => {
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.mentor
  );
  const [mentorType, setMentorType] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState(["", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    gender: "",
    age: "",
    resume: null as File | null,
  });
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetMentorSlice());
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        whatsappNumber: "",
        gender: "",
        age: "",
        resume: null,
      });
      setFileName(null);
      setSocialLinks(["", "", ""]);
      setMentorType("");
    }
    if (error) {
      toast.error(error);
      dispatch(resetMentorSlice());
    }
  }, [dispatch, error, message, success]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files?.[0]
    ) {
      setFileName(target.files[0].name);
      setFormData((prev) => ({ ...prev, resume: target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mentorType) {
      alert("Please select a mentor type before submitting.");
      return;
    }

    const filteredLinks = socialLinks.filter((link) => link.trim() !== "");
    if (filteredLinks.length === 0) {
      toast.error("Please provide at least one social link.");
      return;
    }

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      resume,
      gender,
      age,
      whatsappNumber,
    } = formData;

    if (
      !firstName ||
      !email ||
      !mobileNumber ||
      !resume ||
      !gender ||
      !lastName ||
      !age ||
      !whatsappNumber
    ) {
      toast.error("Please fill in all fields ");
      return;
    }

    let fileUrl: string = "";

    try {
      const result = await dispatch(
        fileUploadThunk({ file: resume, category: "career" })
      ).unwrap();

      if (typeof result === "string") {
        fileUrl = result;
      } else if (Array.isArray(result) && result.length > 0) {
        fileUrl = result[0].url;
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (err) {
      toast.error("File upload failed. Please try again. " + err);
      return;
    }

    const finalData = {
      ...formData,
      resume: fileUrl,
      age: Number(age),
      mobileNumber: Number(mobileNumber),
      whatsappNumber: Number(whatsappNumber),
      mentorType,
      socialLinks: filteredLinks,
    };
    console.log("Form Data:", finalData);
    dispatch(submitMentorFormThunk(finalData));
  };

  return (
    <div className="border rounded-2xl p-6 relative">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Become a Guiding Light — Join Our Mentor Team Today!
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Share your expertise and inspire others by joining our mentorship
          program. Fill out the form below to get started.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Select Mentor Type</h2>
        <div className="grid grid-cols-2 gap-4">
          {mentorTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMentorType(type)}
              className={`border rounded-lg py-2 font-medium transition-all ${
                mentorType === type
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {/* {!mentorType && (
          <p className="text-sm text-red-500 mt-">
            * Please select a mentor type
          </p>
        )} */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
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
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setFormData((prev) => ({ ...prev, whatsappNumber: value }));
                }
              }}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter WhatsApp number"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Resume</label>
            <label
              className="flex items-center justify-between h-11 mt-1
                   w-full border rounded-lg cursor-pointer 
                   bg-background text-foreground hover:bg-background/80 px-4 text-sm"
            >
              {fileName ? fileName : "Choose File"}
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Social Links</label>
          <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            {socialLinks.map((link, index) => (
              <input
                key={index}
                type="url"
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                placeholder={`Social Link ${index + 1}`}
                className="block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
                required={index === 0}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            *At least one social link is required
          </p>
        </div>

        <div className="flex justify-end ">
          <button
            disabled={loading}
            type="submit"
            className=" bg-foreground text-background font-semibold py-3 px-4 rounded-lg shadow hover:bg-foreground/80 disabled:cursor-not-allowed disabled:bg-muted-foreground"
          >
            {loading ? "Submitting your details" : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
