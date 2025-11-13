import { Toaster } from "sonner";
import AppRouter from "./routes";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useEffect } from "react";
import { fetchUserData } from "./features/user/userThunk";
import { BrowserRouter } from "react-router-dom";
import LoginModalProvider from "./context/provider/loginProvider";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LoginModalProvider>
          <Toaster closeButton richColors />
          <AppRouter />
        </LoginModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
