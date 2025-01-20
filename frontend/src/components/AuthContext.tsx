import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Funkcja sprawdzająca ważność tokena
  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      refreshToken();
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        console.log("Token jest nieważny lub wygasł.");
        setIsLoggedIn(false);
        logout();
      }
    } catch (error) {
      console.log("Błąd podczas sprawdzania tokena:", error);
      logout();
    }
  };

  // Funkcja odświeżająca token
  const refreshToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/public/refreshToken",
        {
          method: "GET",
          credentials: "include", // Umożliwia przesyłanie ciasteczek HttpOnly
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          console.log("Odświeżony token:", data.token);
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
        }
      } else {
        console.log("Błąd podczas odświeżania tokena");
        logout();
      }
    } catch (error) {
      console.log("Błąd podczas odświeżania tokena:", error);
      logout();
    }
  };

  useEffect(() => {
    // Sprawdzamy ważność tokena podczas inicjalizacji
    checkTokenValidity();

    // Interwał odświeżania tokena co 15 minut (np. 15 * 60 * 1000)
    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000); // Co 15 minut

    return () => clearInterval(interval); // Czyszczenie interwału przy unmount
  }, []);

  const login = (token: string) => {
    console.log("Zapisuję token:", token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log("Usuwam token");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    jsCookie.remove("refreshToken");
    navigate("/"); // Przekierowanie do logowania
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
