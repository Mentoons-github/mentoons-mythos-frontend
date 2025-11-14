import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { resetMentorSlice } from "../features/mentor/mentorSlice";
import { fileUploadThunk } from "../features/upload/fileUploadThunk";
import { submitMentorFormThunk } from "../features/mentor/mentorThunk";
import { useLocation, useNavigate } from "react-router-dom";

const genders = ["Male", "Female", "Other", "Prefer not to say"];
const mentorTypes = [
  "Psychology Mentor",
  "Astrology Mentor",
  "Spiritual Guide",
];

const BecomeMentor = () => {
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.mentor
  );
  const location = useLocation();

  const mentor = location?.state?.mentorType || "";

  const [mentorType, setMentorType] = useState<string>(mentor || "");
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
  const navigate = useNavigate();

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
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(resetMentorSlice());
    }
  }, [dispatch, error, message, navigate, success]);

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
      toast.error("Please fill in all required fields.");
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

    dispatch(submitMentorFormThunk(finalData));
  };

  return (
    <div className="border rounded-2xl p-2 md:p-10 lg:px-32  bg-background">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Become a Guiding Light
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Inspire and uplift others by sharing your wisdom, insights, and
          experience. Join our community of mentors and start making a
          meaningful impact today.
        </p>
      </div>

      <div className="mb-10 border p-6 sm:p-10 rounded-xl ">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Choose Your Mentor Path
        </h2>
        <p className="text-muted-foreground mb-6">
          Select the category that best represents your area of expertise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mentorTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMentorType(type)}
              className={`border rounded-lg py-3 font-medium md:text-lg transition-all duration-200 ${
                mentorType === type
                  ? "bg-foreground text-background shadow-lg"
                  : "hover:bg-muted"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {mentorType && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8">
              <div>
                <label className="block text-sm font-medium">
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
                  className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData((prev) => ({
                        ...prev,
                        whatsappNumber: value,
                      }));
                    }
                  }}
                  className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
                  placeholder="Enter WhatsApp number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8">
              <div>
                <label className="block text-sm font-medium">
                  Email Address
                </label>
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
                  <option value="" className="bg-background">
                    Select Gender
                  </option>
                  {genders.map((g) => (
                    <option key={g} value={g} className="bg-background">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8">
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
                <label className="block text-sm font-medium">
                  Upload Resume
                </label>
                <label
                  className="flex items-center justify-between h-11 mt-1
                   w-full border rounded-lg cursor-pointer 
                   bg-background text-foreground hover:bg-muted/50 px-4 text-sm"
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
              <label className="block text-sm font-medium mb-2">
                Social Links
              </label>
              <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:gap-x-8">
                {socialLinks.map((link, index) => (
                  <input
                    key={index}
                    type="url"
                    value={link}
                    onChange={(e) =>
                      handleSocialLinkChange(index, e.target.value)
                    }
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

            <div className="flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className="bg-foreground text-background font-semibold py-3 px-6 rounded-lg shadow hover:bg-foreground/80 transition-all disabled:cursor-not-allowed disabled:bg-muted-foreground"
              >
                {loading ? "Submitting your details..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground mt-10">
        <p>
          Once your application is submitted, our team will review your details
          and get in touch with you within 3–5 business days.
        </p>
        <p className="mt-1 italic">
          Together, let’s guide others toward growth and transformation 🌟
        </p>
      </div>
    </div>
  );
};

export default BecomeMentor;
