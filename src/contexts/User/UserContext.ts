import type { User } from "@/schemas/Users/UserSchema";
import { createContext } from "react";

export type UserContextType = {
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
    setCurrentUser: (user: User | null) => void;
    refreshCurrentUser: () => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);