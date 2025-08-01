import { JSX } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.user);
  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

export default RequireAdmin