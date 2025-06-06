import { createContext } from "react";
import type { User } from "../types/User";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    errorMessage: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);