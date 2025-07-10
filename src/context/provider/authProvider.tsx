import React, { useEffect, useState } from "react";
import apiClient from "../../services/axiosInstance";
import { authContext } from "../authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/user/", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};
