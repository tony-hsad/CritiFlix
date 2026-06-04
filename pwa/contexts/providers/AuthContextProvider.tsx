import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {login, getMe, logout, register, registerType} from "../../services/api/authApi";
import {User} from "@/types/UsersApi";

type registerUserSignature = (u: registerType) => Promise<void>

type authContext = {
  loading: boolean;
  loginUser: (u: string, p: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: registerUserSignature;
  resolved: boolean;
  user?: User;
}

const AuthContext = createContext<authContext>({
  loading: false,
  loginUser: () => new Promise(() => {}),
  logoutUser: () => {},
  registerUser: () => new Promise(() => {}),
  resolved: false,
  user: undefined,
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();
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
        logout();
        setUser(undefined);
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
    setUser(undefined);
  };

  const registerUser: registerUserSignature = (userData) => {
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
