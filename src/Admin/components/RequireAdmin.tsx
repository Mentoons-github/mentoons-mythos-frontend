import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { fetchUserData } from "../../features/user/userThunk";

interface RequireRoleProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const RequireRole = ({ allowedRoles, children }: RequireRoleProps) => {
  const { user, loading, success } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) dispatch(fetchUserData());
  }, [dispatch, user]);

  if (loading) {
    <div>Loading...</div>;
  }

  if (success && !user) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role as string)) {
    // Redirect based on their actual role
    if (user.role === "employee")
      return <Navigate to="/employee/dashboard" replace />;
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireRole;
