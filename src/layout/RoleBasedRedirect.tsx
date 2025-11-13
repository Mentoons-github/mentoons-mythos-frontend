import { Loader } from "lucide-react";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import MythosLayout from "./mythos";

const RoleBasedRedirect = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  console.log("first", user)

  if (loading) return <Loader />;

  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === "employee")
    return <Navigate to="/employee/dashboard" replace />;

  return <MythosLayout />;
};

export default RoleBasedRedirect;
