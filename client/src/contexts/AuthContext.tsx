import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as strapiService from "@/lib/strapi";

interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  avatar?: string;
  bio?: string;
  confirmed: boolean;
  blocked: boolean;
}

interface AuthContextType {
  user: User | null;
  jwt: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const JWT_STORAGE_KEY = "viet_pride_jwt";
const USER_STORAGE_KEY = "viet_pride_user";

// Mock users for testing (remove when Strapi is connected)
const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    email: "admin@vietpride.com",
    password: "admin123",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    bio: "Gang leader and administrator",
    confirmed: true,
    blocked: false,
  },
  {
    id: 2,
    username: "manager",
    email: "manager@vietpride.com",
    password: "manager123",
    role: "Quản Lý Gia Tộc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager",
    bio: "Family manager",
    confirmed: true,
    blocked: false,
  },
  {
    id: 3,
    username: "member",
    email: "member@vietpride.com",
    password: "member123",
    role: "Việt Pride",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=member",
    bio: "Gang member",
    confirmed: true,
    blocked: false,
  },
  {
    id: 4,
    username: "guest",
    email: "guest@vietpride.com",
    password: "guest123",
    role: "Khách",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
    bio: "New user",
    confirmed: true,
    blocked: false,
  },
];

const USE_MOCK_AUTH = false; // Set to false when Strapi is connected

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedJwt = localStorage.getItem(JWT_STORAGE_KEY);
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (storedJwt && storedUser) {
          if (USE_MOCK_AUTH) {
            // For mock auth, just load from localStorage
            setJwt(storedJwt);
            setUser(JSON.parse(storedUser));
          } else {
            // Verify JWT is still valid by fetching user data
            const userData = await strapiService.getMe(storedJwt);
            setJwt(storedJwt);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        // Clear invalid data
        localStorage.removeItem(JWT_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      if (USE_MOCK_AUTH) {
        // Mock login for testing
        const mockUser = MOCK_USERS.find(
          (u) =>
            (u.username === identifier || u.email === identifier) &&
            u.password === password
        );

        if (!mockUser) {
          throw new Error("Invalid credentials");
        }

        const { password: _, ...userWithoutPassword } = mockUser;
        const mockJwt = `mock_jwt_${mockUser.id}_${Date.now()}`;

        // Store JWT and user data
        localStorage.setItem(JWT_STORAGE_KEY, mockJwt);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));

        setJwt(mockJwt);
        setUser(userWithoutPassword);
      } else {
        const response = await strapiService.login(identifier, password);

        // Store JWT and user data
        localStorage.setItem(JWT_STORAGE_KEY, response.jwt);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));

        setJwt(response.jwt);
        setUser(response.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await strapiService.register(username, email, password);
      
      // Store JWT and user data
      localStorage.setItem(JWT_STORAGE_KEY, response.jwt);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      
      setJwt(response.jwt);
      setUser(response.user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem(JWT_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Clear state
    setJwt(null);
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    if (!jwt || !user) {
      throw new Error("Not authenticated");
    }

    try {
      const updatedUser = await strapiService.updateUserProfile(jwt, user.id, data);
      
      // Update local storage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error("Update user failed:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    jwt,
    isLoading,
    isAuthenticated: !!user && !!jwt,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
