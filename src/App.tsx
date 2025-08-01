import { Toaster } from "sonner";
import AppRouter from "./routes";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useEffect } from "react";
import { fetchUserData } from "./features/user/userThunk";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  return (
    <>
      <Toaster closeButton richColors />
      <AppRouter />
    </>
  );
}

export default App;
