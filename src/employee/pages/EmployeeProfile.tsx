import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { formatToRealDate } from "../../utils/DateFormate";
import {
  Mail,
  Calendar,
  Briefcase,
  Users,
  IdCard,
  User,
  LucideIcon,
  Plus,
} from "lucide-react";
import { fileUploadThunk } from "../../features/upload/fileUploadThunk";
import { updateEmployeeProfileThunk } from "../../features/employee/employeeThunk";
import { toast } from "sonner";
import { resetEmployeeState } from "../../features/employee/employeeSlice";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";

const EmployeeProfile = () => {
  const { singleEmployee, singleLoading } = useAppSelector(
    (state) => state.admin
  );
  const { error, loading, message, success } = useAppSelector(
    (state) => state.employee
  );
  const { loading: uploadLoading } = useAppSelector((state) => state.upload);
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    profileImage: "",
  });
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (success) {
      toast.success(message);
      resetEmployeeState();
    }
    if (error) {
      toast.error(error);
      resetEmployeeState();
    }
  }, [error, message, success]);

  useEffect(() => {
    if (singleEmployee) {
      setDetails({
        name: singleEmployee.name,
        profileImage: singleEmployee.profileImage ?? "",
      });
    }
  }, [singleEmployee]);

  type InfoCardProps = {
    icon: LucideIcon;
    label: string;
    value?: string | number | null;
  };

  const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => (
    <div className="rounded-xl p-5 border hover:shadow-md transition-all duration-300 hover:border-muted-foreground">
      <div className="flex items-start gap-3">
        <div className="mt-1 p-2 bg-muted rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-base font-semibold truncate">{value || "—"}</p>
        </div>
      </div>
    </div>
  );

  const handleImageClick = () => {
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setPreviewImage(null);
    setFile(null);
    setDetails({
      name: singleEmployee?.name || "",
      profileImage: singleEmployee?.profileImage || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | null = details.profileImage;

    if (file) {
      try {
        const result = await dispatch(
          fileUploadThunk({ file, category: "employee_profile" })
        ).unwrap();
        if (typeof result === "string") {
          imageUrl = result;
        } else if (Array.isArray(result) && result.length > 0) {
          imageUrl = result[0].url;
        } else {
          throw new Error("Invalid upload response");
        }
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    }

    const updatedEmployee = {
      ...singleEmployee,
      name: details.name,
      profileImage: imageUrl as string,
    };

    await dispatch(
      updateEmployeeProfileThunk({
        data: updatedEmployee,
        employeeId: singleEmployee?._id as string,
      })
    ).unwrap();

    setDetails({
      name: updatedEmployee.name,
      profileImage: updatedEmployee.profileImage,
    });
    setPreviewImage(null);
    setFile(null);
    setIsEditable(false);
  };

  const hasChanges = details.name !== singleEmployee?.name || file !== null; // true if a new file is selected

  return (
    <div className="relative w-full overflow-y-auto rounded-2xl hide-scrollbar p-4 lg:p-6">
      {singleLoading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <span className="mt-4 font-medium">Loading employee profile...</span>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl shadow-xl overflow-hidden bg-secondary">
              {/* Header Gradient */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 h-32 sm:h-40">
                <div className="absolute inset-0 opacity-10"></div>
              </div>

              <div className="relative px-4 sm:px-8 pb-8">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
                  {/* Profile Image */}
                  <div className="relative group flex-shrink-0">
                    <div
                      className="relative group cursor-pointer"
                      onClick={handleImageClick}
                    >
                      <img
                        src={
                          previewImage ||
                          details.profileImage ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt={details.name || "Employee"}
                        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-500"
                      />
                    </div>

                    {isEditable && (
                      <div
                        className="w-7 h-7 z-10 bg-background rounded-full flex items-center justify-center border border-foreground absolute bottom-1 right-1 cursor-pointer"
                        onClick={handleImageClick}
                      >
                        <Plus size={20} />
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Name + Designation */}
                  <div className="flex-1 text-center sm:text-left mb-2">
                    {isEditable ? (
                      <input
                        type="text"
                        name="name"
                        value={details.name}
                        className="text-2xl sm:text-3xl font-bold mb-1 border-b border-indigo-500 focus:outline-none w-full text-center sm:text-left"
                        onChange={handleChange}
                      />
                    ) : (
                      <h1 className="text-2xl sm:text-3xl font-bold mb-1 w-full ">
                        {details.name || "Unnamed Employee"}
                      </h1>
                    )}
                    <p className="text-base sm:text-lg text-indigo-600 font-medium">
                      {singleEmployee?.designation || "—"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
                    {!isEditable ? (
                      <>
                        <button
                          type="button"
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-foreground text-background hover:bg-background hover:text-foreground border hover:border-foreground transition"
                          onClick={() => setIsEditable(true)}
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() => setChangePasswordModal(true)}
                          type="button"
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-foreground text-background hover:bg-background hover:text-foreground border hover:border-foreground transition"
                        >
                          Change Password
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 border transition"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`w-full sm:w-auto px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 border transition ${
                            !hasChanges
                              ? "opacity-50 cursor-not-allowed hover:bg-green-600"
                              : ""
                          }`}
                          disabled={!hasChanges || loading || uploadLoading}
                        >
                          {loading ? "Updating Profile" : "Save Changes"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Info Sections */}
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoCard
                        icon={Mail}
                        label="Email Address"
                        value={singleEmployee?.email}
                      />
                      <InfoCard
                        icon={IdCard}
                        label="Employee ID"
                        value={singleEmployee?.employeeID}
                      />
                      <InfoCard
                        icon={User}
                        label="Gender"
                        value={singleEmployee?.gender}
                      />
                      <InfoCard
                        icon={Calendar}
                        label="Date Joined"
                        value={
                          singleEmployee?.createdAt
                            ? formatToRealDate(singleEmployee.createdAt)
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* Employment Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                      Employment Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoCard
                        icon={Briefcase}
                        label="Job Type"
                        value={singleEmployee?.jobType}
                      />
                      <InfoCard
                        icon={Users}
                        label="Department"
                        value={singleEmployee?.department}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {changePasswordModal && (
        <ChangePasswordModal
          onClose={() => setChangePasswordModal(false)}
          employeeId={singleEmployee?._id as string}
        />
      )}
    </div>
  );
};

export default EmployeeProfile;
