import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: "",
    isAuthenticated: false,
    isBootstrapping: true,
    user: null,
  });

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const response = await api.get("/users/me");
        setAuth({
          token: "",
          isAuthenticated: true,
          isBootstrapping: false,
          user: response.data?.data || null,
        });
      } catch {
        setAuth({
          token: "",
          isAuthenticated: false,
          isBootstrapping: false,
          user: null,
        });
      }
    };

    bootstrapAuth();
  }, []);

  const value = useMemo(
    () => ({
      token: auth.token,
      isAuthenticated: auth.isAuthenticated,
      isBootstrapping: auth.isBootstrapping,
      user: auth.user,
      login: (token, user = null) =>
        setAuth({
          token,
          isAuthenticated: true,
          isBootstrapping: false,
          user,
        }),
      logout: async () => {
        try {
          await api.post("/users/logout");
        } catch {
          // Ignore logout API failures and clear client state anyway.
        }

        setAuth({
          token: "",
          isAuthenticated: false,
          isBootstrapping: false,
          user: null,
        });
      },
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
