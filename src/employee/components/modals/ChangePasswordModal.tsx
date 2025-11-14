import ReactDOM from "react-dom";
import { Eye, EyeOff, X } from "lucide-react";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../../validation/authValidation";
import { changePasswordThunk } from "../../../features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { toast } from "sonner";
import { resetAuthState } from "../../../features/auth/authSlice";

const ChangePasswordModal = ({
  onClose,
  employeeId,
}: {
  onClose: () => void;
  employeeId: string;
}) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, message, error, success } = useAppSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,

    onSubmit: async (values) => {
      dispatch(
        changePasswordThunk({
          passwords: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          userId: employeeId as string,
        })
      );
      console.log("object", values);
    },
  });
  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetAuthState());
      formik.initialValues.currentPassword = "";
      formik.initialValues.newPassword = "";
      formik.initialValues.confirmPassword = "";
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [dispatch, error, formik.initialValues, message, onClose, success]);
  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 w-full">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-8 bg-secondary hide-scrollbar">
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            {/* Current Password */}
            <div className="relative">
              <Input
                label="Current Password"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? formik.errors.currentPassword
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <Input
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? formik.errors.newPassword
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-primary"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 rounded-md py-2 bg-foreground text-background hover:bg-background hover:text-foreground border hover:border-foreground"
              >
                {loading ? "Updating..." : " Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ChangePasswordModal;
