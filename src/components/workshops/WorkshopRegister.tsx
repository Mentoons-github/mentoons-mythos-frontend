import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { workshopRegisterThunk } from "../../features/workshop/workshopThunk";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../features/workshop/workshopSlice";

const WorkshopRegister = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { message, loading, error, success, workshops } = useAppSelector(
    (state) => state.workshop
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    category: "",
    message: "",
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetWorkshopSlice());
      setForm({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        category: "",
        message: "",
      });
    }
    if (error) {
      toast.error(error);
      dispatch(resetWorkshopSlice());
    }
  }, [dispatch, error, message, success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const finalForm = { ...form, userId: user?._id as string };

  const handleSubmit = (e: React.FormEvent) => {
    const selectedWorkshop = workshops.find((w) => w.age === form.category);

    e.preventDefault();
    if (!user) {
      toast.warning("Please login to register this workshop");
    } else {
      dispatch(
        workshopRegisterThunk({
          details: finalForm,
          workshopId: selectedWorkshop?._id as string,
        })
      );
    }
  };

  return (
    <div className=" mt-12   flex flex-col lg:flex-row items-center lg:p-8 md:gap-10 ">
      <div className="flex-1 text-center md:text-left ">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-6  md:max-w-xl">
          REGISTER FOR OUR WORKSHOP HERE!
        </h1>
        <img
          src="assets/workshops/workshop-registration.png"
          alt="Workshop Registration"
          className="md:max-w-md"
        />
      </div>

      <div className="w-full lg:w-xl p-8 rounded-2xl shadow-sm border border-muted-foreground">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="md:flex gap-6 space-y-6">
            <div className="flex-1">
              <label className="block  font-bold ">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 h-12 py-2 border rounded-lg focus:ring-1 focus:ring-foreground outline-none"
                placeholder="Enter your first name"
              />
            </div>

            <div className="flex-1">
              <label className="block font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 h-12 border rounded-lg focus:ring-1 focus:ring-foreground outline-none"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="md:flex gap-6 space-y-6">
            <div className="flex-1">
              <label className="block font-bold">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 h-12 border rounded-lg focus:ring-1 focus:ring-foreground outline-none"
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="md:flex-1">
              <label className="block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 h-12 border rounded-lg focus:ring-1 focus:ring-foreground outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-1 focus:ring-foreground outline-none"
              placeholder="Any special notes..."
              rows={3}
            ></textarea>
          </div>

          <div className="">
            <label className="block font-bold mb-2">
              Select Category
            </label>
            <div className="gap-5 flex">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="6-12"
                  checked={form.category === "6-12"}
                  onChange={handleChange}
                  className="w-3 h-3 accent-blue-500"
                />
                <span className="font-semibold">Age 6-12</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="13-19"
                  checked={form.category === "13-19"}
                  onChange={handleChange}
                  className="w-3 h-3 accent-blue-500"
                />
                <span className="font-semibold">Age 13-19</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background text-lg font-bold py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Submitting details..." : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkshopRegister;
