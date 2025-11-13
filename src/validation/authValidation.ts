import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?_":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter a new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  about: Yup.string().required("Please fill this about field"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Conditions")
    .required("Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  newPassword: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?_":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter a new password"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm your new password"),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Please enter the current password"),

  newPassword: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?_":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter a new password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});
