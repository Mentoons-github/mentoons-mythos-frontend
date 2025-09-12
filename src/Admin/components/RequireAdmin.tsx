import { JSX } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.user);
  if (user === undefined || user === null) {
    return <div>Loading...</div>;
  }
  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

export default RequireAdmin;
