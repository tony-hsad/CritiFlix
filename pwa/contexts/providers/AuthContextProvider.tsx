import React, { createContext, useContext, useEffect, useState } from "react";
import { login, getMe, logout, register } from "../../services/api/authApi";

type AuthContextProviderProps = {
  children: React.ReactNode;
}

const AuthContext = createContext();

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setResolved(false);
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setResolved(true);
      setLoading(false);
      return;
    }

    getMe()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("jwt_token");
        setUser(null);
      })
      .finally(() => {
        setResolved(true);
        setLoading(false);
      });
  }, []);

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return login(email, password)
      .then(() => getMe())
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const registerUser = (userData) => {
    return register(userData)
      .then(() => loginUser(userData.email, userData.password))
      .catch((error) => {
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, resolved, loginUser, logoutUser, registerUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
