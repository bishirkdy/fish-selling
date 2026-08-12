import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUser } from "../../tanstack/hooks/queries/auth/authQueries";

const ProtectedRoute = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isBlocked) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;