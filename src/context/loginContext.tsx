import { createContext } from "react";

type AuthModalContextType = {
  showModal: (content: string) => void;
  hideModal: () => void;
};

export const LoginContext = createContext<AuthModalContextType | undefined>(
  undefined
);
