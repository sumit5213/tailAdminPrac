import React, { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextType {
  activeDropdown: string | null;
  openDropdown: (name: string) => void;
  toggleDropdown: (name: string) => void;
  closeAllDropdowns: () => void;
  isDropdownOpen: (name: string) => boolean;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const openDropdown = (name: string) => {
    setActiveDropdown(name);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const isDropdownOpen = (name: string) => {
    return activeDropdown === name;
  };

  return (
    <DropdownContext.Provider
      value={{
        activeDropdown,
        openDropdown,
        toggleDropdown,
        closeAllDropdowns,
        isDropdownOpen,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};