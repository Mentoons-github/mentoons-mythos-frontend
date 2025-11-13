import { useEffect } from "react";
import { userLogout } from "../../features/user/userThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

const UserShow = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { logoutSuccess } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/");
      onClose();
    }
  }, [logoutSuccess, navigate, onClose]);

  return (
    <div className="absolute right-0 top-10 mt-2 bg-background space-y-2 shadow-md rounded-md w-40 p-2 z-20">
      <button
        onClick={() => {
          navigate("/employee/profile");
          onClose();
        }}
        className="w-full text-left px-4 py-2  rounded-md bg-foreground text-background hover:border hover:border-foreground hover:bg-background hover:text-foreground"
      >
        Profile
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 bg-foreground text-red-600 hover:bg-gray-500 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default UserShow;
