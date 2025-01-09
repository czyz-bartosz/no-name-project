import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
