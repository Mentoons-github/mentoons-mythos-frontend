import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={'/'}/>
  }

  return <>{children}</>;
};

export default ProtectedRoute;
