import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  AppState,
  Order,
  User,
  mockOrders,
  mockUser,
} from "../constants/MockData";

interface ToastData {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

interface AppContextType extends AppState {
  toggleFavorite: (businessId: string) => void;
  addOrder: (order: Omit<Order, "id">) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  updateUserStats: (stats: Partial<User["stats"]>) => void;
  showToast: (toast: ToastData) => void;
  currentToast: ToastData | null;
  dismissToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: mockUser,
    favorites: ["1", "2"],
    orders: mockOrders,
  });
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null);

  const toggleFavorite = (businessId: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(businessId)
        ? prev.favorites.filter((id) => id !== businessId)
        : [...prev.favorites, businessId],
    }));
  };

  const addOrder = (orderData: Omit<Order, "id">) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      orders: [...prev.orders, newOrder],
    }));
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      ),
    }));
  };

  const updateUserStats = (stats: Partial<User["stats"]>) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        stats: {
          ...prev.user.stats,
          ...stats,
        },
      },
    }));
  };

  const showToast = (toast: ToastData) => {
    setCurrentToast(toast);
  };

  const dismissToast = () => {
    setCurrentToast(null);
  };

  const contextValue: AppContextType = {
    ...state,
    currentToast,
    toggleFavorite,
    addOrder,
    updateOrder,
    updateUserStats,
    showToast,
    dismissToast,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
