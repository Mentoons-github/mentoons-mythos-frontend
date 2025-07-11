import { createContext } from "react";
import { IUser } from "../types";

interface AuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

export const authContext = createContext<AuthContextType | null>(null);
