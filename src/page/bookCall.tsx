import { useFormik } from "formik";
import { bookCallSchema } from "../validation/bookCallValidation";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import {
  availableSlotsThunk,
  bookSlotThunk,
} from "../features/bookCall/bookCallThunk";
import { toast } from "sonner";
import {
  resetBookCallSlice,
  resetCompleteBookSlice,
} from "../features/bookCall/bookCallSlice";
import { Navigate, useNavigate } from "react-router-dom";

const BookCall = () => {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useAppDispatch();
  const { error, loading, slots, message, success, slotsLoading, complete } =
    useAppSelector((state) => state.book_call);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

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
    navigate("/");
    dispatch(resetCompleteBookSlice());
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen"
 
    >
      <div className=" border shadow-lg md:rounded-2xl p-8 w-full max-w-3xl">
        {complete ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
              🎉 Thank You!
            </h1>
            <p className="text-foreground">
              Your call has been successfully booked. We'll send you the meeting
              link shortly via email and SMS.
            </p>
            <button
              className="mt-4 bg-foreground text-background font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition"
              onClick={handleBack}
            >
              Go back to home
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
              BOOK A ONE ON ONE CALL
            </h1>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-destructive text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-destructive text-sm">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-foreground">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter your mobile number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    formik.setFieldValue("mobileNumber", value.slice(0, 10));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  className="w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none"
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-destructive text-sm">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium text-foreground">
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
                  className="w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none"
                >
                  <option value="">Select a type</option>
                  <option value="psychology">Psychology</option>
                  <option value="astrology">Astrology</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-destructive text-sm">{formik.errors.type}</p>
                )}
              </div>
            </div>

            <div className="md:grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-foreground">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  className="w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-destructive text-sm">{formik.errors.date}</p>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <label className="block mb-1 font-medium text-foreground">
                  Available Time
                </label>
                <select
                  name="time"
                  disabled={!formik.values.date || !formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                  className={`w-full border border-border bg-background text-foreground rounded-lg h-13 px-3 py-2 focus:ring focus:ring-ring focus:outline-none ${
                    !formik.values.date ? "cursor-not-allowed opacity-50" : ""
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
                  <p className="text-destructive text-sm">{formik.errors.time}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={`w-32 font-semibold py-3 rounded-lg transition 
                  ${
                    !(formik.isValid && formik.dirty)
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-foreground text-background hover:opacity-90"
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