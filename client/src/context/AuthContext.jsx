import { useContext, createContext } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../features/auth/services/authService";
import { useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  useEffect(() => {
    verifyUser();
  }, []);

  async function verifyUser() {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getCurrentUser();

      setUser(data);
    } catch (err) {
      logout(); // token invalid or user deleted
    } finally {
      setLoading(false);
    }
  }

  async function signup({ first, last, email, password }) {
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
  }

  async function login({ email, password }) {
    const data = await loginUser({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
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
      value={{ user, token, isAuthenticated, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
