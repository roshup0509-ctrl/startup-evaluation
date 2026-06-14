import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getItem, setItem, removeItem } from "@/lib/storage";

export interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => void;
  signup: (name: string, email: string, password?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    return getItem("user", null);
  });

  const login = (email: string, password?: string) => {
    const defaultUser: User = { name: "Admin", email, role: "Founder" };
    setUser(defaultUser);
    setItem("user", defaultUser);
  };

  const signup = (name: string, email: string, password?: string) => {
    const newUser: User = { name, email, role: "Founder" };
    setUser(newUser);
    setItem("user", newUser);
  };

  const logout = () => {
    setUser(null);
    removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
