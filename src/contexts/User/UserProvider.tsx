import { useEffect, useState, type FC } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import type { User } from "@/schemas/Users/UserSchema";
import { getCurrentUser, logout } from "@/services/Users/UsersService";

type UserProviderProps = {
    children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentUser = async () => {
        try
        {
            setIsLoading(true);
            setError(null);
            const user = await getCurrentUser();
            setCurrentUser(user);
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to get current user";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const logoutUser = async () => {
        try
        {
            setIsLoading(true);
            setError(null);
            await logout();
            setCurrentUser(null);
        }
        catch(error)
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to logout user";
            setError(errorMessage);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const refreshCurrentUser = async () => {
        await fetchCurrentUser();
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const value: UserContextType = {
        currentUser,
        isLoading,
        error,
        setCurrentUser,
        refreshCurrentUser,
        logoutUser,
    };
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};