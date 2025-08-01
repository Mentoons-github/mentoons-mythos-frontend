import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllUserThunk } from "../../features/user/userThunk";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.user);
  useEffect(()=>{
    dispatch(fetchAllUserThunk())
  },[dispatch])
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
      <div className=" mt-10 flex gap-10">
        <div className="w-80 h-40 rounded-md bg-[#E39712]  flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Total Users</h1>
          <h2 className="text-xl font-bold">{allUsers.length}</h2>
        </div>
        <div className="w-80 h-40 rounded-md bg-[#E39712]  flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">Total Products</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
