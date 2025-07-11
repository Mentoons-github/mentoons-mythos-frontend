import React, { useEffect, useState } from "react";
import apiClient from "../../services/axiosInstance";
import { authContext } from "../authContext";
import { IUser } from "../../types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/user/", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, loading }}>
      {children}
    </authContext.Provider>
  );
};
