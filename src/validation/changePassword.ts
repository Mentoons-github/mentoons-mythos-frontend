import * as Yup from "yup";
import { changePassword } from "../features/auth/authApi";
import { AxiosError } from "axios";
import { FormikHelpers } from "formik";

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Please enter the current password"),

  newPassword: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter a new password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const handleSubmit = async (
  values: PasswordFormValues,
  { setSubmitting, resetForm }: FormikHelpers<PasswordFormValues>
) => {
  try {
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    const response = await changePassword(data);

    if (response.data.success) {
      resetForm();
      return { status: true, message: "Password changed" };
    }

    return { status: false, message: response.data.message };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      status: false,
      message: err?.response?.data.message || "Can't change the password",
    };
  } finally {
    setSubmitting(false);
  }
};
