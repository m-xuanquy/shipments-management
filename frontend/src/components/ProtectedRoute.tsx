import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import Layout from "./Layout";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout><Outlet /></Layout>;
}
