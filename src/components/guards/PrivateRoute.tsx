import { Navigate } from "react-router-dom";
import { useUserContext } from "@/contexts/User/useUserContext";
import { Spinner } from "../ui/spinner";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { currentUser, isLoading } = useUserContext();

    if (isLoading) {
        return <div><Spinner/></div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
