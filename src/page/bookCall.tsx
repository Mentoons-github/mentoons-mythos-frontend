import { useFormik } from "formik";
import { bookCallSchema } from "../validation/bookCallValidation";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import {
  availableSlotsThunk,
  bookSlotThunk,
} from "../features/bookCall/bookCallThunk";
import { toast } from "sonner";
import { resetBookCallSlice, resetCompleteBookSlice } from "../features/bookCall/bookCallSlice";
import { useNavigate } from "react-router-dom";

const BookCall = () => {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useAppDispatch();
  const { error, loading, slots, message, success, slotsLoading, complete } =
    useAppSelector((state) => state.book_call);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      date: "",
      time: "",
      type: "",
    },
    validationSchema: bookCallSchema,
    onSubmit: (values) => {
      dispatch(bookSlotThunk(values));
    },
  });

  useEffect(() => {
    if (formik.values.date && formik.values.type) {
      dispatch(
        availableSlotsThunk({
          date: formik.values.date,
          type: formik.values.type,
        })
      );
    }
  }, [formik.values.date, formik.values.type, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetBookCallSlice());
      formik.resetForm();
    }
    if (error) {
      toast.error(error);

      dispatch(resetBookCallSlice());
    }
  }, [dispatch, error, formik, message, success]);

  const handleBack = () => {
     navigate("/")
     dispatch(resetCompleteBookSlice())
  } 

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 "
      style={{
        backgroundImage: "url('/assets/call.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1500px",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 shadow-lg md:rounded-2xl p-8 w-full max-w-3xl">
        {complete ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-green-600">🎉 Thank You!</h1>
            <p className="text-gray-700">
              Your call has been successfully booked. We’ll send you the meeting
              link shortly via email and SMS.
            </p>
            <button
              className="mt-4 bg-black/90 text-white font-semibold py-2 px-6 rounded-lg hover:bg-black/80 transition"
              onClick={handleBack}
            >
              Go back to home
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-center">
              BOOK A ONE ON ONE CALL
            </h1>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    formik.setFieldValue("mobileNumber", value.slice(0, 10));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  className="w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium">
                  Consultation Type
                </label>
                <select
                  name="type"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("date", "");
                    formik.setFieldValue("time", "");
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  className="w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                >
                  <option value="">Select a type</option>
                  <option value="psychology">Psychology</option>
                  <option value="astrology">Astrology</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-red-500 text-sm">{formik.errors.type}</p>
                )}
              </div>
            </div>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  className="w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-red-500 text-sm">{formik.errors.date}</p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium">Available Time</label>
                <select
                  name="time"
                  disabled={!formik.values.date || !formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                  className={`w-full border border-black rounded-lg px-3 py-2 focus:ring focus:ring-blue-400 ${
                    !formik.values.date ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">Select a slot</option>
                  {slots && slots.available.length > 0 ? (
                    slots.available.map((slot: string) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))
                  ) : slotsLoading ? (
                    <option disabled>Loading Slots</option>
                  ) : (
                    <option disabled>No slots available</option>
                  )}
                </select>
                {formik.touched.time && formik.errors.time && (
                  <p className="text-red-500 text-sm">{formik.errors.time}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={`w-32 font-semibold py-2 rounded-lg transition 
      ${
        !(formik.isValid && formik.dirty)
          ? "bg-black/60 cursor-not-allowed"
          : "bg-black/90 text-white hover:bg-black/80"
      }`}
              >
                {loading ? "Booking Call" : "Book Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookCall;
