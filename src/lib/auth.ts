import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";

// Mock data storage - would be replaced with real backend
const USERS_KEY = "bank-micro-saas-users";
const SESSIONS_KEY = "bank-micro-saas-sessions";
const INVESTMENTS_KEY = "bank-micro-saas-investments";
const ADMIN_CREDENTIALS = {
  email: "lucas.alves@bankapp.com",
  password: "Santos7@7@", // In a real app, use hashed passwords
};

// Types
export interface User {
  id: string;
  email: string;
  password: string; // In a real app, store hashed passwords
  fullName: string;
  phone: string;
  intendedInvestment: number;
  role: "admin" | "client";
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  amount: number;
  startDate: string;
  endDate: string;
  interestRate: number;
  createdAt: string;
  status: "active" | "completed" | "pending";
}

export interface Session {
  userId: string;
  role: "admin" | "client";
  expiresAt: string;
}

// Initialize local storage with default data
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(INVESTMENTS_KEY)) {
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(SESSIONS_KEY)) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify([]));
  }
};

// Get all users
export const getUsers = (): User[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

// Get all investments
export const getInvestments = (): Investment[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(INVESTMENTS_KEY) || "[]");
};

// Register a new user
export const registerUser = (userData: Omit<User, "id" | "role" | "createdAt">): User | null => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    toast({
      title: "Registration failed",
      description: "Email already registered",
      variant: "destructive",
    });
    return null;
  }
  
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substring(2, 11),
    role: "client",
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  toast({
    title: "Registration successful",
    description: "Your account has been created",
  });
  
  return newUser;
};

// Login
export const loginUser = (email: string, password: string): User | null => {
  initializeStorage();
  
  // Check for admin login
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const adminUser: User = {
      id: "admin",
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
      fullName: "System Administrator",
      phone: "",
      intendedInvestment: 0,
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    
    // Create session
    const session: Session = {
      userId: adminUser.id,
      role: adminUser.role,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    
    localStorage.setItem(SESSIONS_KEY, JSON.stringify([session]));
    
    toast({
      title: "Login successful",
      description: "Welcome back, Administrator",
    });
    
    return adminUser;
  }
  
  // Regular user login
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return null;
  }
  
  // Create session
  const session: Session = {
    userId: user.id,
    role: user.role,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
  
  localStorage.setItem(SESSIONS_KEY, JSON.stringify([session]));
  
  toast({
    title: "Login successful",
    description: `Welcome back, ${user.fullName}`,
  });
  
  return user;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem(SESSIONS_KEY);
  
  toast({
    title: "Logged out",
    description: "You have been successfully logged out",
  });
};

// Check if user is logged in
export const getCurrentSession = (): Session | null => {
  const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
  const currentSession = sessions[0];
  
  if (!currentSession) return null;
  
  // Check if session is expired
  if (new Date(currentSession.expiresAt) < new Date()) {
    localStorage.removeItem(SESSIONS_KEY);
    return null;
  }
  
  return currentSession;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const session = getCurrentSession();
  if (!session) return null;
  
  if (session.userId === "admin") {
    return {
      id: "admin",
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
      fullName: "System Administrator",
      phone: "",
      intendedInvestment: 0,
      role: "admin",
      createdAt: new Date().toISOString(),
    };
  }
  
  const users = getUsers();
  return users.find(user => user.id === session.userId) || null;
};

// Get user investments
export const getUserInvestments = (userId: string): Investment[] => {
  const investments = getInvestments();
  return investments.filter(investment => investment.userId === userId);
};

// Create investment
export const createInvestment = (investmentData: Omit<Investment, "id" | "createdAt">): Investment => {
  const investments = getInvestments();
  
  const newInvestment: Investment = {
    ...investmentData,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
  };
  
  investments.push(newInvestment);
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
  
  toast({
    title: "Investment created",
    description: "The investment has been successfully created",
  });
  
  return newInvestment;
};

// Update investment
export const updateInvestment = (id: string, data: Partial<Investment>): Investment | null => {
  const investments = getInvestments();
  const index = investments.findIndex(inv => inv.id === id);
  
  if (index === -1) {
    toast({
      title: "Update failed",
      description: "Investment not found",
      variant: "destructive",
    });
    return null;
  }
  
  const updatedInvestment = { ...investments[index], ...data };
  investments[index] = updatedInvestment;
  
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
  
  toast({
    title: "Investment updated",
    description: "The investment has been successfully updated",
  });
  
  return updatedInvestment;
};

// Delete investment
export const deleteInvestment = (id: string): boolean => {
  const investments = getInvestments();
  const filteredInvestments = investments.filter(inv => inv.id !== id);
  
  if (filteredInvestments.length === investments.length) {
    toast({
      title: "Deletion failed",
      description: "Investment not found",
      variant: "destructive",
    });
    return false;
  }
  
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(filteredInvestments));
  
  toast({
    title: "Investment deleted",
    description: "The investment has been successfully deleted",
  });
  
  return true;
};

// Custom hook for auth protected routes
export const useAuthProtection = (requiredRole?: "admin" | "client") => {
  const navigate = useNavigate();
  const session = getCurrentSession();
  
  if (!session) {
    navigate("/login");
    return false;
  }
  
  if (requiredRole && session.role !== requiredRole) {
    navigate(session.role === "admin" ? "/admin" : "/dashboard");
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
