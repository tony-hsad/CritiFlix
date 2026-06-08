import { createContext } from "react";

/**
 * @typedef {import("%types/UsersApi").User} User
 */

/**
 * @type {import("react").Context<{
 *   user: Me,
 *   resolved: boolean,
 *   loginUser: (email: string, password: string) => Promise<User>,
 *   logoutUser: () => void,
 *   loading: false,
 * }>}
 */

const AuthContext = createContext({
  user: undefined,
  resolved: false,
  loginUser: (email, password) => Promise<User>,
  logoutUser: () => {},
  loading: false,
});

export default AuthContext;
