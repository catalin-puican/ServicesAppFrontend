import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "@/contexts/User/useUserContext";
import { Spinner } from "../ui/spinner";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { currentUser, isLoading } = useUserContext();

  if (isLoading) {
    return <div><Spinner/></div>
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
