import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  blockUserThunk,
  fetchAllUserThunk,
} from "../../features/user/userThunk";
import { format } from "date-fns";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";
import { resetUserSlice } from "../../features/user/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { allUsers, loading, success, blockMessage, error } = useAppSelector(
    (state) => state.user
  );
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUserThunk());

    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(blockMessage);
      dispatch(resetUserSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetUserSlice());
    }
  }, [blockMessage, dispatch, error, success]);

  const handleBlockToggle = (userId: string) => {
    dispatch(blockUserThunk(userId));
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {!showTable || loading ? (
        <div className="text-gray-300 flex items-center justify-center">
          Loading users data...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Profile</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Date Of Birth</th>
                <th className="px-4 py-4 text-left">Country</th>
                <th className="px-4 py-4 text-left">Is Blocked</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm">
                        {user.firstName[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    {user.dateOfBirth
                      ? format(new Date(user.dateOfBirth), "dd MMM yyyy")
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    {user.country ? user.country : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    <Switch
                      checked={user.isBlocked}
                      onCheckedChange={() =>
                        user._id && handleBlockToggle(user._id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
