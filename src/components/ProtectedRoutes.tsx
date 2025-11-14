import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);

  if(loading){
    <div>Loading....</div>
  }

  if (user) {
    if (user?.role == "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (user?.role == "employee") {
      return <Navigate to="/employee" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
