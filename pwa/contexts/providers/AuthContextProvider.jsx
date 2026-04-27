import React, { createContext, useContext, useEffect, useState } from "react";
import { login, getMe, logout } from "../../services/api/authApi";

const AuthContext = createContext();

/**
 * Provider that manages the user authentication context
 * @param {object} props component's properties
 * @param {React.ReactNode} [props.children] Children of the AuthContext
 * @returns {React.ReactNode} AuthContextProvider
 */
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        setIsAuthenticated(true);
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

  const loginUser = (email, password) => {
    setLoading(true);
    return login(email, password)
      .then(() => getMe())
      .then((currentUser) => {
        setUser(currentUser);
        setIsAuthenticated(true);
        return currentUser;
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
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, resolved, isAuthenticated, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
