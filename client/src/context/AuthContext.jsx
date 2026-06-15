import { useContext, createContext } from "react";
import { loginUser, registerUser } from "../features/auth/services/authService";
import { useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  async function signup({ first, last, email, password }) {
    try {
      const data = await registerUser({
        first,
        last,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async function login({ email, password }) {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
