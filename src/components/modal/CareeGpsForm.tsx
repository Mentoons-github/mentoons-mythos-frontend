import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { submitCareerGpsThunk } from "../../features/careerGps/careerGpsThunk";
import { toast } from "sonner";
import { resetCareerGpsSlice } from "../../features/careerGps/careerGpsSlice";

interface CareeGpsFormProps {
  onClose: () => void;
}
const genders = ["Male", "Female", "Other", "Prefer not to say"];
const submittedBy = ["Parent", "Student", "Guardian", "Teacher"];

const CareeGpsForm = ({ onClose }: CareeGpsFormProps) => {
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.careerGps
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    gender: "",
    age: "",
    submittedBy: "",
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetCareerGpsSlice());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetCareerGpsSlice());
    }
  }, [dispatch, error, message, onClose, success]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      age: Number(formData.age),
      mobileNumber: Number(formData.mobileNumber),
      whatsappNumber: Number(formData.whatsappNumber),
    };

    dispatch(submitCareerGpsThunk(finalData));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 font-mulish">
      <div className="bg-secondary rounded-2xl shadow-xl w-[90%] max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3  hover:text-muted-foreground"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold border-b pb-2">
          Submit your details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
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
              <label className="block text-sm font-medium">Submitted By</label>
              <select
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border h-11 px-3 py-2 focus:ring"
                required
              >
                <option value="" className="bg-background">
                  Select Who are you
                </option>
                {submittedBy.map((g) => (
                  <option key={g} value={g} className="bg-background">
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button
              disabled={loading}
              type="submit"
              className="bg-foreground text-background font-semibold py-3 px-6 rounded-lg shadow hover:bg-foreground/80 transition-all disabled:cursor-not-allowed disabled:bg-muted-foreground"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareeGpsForm;
