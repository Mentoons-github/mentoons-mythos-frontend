import { createContext } from "react";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const authContext = createContext<AuthContextType | null>(null);
