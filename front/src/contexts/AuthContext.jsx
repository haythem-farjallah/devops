import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { setItem, removeItem } = useLocalStorage();
  const saveUser = async (data) => {
    setUser(data.user);
    setToken(data.accessToken);
    setItem("token", data.accessToken);
    setItem("user", JSON.stringify(data.user));
  };

  const updateUser = async (user) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    removeItem("token");
    removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, saveUser, updateUser, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
