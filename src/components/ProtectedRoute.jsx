import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {user , loading} = useSelector(s => s.auth)

  console.log("ProtectedRoute", {
  user,
  loading,
});
    if (loading) {
    return <h1>Loading...</h1>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
