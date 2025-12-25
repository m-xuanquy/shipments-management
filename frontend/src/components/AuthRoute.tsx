import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function AuthRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
