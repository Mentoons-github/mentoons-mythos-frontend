import { LoginContext } from "../context/loginContext";
import { useContext } from "react";

const useSignInSignUp = () => {
  const context = useContext(LoginContext);
  if (!context)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};

export default useSignInSignUp;
