import { useState } from "react";
import { LoginContext } from "../loginContext";
import SignInSignUpModal from "../../components/common/loginModal";

type ModalState = {
  isOpen: boolean;
  content: string;
};

const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    content: "",
  });

  const showModal = (content: string) => {
    setModalState({ isOpen: true, content });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, content: "" });
  };
  return (
    <LoginContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalState.isOpen && (
        <SignInSignUpModal content={modalState.content} onClose={hideModal} />
      )}
    </LoginContext.Provider>
  );
};

export default LoginModalProvider;
