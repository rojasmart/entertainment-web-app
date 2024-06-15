import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export const PrivateRoutes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return signed ? <Outlet /> : <Navigate to="/" />;
};
