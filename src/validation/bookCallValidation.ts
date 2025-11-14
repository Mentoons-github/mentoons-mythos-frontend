import * as Yup from "yup";

export const bookCallSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),

  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),

  mobileNumber: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number"
    )
    .required("Mobile Number is required"),

  date: Yup.date().required("Please select a date"),

  time: Yup.string().required("Please select a time"),

  type: Yup.string().required("Please select a consultation type"),
});
